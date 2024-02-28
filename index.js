const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = process.env.PORT || 3000;

// Connect to SQLite database
const db = new sqlite3.Database('./data/contacts.db');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Routes
const indexRoutes = require("./routes/index");
const contactsRoutes = require("./routes/contacts");

app.use("/", indexRoutes);
app.use("/contacts", contactsRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
