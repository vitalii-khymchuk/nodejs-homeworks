const fs = require("fs");
const resizeImg = require("resize-img");
const resizeImage = async (path) => {
  try {
    const image = await resizeImg(fs.readFileSync(path), {
      width: 250,
      height: 250,
    });
    await fs.writeFileSync(path, image);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { resizeImage };
