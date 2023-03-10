const Jimp = require("jimp");

const resizeImage = (path) => {
  Jimp.read(path, (err, img) => {
    if (err) console.log(err);
    img.resize(250, 250).write(path);
  });
};

module.exports = { resizeImage };
