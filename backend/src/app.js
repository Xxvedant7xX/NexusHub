import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

import memberRoutes from "./routes/memberRoutes.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDirectory = path.resolve(__dirname, "../uploads");

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL?.split(",").map((value) => value.trim()) || "*",
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(uploadsDirectory));

app.get("/api/health", (_request, response) => {
  response.json({
    message: "NexusHub backend is healthy.",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/members", memberRoutes);
app.use("/members", memberRoutes);

app.use((error, _request, response, _next) => {
  const isMulterError = error.name === "MulterError";
  const statusCode = error.statusCode || (isMulterError ? 400 : 500);
  const message =
    error.code === "LIMIT_FILE_SIZE"
      ? "Image size must be 5 MB or smaller."
      : error.message || "Something went wrong.";

  response.status(statusCode).json({
    message,
  });
});

export default app;
