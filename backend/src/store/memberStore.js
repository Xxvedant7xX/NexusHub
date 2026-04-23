import dotenv from "dotenv";
import fs from "node:fs/promises";
import mongoose from "mongoose";

import Member from "../models/Member.js";
import { sampleMembers } from "../data/sampleMembers.js";
import { demoDataFile, ensureStorageDirectories } from "../utils/paths.js";
import { parseHobbies } from "../utils/memberValidation.js";

dotenv.config();

ensureStorageDirectories();

let storageMode = "json";
let hasConnected = false;

const readDemoMembers = async () => {
  try {
    const file = await fs.readFile(demoDataFile, "utf8");
    const data = JSON.parse(file);
    return Array.isArray(data) ? data : [];
  } catch (error) {
    if (error.code === "ENOENT") {
      return [];
    }

    throw error;
  }
};

const writeDemoMembers = async (members) => {
  await fs.writeFile(demoDataFile, JSON.stringify(members, null, 2));
};

const createDemoId = () => `demo-${crypto.randomUUID()}`;

export const connectToDatabase = async () => {
  if (hasConnected) {
    return;
  }

  const mongoUri = process.env.MONGO_URI?.trim();

  if (!mongoUri) {
    storageMode = "json";
    hasConnected = true;
    return;
  }

  try {
    await mongoose.connect(mongoUri);
    storageMode = "mongo";
    hasConnected = true;
  } catch (error) {
    console.warn("MongoDB connection failed, using demo JSON storage instead.");
    console.warn(error.message);
    storageMode = "json";
    hasConnected = true;
  }
};

export const getStorageModeLabel = () =>
  storageMode === "mongo" ? "MongoDB" : "Demo JSON storage";

export const getAllMembers = async () => {
  if (storageMode === "mongo") {
    return Member.find().sort({ createdAt: -1 });
  }

  const members = await readDemoMembers();
  return members.sort((first, second) =>
    new Date(second.createdAt).getTime() - new Date(first.createdAt).getTime(),
  );
};

export const getMemberById = async (id) => {
  if (storageMode === "mongo") {
    return Member.findById(id);
  }

  const members = await readDemoMembers();
  return members.find((member) => member.id === id) || null;
};

export const createMember = async (payload) => {
  const normalizedPayload = {
    ...payload,
    hobbies: parseHobbies(payload.hobbies),
  };

  if (storageMode === "mongo") {
    return Member.create(normalizedPayload);
  }

  const members = await readDemoMembers();
  const newMember = {
    id: createDemoId(),
    ...normalizedPayload,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  members.push(newMember);
  await writeDemoMembers(members);

  return newMember;
};

const seedDemoMembers = async () => {
  const existingMembers = await readDemoMembers();

  if (existingMembers.length > 0) {
    return existingMembers;
  }

  const seededMembers = sampleMembers.map((member) => ({
    id: createDemoId(),
    ...member,
    hobbies: parseHobbies(member.hobbies),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));

  await writeDemoMembers(seededMembers);
  return seededMembers;
};

export const seedSampleMembersIfNeeded = async () => {
  if (String(process.env.AUTO_SEED || "true").toLowerCase() === "false") {
    return;
  }

  if (storageMode === "mongo") {
    const count = await Member.countDocuments();

    if (count === 0) {
      await Member.insertMany(sampleMembers);
    }

    return;
  }

  await seedDemoMembers();
};

export const forceSeedMembers = async () => {
  if (storageMode === "mongo") {
    await Member.deleteMany({});
    return Member.insertMany(sampleMembers);
  }

  const seededMembers = sampleMembers.map((member) => ({
    id: createDemoId(),
    ...member,
    hobbies: parseHobbies(member.hobbies),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));

  await writeDemoMembers(seededMembers);
  return seededMembers;
};
