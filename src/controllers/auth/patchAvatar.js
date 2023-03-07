const { User } = require("../../models");
const { ctrlWrap, HttpError } = require("../../utils/");
const path = require("path");
const fs = require("fs/promises");

const patchAvatar = async (req, res) => {
  const { description } = req.body;
  const { path: tempPath, filename } = req.file;
  const newPath = path.join(".", "public", "avatars", filename);
  try {
    await fs.rename(tempPath, newPath);
  } catch (error) {
    await fs.unlink(temporaryName);
     throw HttpError(500, error);
  }
  const avatarURL = path.join('avatars', filename)
  const { id } = req.user;
  const user = await User.findByIdAndUpdate(id, {avatarURL}, {
    new: true,
  });
  if (!user) throw HttpError(404, `User with id: "${id}" not found`);
  res.status(200).json({ code: 200, data: user, description });
};

module.exports = { patchAvatar: ctrlWrap(patchAvatar) };
