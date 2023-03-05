const { ctrlWrap } = require("../../utils");
const { Contact } = require("../../models/contact");

const post = async (req, res) => {
  const { _id: owner } = req.user;
  const addedContact = await Contact.create({ ...req.body, owner });
  res.status(201).json({ code: 201, data: addedContact });
};

module.exports = {
  post: ctrlWrap(post),
};
