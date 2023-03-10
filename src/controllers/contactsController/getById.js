const { ctrlWrap, HttpError } = require("../../utils");
const { Contact } = require("../../models/contact");

const getById = async (req, res) => {
  const id = req.params.contactId;
  const contact = await Contact.findById(id);
  if (!contact) throw HttpError(404, `Contact with id: "${id}" not found`);
  res.status(200).json({ code: 200, data: contact });
};

module.exports = {
  getById: ctrlWrap(getById),
};
