import express from "express";
import multer from "multer";
import { validateEditFile, validateFile } from "../middlewares/fileValidator.js"
import { createEmployee, editEmployee, getAllEmployee,deleteEmployee } from "../controllers/employeeController.js"

const upload = multer({ storage: multer.memoryStorage() });

export const adminRoute = express.Router();

adminRoute.post("/createEmp", upload.single("image"), validateFile, createEmployee);

adminRoute.get("/getAllEmp", getAllEmployee);

adminRoute.post("/editEmp/:id", upload.single("image"), validateEditFile, editEmployee);
adminRoute.delete("/deleteEmp/:id", deleteEmployee);
