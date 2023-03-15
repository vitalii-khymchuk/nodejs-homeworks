const { ctrlWrap, HttpError } = require("../../utils");
const { User } = require("../../models/");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");
const { sendGrid } = require("../../services");

const signup = async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    throw HttpError(400, "Please provide all necessary data");
  }

  const user = await User.findOne({ email });
  if (user && user.verify === true) {
    throw HttpError(400, `User with ${email} already exist`);
  }
  const hashedPw = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = uuidv4();
  const verificationLink = `http://${req.headers.host}/api/users/verify/${verificationToken}`;

  const userCred = {
    ...req.body,
    password: hashedPw,
    verificationToken,
    avatar: { imageLink: avatarURL, name: "default" },
  };
  if (user) {
    await User.findByIdAndUpdate(user._id, userCred);
    await sendGrid.sendVerificationEmail(email, verificationLink);
  } else {
    await User.create(userCred);
    await sendGrid.sendVerificationEmail(email, verificationLink);
  }
  res.status(201).json({
    code: 201,
    message: `Profile has been created, verification link were sent to ${email}`,
  });
};

module.exports = { signup: ctrlWrap(signup) };
