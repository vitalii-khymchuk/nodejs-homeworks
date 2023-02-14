const fs = require("fs/promises");
const path = require("path");
const { v4: uuid } = require("uuid");
const { throwError } = require("../src/utils/throwError");
const contactsPath = path.join(__dirname, "./contacts.json");

const writeContactsFile = async (data) => {
  try {
    const stringifiedData = JSON.stringify(data, undefined, " ");
    fs.writeFile(contactsPath, stringifiedData, "utf8");
  } catch (error) {
    throwError.SERVER_ERROR(`Cant write contacts file, info: ${error}`);
  }
};

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    throwError.SERVER_ERROR(`Cant read contacts file, info: ${error}`);
  }
};

const getContactById = async (contactId) => {
  const contactsList = await listContacts();
  const [contact] = contactsList.filter(({ id }) => id === contactId);
  if (!contact)
    throwError.NOT_FOUND(`Contact with id: "${contactId}" not found`);
  return contact;
};

const removeContact = async (contactId) => {
  const contactsList = await listContacts();
  const index = contactsList.findIndex(({ id }) => id === contactId);
  if (index === -1)
    throwError.NOT_FOUND(`Contact with id: "${contactId}" not found`);

  const [removedContact] = contactsList.splice(index, 1);
  await writeContactsFile(contactsList);
  return removedContact;
};

const addContact = async (body) => {
  const contactsList = await listContacts();
  const newContact = { ...body, id: uuid() };
  contactsList.push(newContact);
  await writeContactsFile(contactsList);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contactsList = await listContacts();
  const index = contactsList.findIndex(({ id }) => id === contactId);
  if (index === -1)
    throwError.NOT_FOUND(`Contact with id: "${contactId}" not found`);
  const updContact = { ...contactsList[index], ...body, id: contactId };
  contactsList.splice(index, 1, updContact);
  await writeContactsFile(contactsList);
  return updContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
