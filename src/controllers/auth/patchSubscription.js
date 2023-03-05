const { User } = require("../../models");
const jwt = require("jsonwebtoken");

const patchSubscription = async (req, res) => {
  const { authorization = "" } = req.headers;
  const [, token] = authorization.split(" ");
  const { id } = await jwt.decode(token);
  const user = await User.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!user) throw HttpError(404, `User with id: "${id}" not found`);
  res.status(200).json({ code: 200, data: user });
};

module.exports = { patchSubscription };
