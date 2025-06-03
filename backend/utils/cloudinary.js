import { v2 as cloudinary } from "cloudinary";
import { config } from "dotenv";
import { Readable } from 'stream';

config(); 

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadtocloud = async (file) => {
    const readableStream = Readable.from(file.buffer); // Convert buffer to stream

    try {
        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { folder: 'intershipDashboard' },
                (error, result) => {
                    if (result) resolve(result);
                    else reject(error);
                }
            );

            readableStream.pipe(uploadStream);
        });

        return {
            url: result.secure_url,
            public_id: result.public_id,
        };
    } catch (err) {
        throw new Error("Upload Error: " + err.message);
    }
};

export { cloudinary };
