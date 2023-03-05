const { ctrlWrap } = require("../../utils");
const { Contact } = require("../../models/contact");

const get = async (req, res) => {
  const { page = 1, limit = 10, favorite = null } = req.query;
  const pageNum = Number(page);
  const limitNum = Number(limit);
  const skip = (pageNum - 1) * limitNum;

  const { _id: owner } = req.user;
  const findOptions = favorite ? { owner, favorite } : { owner };

  const contacts = await Contact.find(findOptions, "-createdAt -updatedAt", {
    skip,
    limit: limitNum,
  }).populate("owner", "name email");
  res.status(200).json({ code: 200, data: contacts });
};

module.exports = {
  get: ctrlWrap(get),
};
