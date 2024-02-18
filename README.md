# Personal Details

### Name:

### Email:

### Class/Assignment No:

### Git repository URL:

# Contact Database Application

This is a Node.js Express application for managing contacts. It allows users to create, view, edit, and delete contacts.

## Features

- View a list of all contacts
- View details of a single contact
- Create a new contact
- Edit an existing contact
- Delete a contact

## Development Environment

- This application was developed using Node.js version 19.4.0 and Yarn version 1.22.10. Visual Studio Code was the chosen development environment for building the application.

## Installation/Running Instructions

1. Clone this repository to your local machine: **git clone repository-url**.

2. Navigate to the project directory.

3. Install dependencies using npm install.

4. Start the server: node index.js

5. Open your web browser and visit `http://localhost:3000` to access the application.

## Usage

- **Viewing Contacts**: Visit the homepage to view a list of all contacts. Click on a contact to view its details.
- **Creating a Contact**: Click on the "Create New Contact" button on the homepage to create a new contact.
- **Editing a Contact**: Click on the "Edit" button next to a contact to edit its details.
- **Deleting a Contact**: Click on the "Delete" button next to a contact to delete it from the database.

## Insights and Results

1. Data Management: Handling data persistence without using a traditional database can be challenging. Storing and managing contact information in a JSON file requires careful consideration of data structures and file I/O operations.

2. Validation: Implementing robust validation for user input, especially for required fields, can be challenging. Ensuring that data is properly validated and sanitized to prevent security vulnerabilities is crucial.

3. Routing: Managing routes and handling HTTP requests in an Express application can be complex, especially as the application grows in size and complexity. Ensuring that routes are organized and implemented correctly is important for maintainability.

4. User Interface: Designing a user-friendly interface for creating, viewing, editing, and deleting contacts requires careful consideration of layout, navigation, and usability. Ensuring that the interface is intuitive and responsive across different devices can be challenging.

5. Error Handling: Implementing effective error handling mechanisms to gracefully handle errors and provide helpful error messages to users can be challenging. Proper error handling is essential for providing a seamless user experience.

6. Security: Implementing security measures to protect against common web vulnerabilities such as XSS (cross-site scripting) and CSRF (cross-site request forgery) attacks is essential. Ensuring that user input is properly sanitized and that sensitive data is handled securely can be challenging.

## Technologies Used

- Node.js
- Express.js
- Pug (templating engine)
- Bootstrap (CSS framework)

## File Descriptions

- **index.js**: The main application file responsible for setting up the Express server and configuring middleware.
- **routes**: This directory contains route handler files. In this project, there's a `contacts.js` file for handling contact-related routes.
- **views**: Pug templates used to render HTML pages. The `contacts` directory contains templates for managing contacts, while `layout.pug` defines the overall layout structure.
- **data**: This directory stores data files. In this case, `contacts.json` is used to store contact information.
- **package.json**: Configuration file that lists project dependencies and scripts.
- **README.md**: Documentation file providing information about the project structure, usage, and other details.
