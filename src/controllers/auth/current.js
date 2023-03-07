const { User } = require("../../models");
const { ctrlWrap } = require("../../utils");

const current = async (req, res) => {
  const { id } = req.user;
  const { email, subscription } = await User.findByIdAndUpdate(id, {
    token: null,
  });
  res.status(200).json({ code: 200, data: { email, subscription } });
};

module.exports = { current: ctrlWrap(current) };
