const { User } = require("../../models");
const { ctrlWrap, HttpError } = require("../../utils/");

const patchAvatar = async (req, res) => {
  const { description } = req.body;
  const { id } = req.user;
  const user = await User.findByIdAndUpdate(
    id,
    { avatar: req.avatar },
    { new: true }
  );
  if (!user) throw HttpError(404, `User with id: "${id}" not found`);
  res.status(200).json({ code: 200, data: user, description });
};

module.exports = { patchAvatar: ctrlWrap(patchAvatar) };
