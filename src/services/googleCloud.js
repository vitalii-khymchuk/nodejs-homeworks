const { Storage } = require("@google-cloud/storage");
const { HttpError } = require("../utils/");

const storage = new Storage();
const BUCKET_NAME = "images-box";

const uploadFile = async (path, filename) => {
  const options = {
    destination: filename,
  };
  try {
    const [data] = await storage.bucket(BUCKET_NAME).upload(path, options);
    await storage.bucket(BUCKET_NAME).file(filename).makePublic();
    console.log(`${filename} uploaded to ${BUCKET_NAME}`);
    return data.metadata.mediaLink;
  } catch (error) {
    console.log(error);
    throw HttpError(500);
  }
};

const removeFile = async (fileName) => {
  try {
    await storage.bucket(BUCKET_NAME).file(fileName).delete();
    console.log(`gs://${BUCKET_NAME}/${fileName} deleted`);
  } catch (error) {
    console.log(error);
    throw HttpError(500);
  }
};

module.exports = { uploadFile, removeFile };
