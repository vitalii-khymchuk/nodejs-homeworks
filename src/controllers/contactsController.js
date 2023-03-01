const { ctrlWrap, HttpError } = require("../utils");
const { Contact } = require("../models/contact");

const get = async (req, res, next) => {
  const contacts = await Contact.find({}, "-createdAt -updatedAt");
  res.json(contacts);
};

const getById = async (req, res, next) => {
  const id = req.params.contactId;
  const contact = await Contact.findById(id);
  if (!contact) throw HttpError(404, `Contact with id: "${id}" not found`);
  res.json(contact);
};

const post = async (req, res) => {
  const addedContact = await Contact.create(req.body);
  res.status(201).json(addedContact);
};

const remove = async (req, res) => {
  const id = req.params.contactId;
  const deletedContact = await Contact.findByIdAndRemove(id);
  if (!deletedContact)
    throw HttpError(404, `Contact with id: "${id}" not found`);
  res.json(deletedContact);
};

const put = async (req, res) => {
  const id = req.params.contactId;
  const updContact = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!updContact) throw HttpError(404, `Contact with id: "${id}" not found`);
  res.json(updContact);
};

const patchFav = async (req, res) => {
  const id = req.params.contactId;
  const updContact = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!updContact) throw HttpError(404, `Contact with id: "${id}" not found`);
  res.json(updContact);
};

module.exports = {
  get: ctrlWrap(get),
  getById: ctrlWrap(getById),
  post: ctrlWrap(post),
  remove: ctrlWrap(remove),
  put: ctrlWrap(put),
  patchFav: ctrlWrap(patchFav),
};
