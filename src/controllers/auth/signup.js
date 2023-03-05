const { ctrlWrap, HttpError } = require("../../utils");
const { User } = require("../../models/");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  const { password } = req.body;
  const hashedPw = await bcrypt.hash(password, 10);
  const { SECRET_KEY } = process.env;

  const newUser = await User.create({ ...req.body, password: hashedPw });

  const token = jwt.sign({ id: newUser._id }, SECRET_KEY);

  await User.findByIdAndUpdate(newUser._id, { token });

  res.status(201).json({ code: 201, token });
};

module.exports = { signup: ctrlWrap(signup) };
