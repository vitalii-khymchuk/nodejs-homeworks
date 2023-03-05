const { User } = require("../../models");
const { ctrlWrap } = require("../../utils");
const jwt = require("jsonwebtoken");

const current = async (req, res) => {
  const { authorization = "" } = req.headers;
  const [, token] = authorization.split(" ");
  const { id } = await jwt.decode(token);
  const { email, subscription } = await User.findByIdAndUpdate(id, {
    token: null,
  });
  res.status(200).json({ code: 200, data: { email, subscription } });
};

module.exports = { current: ctrlWrap(current) };
