const emailExpression = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const parseHobbies = (value) => {
  if (Array.isArray(value)) {
    return value
      .flatMap((entry) => String(entry).split(","))
      .map((entry) => entry.trim())
      .filter(Boolean);
  }

  return String(value || "")
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
};

export const validateMemberPayload = (payload, fileProvided = false) => {
  const requiredFields = [
    ["name", "Name is required."],
    ["role", "Role is required."],
    ["email", "Email is required."],
    ["phone", "Contact number is required."],
    ["rollNumber", "Roll number is required."],
    ["year", "Year is required."],
    ["degree", "Degree is required."],
    ["aboutProject", "About project is required."],
    ["certificate", "Certificate is required."],
    ["internship", "Internship is required."],
    ["aboutAim", "About aim is required."],
  ];

  for (const [field, message] of requiredFields) {
    if (!String(payload[field] || "").trim()) {
      return message;
    }
  }

  if (!emailExpression.test(String(payload.email || "").trim())) {
    return "Please enter a valid email address.";
  }

  if (parseHobbies(payload.hobbies).length === 0) {
    return "Please add at least one hobby.";
  }

  if (!fileProvided && !String(payload.image || "").trim()) {
    return "Please upload a profile image.";
  }

  return null;
};
