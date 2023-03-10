const { User } = require("../../models");
const { ctrlWrap } = require("../../utils/");

const patchSubscription = async (req, res) => {
  const { id } = req.user;
  const user = await User.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!user) throw HttpError(404, `User with id: "${id}" not found`);
  res.status(200).json({ code: 200, data: user });
};

module.exports = { patchSubscription: ctrlWrap(patchSubscription) };
