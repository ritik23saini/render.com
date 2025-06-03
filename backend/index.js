import dotenv from 'dotenv';
import express from 'express';
import cors from "cors";
import { adminRoute } from './routes/adminRoute.js';
import { normalRoute } from './routes/normalRoute.js';
import { connectDB } from './utils/db.js';

import path from "path";
const __dirname = path.resolve();

dotenv.config();

const app = express();

app.use(express.json());

const Port = process.env.PORT || 8000;

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));


app.use("/api/admin", adminRoute);
app.use("/api", normalRoute);


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.listen(Port, () => {
  connectDB();
  console.log(`Server started at: http://localhost:${Port}`);
});


