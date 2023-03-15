const { signup } = require("./signup");
const { signin } = require("./signin");
const { logout } = require("./logout");
const { current } = require("./current");
const { patchSubscription } = require("./patchSubscription");
const { patchAvatar } = require("./patchAvatar");
const { verification } = require("./verification");

module.exports = {
  signup,
  signin,
  logout,
  current,
  patchSubscription,
  patchAvatar,
  verification,
};
