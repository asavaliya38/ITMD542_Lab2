const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const moment = require("moment");

const DATE_FORMAT = "Do MMMM YYYY hh:mm A";

const readContactsFromFile = () => {
  const filePath = path.join(__dirname, "..", "data", "contacts.json");
  try {
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading contacts file:", error);
    return [];
  }
};

const writeContactsToFile = (contacts) => {
  const filePath = path.join(__dirname, "..", "data", "contacts.json");
  try {
    fs.writeFileSync(filePath, JSON.stringify(contacts, null, 2));
  } catch (error) {
    console.error("Error writing contacts file:", error);
  }
};

router.get("/", function (req, res, next) {
  const contacts = readContactsFromFile();
  res.render("contacts/index", { contacts: contacts });
});

router.get("/new", function (req, res, next) {
  res.render("contacts/new", { pageTitle: "Create New Contact" });
});

router.get("/:id/edit", function (req, res, next) {
  const contactId = req.params.id;

  let contacts = readContactsFromFile();

  const contact = contacts.find((contact) => contact.id === contactId);

  if (contact) {
    res.render("contacts/edit", {
      contact: contact,
      pageTitle: "Edit Contact",
    });
  } else {
    res.status(404).send("Contact not found");
  }
});

router.get("/:id", function (req, res, next) {
  const contactId = req.params.id;
  const contacts = readContactsFromFile();
  const contact = contacts.find((contact) => contact.id === contactId);
  const updatedContact = {
    Id: contact.id,
    "First Name": contact.firstName,
    "Last Name": contact.lastName,
    Email: contact.email || "--",
    Notes: contact.notes || "--",
    "Created/Updated At:": contact.createdAt
      ? moment(contact.createdAt).format(DATE_FORMAT)
      : moment(contact.lastEdited).format(DATE_FORMAT),
  };
  if (contact) {
    res.render("contacts/show", { contact: updatedContact });
  } else {
    res.status(404).send("Contact not found");
  }
});

router.post("/", function (req, res, next) {
  const { firstName, lastName, email, notes } = req.body;

  if (!firstName || !lastName) {
    return res.status(400).send("First Name and Last Name are required");
  }

  const newContact = {
    id: Math.random().toString(36).substr(2, 9),
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    email: email.trim(),
    notes: notes.trim(),
    createdAt: new Date().toISOString(),
  };

  let contacts = readContactsFromFile();

  contacts.push(newContact);

  writeContactsToFile(contacts);

  res.redirect("/contacts");
});

router.put("/:id", function (req, res, next) {
  const contactId = req.params.id;
  const { firstName, lastName, email, notes } = req.body;

  let contacts = readContactsFromFile();

  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index !== -1) {
    contacts[index].firstName = firstName;
    contacts[index].lastName = lastName;
    contacts[index].email = email;
    contacts[index].notes = notes;
    contacts[index].lastEdited = new Date().toISOString(); // Update lastEdited timestamp
    delete contacts[index].createdAt;

    writeContactsToFile(contacts);

    res.redirect(`/contacts/${contactId}`);
  } else {
    res.status(404).send("Contact not found");
  }
});

router.delete("/:id", function (req, res, next) {
  const contactId = req.params.id;

  let contacts = readContactsFromFile();

  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index !== -1) {
    contacts.splice(index, 1);

    writeContactsToFile(contacts);

    res.redirect("/contacts");
  } else {
    res.status(404).send("Contact not found");
  }
});

module.exports = router;

