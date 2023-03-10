const { ctrlWrap, HttpError } = require("../../utils");
const { User } = require("../../models/");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");

const signup = async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    throw HttpError(400, "Please provide all necessary data");
  }

  const [user] = await User.find({ email });
  if (user) {
    throw HttpError(400, `User with ${email} already exist`);
  }
  const hashedPw = await bcrypt.hash(password, 10);
  const { SECRET_KEY } = process.env;
  const avatarURL = gravatar.url(email);

  const newUser = await User.create({
    ...req.body,
    password: hashedPw,
    avatar: { imageLink: avatarURL, name: "default" },
  });
  const token = jwt.sign({ id: newUser._id }, SECRET_KEY);

  await User.findByIdAndUpdate(newUser._id, { token });
  res.status(201).json({ code: 201, token });
};

module.exports = { signup: ctrlWrap(signup) };
