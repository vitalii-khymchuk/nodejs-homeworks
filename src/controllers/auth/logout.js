const { User } = require("../../models");
const { ctrlWrap } = require("../../utils");

const logout = async (req, res) => {
  const { id } = req.user;
  await User.findByIdAndUpdate(id, { token: null });
  res.sendStatus(204);
};

module.exports = { logout: ctrlWrap(logout) };
