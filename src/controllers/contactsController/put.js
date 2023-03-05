const { ctrlWrap, HttpError } = require("../../utils");
const { Contact } = require("../../models/contact");

const put = async (req, res) => {
  const id = req.params.contactId;
  console.log(id);
  const updContact = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  console.log(updContact);
  if (!updContact) throw HttpError(404, `Contact with id: "${id}" not found`);
  res.status(200).json({ code: 200, data: updContact });
};

module.exports = {
  put: ctrlWrap(put),
};
