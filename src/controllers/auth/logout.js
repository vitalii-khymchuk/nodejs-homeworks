const { User } = require("../../models");
const { ctrlWrap } = require("../../utils");
const jwt = require("jsonwebtoken");

const logout = async (req, res) => {
  const { authorization = "" } = req.headers;
  const [, token] = authorization.split(" ");
  const { id } = await jwt.decode(token);
  await User.findByIdAndUpdate(id, { token: null });
  res.sendStatus(204);
};

module.exports = { logout: ctrlWrap(logout) };
