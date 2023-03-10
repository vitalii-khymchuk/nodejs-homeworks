const { User } = require("../../models");
const { ctrlWrap } = require("../../utils");

const current = async (req, res) => {
  const { id } = req.user;
  const { email, subscription, avatar } = await User.findById(id);
  res.status(200).json({ code: 200, data: { email, subscription, avatar } });
};

module.exports = { current: ctrlWrap(current) };
