const { ctrlWrap, HttpError } = require("../../utils");
const { User } = require("../../models");

const verification = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw HttpError(404, "User not found");
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });
  res.status(200).send("<h2>Verification successful</h2>");
};
module.exports = { verification: ctrlWrap(verification) };
