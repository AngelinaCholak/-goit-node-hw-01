const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");

// const contactsPath = path.resolve("db", "contacts.json");
const contactsPath = () => {
    return path.resolve("db", "contacts.json");
}

const readFile = async() => {
    try {
         const data = await fs.readFile(contactsPath(), { encoding: "utf-8" });
         return JSON.parse(data);
    } catch (error) {
        throw new Error(`Error reading contacts: ${error.message}`);
    }
}

const writeFile = async (contacts) => {
    try {
        await fs.writeFile(
          contactsPath(),
          JSON.stringify(contacts, undefined, 2)
        );
    } catch (error) {
        throw new Error(`Error reading contacts: ${error.message}`);
    }
}

const listContacts = async () => {
    try {
        const contacts = await readFile();
        return contacts;
    } catch (error) {
        throw new Error(`Error reading contacts: ${error.message}`);
    }
}

const getContactById = async (contactId) => {
    try {
      const contacts = await readFile();
      const contact =
      contacts.find((contact) => contact.id === contactId);
      return contact;
    } catch (error) {
      throw new Error(`Error reading contacts: ${error.message}`);
    }
}

const removeContact = async (contactId) => {
    try {
      const contacts = await readFile();
      const index = contacts.findIndex((contact) => contact.id === contactId);
      if (index === -1) {
        return null;
      }
      const [deletedContact] = contacts.splice(index, 1);
      await writeFile(contacts);

      return deletedContact;
    } catch (error) {
      throw new Error(`Error reading contacts: ${error.message}`);
    }
}

const addContact = async (data) => {
    try {
      const contacts = await readFile();
      const newContact = { ...data, id: crypto.randomUUID() };
      contacts.push(newContact);
      await writeFile(contacts);
      return newContact;
    } catch (error) {
      throw new Error(`Error reading contacts: ${error.message}`);
    }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
