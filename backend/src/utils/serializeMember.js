export const buildImageUrl = (request, image) => {
  if (!image) {
    return "";
  }

  if (image.startsWith("http")) {
    return image;
  }

  const normalizedImage = image.startsWith("/") ? image : `/uploads/${image}`;

  return `${request.protocol}://${request.get("host")}${normalizedImage}`;
};

export const serializeMember = (member, request) => {
  const data = typeof member.toObject === "function" ? member.toObject() : member;
  const hobbies = Array.isArray(data.hobbies) ? data.hobbies : [];

  return {
    ...data,
    id: String(data._id || data.id),
    hobbies,
    imageUrl: buildImageUrl(request, data.image),
  };
};
