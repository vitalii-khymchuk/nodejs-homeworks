const { signup } = require("./signup");
const { signin } = require("./signin");
const { logout } = require("./logout");
const { current } = require("./current");
const { patchSubscription } = require("./patchSubscription");
const { patchAvatar } = require("./patchAvatar");

module.exports = {
  signup,
  signin,
  logout,
  current,
  patchSubscription,
  patchAvatar,
};
