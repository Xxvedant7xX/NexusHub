import express from "express";
import multer from "multer";
import path from "node:path";

import { addMember, getMemberDetails, listMembers } from "../controllers/memberController.js";
import { runtimeUploadsDirectory } from "../utils/paths.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (_request, _file, callback) => {
    callback(null, runtimeUploadsDirectory);
  },
  filename: (_request, file, callback) => {
    const extension = path.extname(file.originalname);
    const normalizedBaseName = path
      .basename(file.originalname, extension)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    callback(null, `${Date.now()}-${normalizedBaseName}${extension}`);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (_request, file, callback) => {
    if (!file.mimetype.startsWith("image/")) {
      callback(new Error("Only image uploads are allowed."));
      return;
    }

    callback(null, true);
  },
});

router.get("/", listMembers);
router.get("/:id", getMemberDetails);
router.post("/", upload.single("image"), addMember);

export default router;
