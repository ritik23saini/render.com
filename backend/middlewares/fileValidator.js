export const validateFile = (req, res, next) => {

  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: "Image is required" });
  }

  const maxSize = 4 * 1024 * 1024; //4mb
  if (file.size > maxSize) {
    return res.status(400).json({ message: "upload file less than 4 mb only" });
  }

  next();


};
export const validateEditFile = (req, res, next) => {

  const file = req.file;

  if (file) {
    const maxSize = 4 * 1024 * 1024; //4mb
    if (file.size > maxSize) {
      return res.status(400).json({ message: "upload file less than 4 mb only" });
    }
  }


  next();


};
