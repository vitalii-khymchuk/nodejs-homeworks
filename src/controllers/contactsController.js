const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const { ctrlWrap, HttpError } = require("../utils");

const get = async (req, res, next) => {
  const contacts = await listContacts();
  res.json(contacts);
};

const getById = async (req, res, next) => {
  const id = req.params.contactId;
  const contact = await getContactById(id);
  if (!contact) throw HttpError(404, `Contact with id: "${id}" not found`);
  res.json(contact);
};

const post = async (req, res) => {
  const addedContact = await addContact(req.body);
  res.status(201).json(addedContact);
};

const remove = async (req, res) => {
  const id = req.params.contactId;
  const deletedContact = await removeContact(id);
  if (!deletedContact)
    throw HttpError(404, `Contact with id: "${id}" not found`);
  res.json(deletedContact);
};

const put = async (req, res) => {
  const id = req.params.contactId;
  const updContact = await updateContact(id, req.body);
  if (!updContact) throw HttpError(404, `Contact with id: "${id}" not found`);
  res.json(updContact);
};

module.exports = {
  get: ctrlWrap(get),
  getById: ctrlWrap(getById),
  post: ctrlWrap(post),
  remove: ctrlWrap(remove),
  put: ctrlWrap(put),
};
