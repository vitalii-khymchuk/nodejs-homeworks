const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const getContact = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    return res.json(contacts);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const contact = await getContactById(id);
    return res.json(contact);
  } catch (error) {
    next(error);
  }
};

const postContact = async (req, res, next) => {
  try {
    const addedContact = await addContact(req.body);
    res.status(201);
    return res.json(addedContact);
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const deletedContact = await removeContact(id);
    return res.json(deletedContact);
  } catch (error) {
    next(error);
  }
};

const putContact = async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const updContact = await updateContact(id, req.body);
    return res.json(updContact);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getContact,
  getById,
  postContact,
  deleteContact,
  putContact,
};
