const { googleCloud } = require("../services/");
const fs = require("fs/promises");
const { HttpError } = require("../utils");

const moveFromTmpToCloud = async (req, res, next) => {
  const { avatar } = req.user; // Current avatar
  const { path: tempPath, filename } = req.file;
  try {
    //upload to cloud
    const imageLink = await googleCloud.uploadFile(tempPath, filename);
    //Removing file locally
    await fs.unlink(tempPath, (err) => {
      if (err) {
        console.log(err);
        throw HttpError(500);
      } else {
        console.log(`${tempPath} successfully deleted`);
      }
    });
    //Removing old file from cloud
    if (avatar.name && avatar.name !== "default") {
      await googleCloud.removeFile(avatar.name);
    }
    req.avatar = { imageLink, name: filename };
    next();
  } catch (error) {
    console.log(error);
    next(HttpError(500));
  }
};

module.exports = { moveFromTmpToCloud };
