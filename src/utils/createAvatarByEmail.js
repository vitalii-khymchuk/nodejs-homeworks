const gravatar = require("gravatar");

const createAvatarByEmail = (email) =>
  gravatar.url(email, { s: "200", r: "pg" });

module.exports = { createAvatarByEmail };
