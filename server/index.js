import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/conn.js";
import authRoutes from "./routes/auth.route.js";
import cors from "cors";


dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

connectDB();
app.use("/api/auth", authRoutes);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});