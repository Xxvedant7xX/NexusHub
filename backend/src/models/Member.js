import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    rollNumber: {
      type: String,
      required: true,
      trim: true,
    },
    year: {
      type: String,
      required: true,
      trim: true,
    },
    degree: {
      type: String,
      required: true,
      trim: true,
    },
    aboutProject: {
      type: String,
      required: true,
      trim: true,
    },
    hobbies: {
      type: [String],
      default: [],
    },
    certificate: {
      type: String,
      required: true,
      trim: true,
    },
    internship: {
      type: String,
      required: true,
      trim: true,
    },
    aboutAim: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    accent: {
      type: String,
      default: "from-[#4f46e5] via-[#3b82f6] to-[#06b6d4]",
    },
  },
  {
    timestamps: true,
  },
);

const Member = mongoose.models.Member || mongoose.model("Member", memberSchema);

export default Member;
