import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        console.log(process.env.DATABASE_URL);
        await mongoose.connect(process.env.DATABASE_URL).then(() => {
            console.log("Database connected");
            return;
        });

    } catch (error) {
        console.log("Error: ", error);
    }
};
