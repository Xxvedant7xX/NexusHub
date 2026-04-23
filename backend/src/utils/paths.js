import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const backendRoot = path.resolve(__dirname, "../..");
export const uploadsDirectory = path.resolve(backendRoot, "uploads");
export const runtimeUploadsDirectory = path.resolve(uploadsDirectory, "runtime");
export const demoDataDirectory = path.resolve(backendRoot, "data");
export const demoDataFile = path.resolve(demoDataDirectory, "demo-members.json");

export const ensureStorageDirectories = () => {
  fs.mkdirSync(uploadsDirectory, { recursive: true });
  fs.mkdirSync(runtimeUploadsDirectory, { recursive: true });
  fs.mkdirSync(demoDataDirectory, { recursive: true });
};
