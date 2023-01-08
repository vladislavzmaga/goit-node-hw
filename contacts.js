const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    console.table(JSON.parse(data));
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const currentUser = JSON.parse(data).find(
      (item) => contactId.toString() === item.id
    );
    console.table(currentUser);
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const currentUsers = JSON.parse(data).filter(
      (item) => contactId.toString() !== item.id
    );
    console.table(currentUsers);
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath);
    const user = {
      id: "id" + Math.random().toString(16).slice(2),
      name,
      email,
      phone,
    };

    const currentUsers = [...JSON.parse(data), user];
    console.table(currentUsers);
    await fs.writeFile(contactsPath, JSON.stringify(currentUsers), "utf8");
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
