const express = require("express");
const router = express.Router();
const path = require("path");
const sqlite3 = require("sqlite3").verbose();
const moment = require("moment");

const DATE_FORMAT = "Do MMMM YYYY hh:mm A";

// Connect to SQLite database
const db = new sqlite3.Database("./data/contacts.db");

// Function to retrieve all contacts from the database
const getAllContacts = (callback) => {
  const query = "SELECT * FROM contacts";
  db.all(query, (err, rows) => {
    if (err) {
      console.error("Error retrieving contacts:", err);
      callback([]);
    } else {
      callback(rows);
    }
  });
};

// Function to retrieve a single contact by ID from the database
const getContactById = (id, callback) => {
  const query = "SELECT * FROM contacts WHERE id = ?";
  db.get(query, [id], (err, row) => {
    if (err) {
      console.error("Error retrieving contact by ID:", err);
      callback(null);
    } else {
      callback(row);
    }
  });
};

// Route to display all contacts
router.get("/", function (req, res, next) {
  getAllContacts((contacts) => {
    res.render("contacts/index", { contacts });
  });
});

// Route to display the form for creating a new contact
router.get("/new", function (req, res, next) {
  res.render("contacts/new", { pageTitle: "Create New Contact" });
});

// Route to display the form for editing a contact
router.get("/:id/edit", function (req, res, next) {
  const contactId = req.params.id;

  getContactById(contactId, (contact) => {
    if (contact) {
      res.render("contacts/edit", {
        contact,
        pageTitle: "Edit Contact",
      });
    } else {
      res.status(404).send("Contact not found");
    }
  });
});

// Route to display a single contact
router.get("/:id", function (req, res, next) {
  const contactId = req.params.id;

  getContactById(contactId, (contact) => {
    if (contact) {
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
      res.render("contacts/show", { contact: updatedContact });
    } else {
      res.status(404).send("Contact not found");
    }
  });
});

// Route to create a new contact
router.post("/", function (req, res, next) {
  const { firstName, lastName, email, notes } = req.body;

  if (!firstName || !lastName) {
    return res.status(400).send("First Name and Last Name are required");
  }

  const query =
    "INSERT INTO contacts (firstName, lastName, email, notes, createdAt) VALUES (?, ?, ?, ?, ?)";
  const createdAt = new Date().toISOString();

  db.run(query, [firstName, lastName, email, notes, createdAt], function (err) {
    if (err) {
      console.error("Error creating contact:", err);
      res.status(500).send("Internal Server Error");
    } else {
      res.redirect("/contacts");
    }
  });
});

// Route to update a contact
router.put("/:id", function (req, res, next) {
  const contactId = req.params.id;
  const { firstName, lastName, email, notes } = req.body;

  const query =
    "UPDATE contacts SET firstName = ?, lastName = ?, email = ?, notes = ?, lastEdited = ? WHERE id = ?";
  const lastEdited = new Date().toISOString();

  db.run(
    query,
    [firstName, lastName, email, notes, lastEdited, contactId],
    function (err) {
      if (err) {
        console.error("Error updating contact:", err);
        res.status(500).send("Internal Server Error");
      } else {
        res.redirect(`/contacts/${contactId}`);
      }
    }
  );
});

// Route to delete a contact
router.delete("/:id", function (req, res, next) {
  const contactId = req.params.id;

  const query = "DELETE FROM contacts WHERE id = ?";

  db.run(query, [contactId], function (err) {
    if (err) {
      console.error("Error deleting contact:", err);
      res.status(500).send("Internal Server Error");
    } else {
      res.redirect("/contacts");
    }
  });
});

module.exports = router;
