# Members Only

This application is a messaging platform where users can create and view messages, register and log in, and admin users can manage other users. It also includes a club management system with membership features.

## Features

- **User Registration and Login**: Users can create accounts and log in.
- **Sending Messages**: Users can create new messages.
- **Viewing Messages**: Users can view all messages.
- **User Management**: Admin users can update the admin role of other users and delete users.
- **Membership System**: Users can join the club and view their membership status.
- **Message Deletion**: Admin users can delete messages.

## Technologies

- **Node.js**: JavaScript runtime for server-side development.
- **Express**: Web framework for Node.js applications.
- **Sequelize**: ORM (Object-Relational Mapping) tool for Node.js.
- **PostgreSQL**: Database management system.
- **Passport**: Authentication middleware.
- **EJS**: Template engine.

## Setup

1. **Clone the Repository**:
   ```bash
   git clone <repository-link>
   cd <project-directory>
    ```
2. **Install Required Packages:**:
    ```bash
    npm install
    ```
3. **Set Environment Variables**: Create a .env file and add the following environment variables:
    ```bash
    DATABASE_URL=your_database_url
    SECRET=your_session_secret
    ```
4. **Database Creation and Synchronization**: Create the database and necessary tables:
    ```bash
    npm run migrate
    ```
5. **Start the Server:**:
    ```bash
    npm start
    ```
    The server will run by default at http://localhost:3001.

## Usage
- **Home Page**: View messages and user information.
- **New Message**: Go to /new-message page to create a new message.
- **Login**: Log in with username and password.
- **Sign Up**: Use the /signup page to create a new account.
- **Join Club**: Enter the required password and use the /join page to join the club.
- **Admin Panel**: Admin users can manage users through /admin/dashboard.