const { get } = require("./get");
const { getById } = require("./getById");
const { post } = require("./post");
const { put } = require("./put");
const { remove } = require("./remove");
const { patchFav } = require("./patchFav");

module.exports = {
  get,
  getById,
  post,
  remove,
  put,
  patchFav,
};
