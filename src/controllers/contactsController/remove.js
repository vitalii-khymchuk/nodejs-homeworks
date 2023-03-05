const { ctrlWrap, HttpError } = require("../../utils");
const { Contact } = require("../../models/contact");

const remove = async (req, res) => {
  const id = req.params.contactId;
  const deletedContact = await Contact.findByIdAndRemove(id);
  if (!deletedContact)
    throw HttpError(404, `Contact with id: "${id}" not found`);
  res.status(200).json({ code: 200, data: deletedContact });
};

module.exports = {
  remove: ctrlWrap(remove),
};
