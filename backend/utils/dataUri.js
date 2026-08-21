const getDataUri = (file) => {
  if (!file) {
    throw new Error("File is required");
  }

  const fileExtension = file.originalname.split(".").pop();

  const base64 = file.buffer.toString("base64");

  return `data:${file.mimetype};base64,${base64}`;
};

export default getDataUri;