import fs from "node:fs/promises";

import { createMember, getAllMembers, getMemberById } from "../store/memberStore.js";
import { serializeMember } from "../utils/serializeMember.js";
import { validateMemberPayload } from "../utils/memberValidation.js";

const notFoundError = Object.assign(new Error("Member not found."), {
  statusCode: 404,
});

const removeUploadedFile = async (request) => {
  if (!request.file?.path) {
    return;
  }

  await fs.rm(request.file.path, { force: true });
};

export const listMembers = async (request, response, next) => {
  try {
    const members = await getAllMembers();
    response.json(members.map((member) => serializeMember(member, request)));
  } catch (error) {
    next(error);
  }
};

export const getMemberDetails = async (request, response, next) => {
  try {
    const member = await getMemberById(request.params.id);

    if (!member) {
      throw notFoundError;
    }

    response.json(serializeMember(member, request));
  } catch (error) {
    if (error.name === "CastError") {
      next(notFoundError);
      return;
    }

    next(error);
  }
};

export const addMember = async (request, response, next) => {
  try {
    const fileName = request.file ? `runtime/${request.file.filename}` : "";
    const validationError = validateMemberPayload(request.body, Boolean(request.file));

    if (validationError) {
      await removeUploadedFile(request);
      response.status(400).json({ message: validationError });
      return;
    }

    const newMember = await createMember({
      ...request.body,
      image: fileName,
    });

    response.status(201).json(serializeMember(newMember, request));
  } catch (error) {
    await removeUploadedFile(request);
    next(error);
  }
};
