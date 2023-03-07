const { ctrlWrap, HttpError } = require("../../utils");
const { User } = require("../../models/");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");

const signup = async (req, res) => {
  const { email, password } = req.body;
  const hashedPw = await bcrypt.hash(password, 10);
  const { SECRET_KEY } = process.env;
  const avatarURL = gravatar.url(email);

  const newUser = await User.create({
    ...req.body,
    password: hashedPw,
    avatarURL,
  });

  const token = jwt.sign({ id: newUser._id }, SECRET_KEY);

  await User.findByIdAndUpdate(newUser._id, { token });

  res.status(201).json({ code: 201, token });
};

module.exports = { signup: ctrlWrap(signup) };
