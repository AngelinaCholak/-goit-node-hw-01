const Contacts = require("./contacts");

const { program } = require("commander");

program
  .option("-a, --action <type>")
  .option("-id, --id <type>")
  .option("-n, --name <type>")
  .option("-e, --email <type>")
  .option("-ph, --phone <type>");

program.parse();
const options = program.opts();

const invokeAction = async ({ action, id, ...data }) => {
    try {
        switch (action) {
          case "list":
            const allContacts = await Contacts.listContacts();
            console.table(allContacts);
            break;
          case "id":
            const contactById = await Contacts.getContactById(id);
            console.log(contactById);
            break;
          case "add":
            const newContact = await Contacts.addContact(data);
            console.log(newContact);
            break;
          case "remove":
            const removedContact = await Contacts.removeContact(id);
            console.log(removedContact);
            break;
          default:
            console.log("Unknown action:(");
            break;
        }
        
    }catch(error){
        console.error("Error:", error.message);
    }
};

invokeAction(options);
