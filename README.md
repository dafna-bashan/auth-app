# Authentication App

An End-To-End authentication app designed to simplify web app development. Built with React and Redux for the Frontend, powered by Node.js and Express on the Backend, and leveraging MongoDB for data storage. This app provides a reusable authentication solution, enabling users to update and manage their profiles easily.

**Sign Up page**

![App Screenshot](https://i.ibb.co/7StyqfJ/Screen-Shot-2023-09-20-at-15-39-49.png)

## Table of Contents

- [Installation](#installation)
- [Architecture](#architecture)
- [Usage](#usage)
- [Screenshots](#screenshots)

## Installation

To set up and run the Authentication app on your local machine, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/authentication-app.git
   ```

2. Change into the project directory:
   ```bash
   cd authentication-app
   ```

3. Install dependencies for the Frontend:
   ```bash
   cd frontend
   npm install
   ```

4. Install dependencies for the Backend:
   ```bash
   cd ../backend
   npm install
   ```

5. Create a `.env` file in the `server` directory and configure the environment variables, including your MongoDB connection string and any secret keys.

6. Start the Frontend and Backend servers concurrently:
   ```bash
   npm start
   ```

The app should now be running locally, with the Frontend on port 3000 and the Backend on port 3030.

## Architecture

The Authentication App is designed with a modular and scalable architecture. Here's an overview of the components:

- **Frontend**: 
  - Built with React and Redux, providing a responsive and interactive user interface.
  - Utilizes Redux for state management, allowing for efficient data flow.
  - Implements user authentication and profile management components.

- **Backend**:
  - Powered by Node.js and Express, providing a robust API for user management.
  - Handles user registration, authentication, and profile updates.
  - Uses MongoDB for data storage, ensuring data persistence.

- **Database**:
  - Leverages MongoDB, a NoSQL database, for storing user data securely.

## Usage

1. Visit the app in your web browser: [http://localhost:3000](http://localhost:3000)

2. Sign up or log in to access the authentication features.

3. The app provides the following functionality:
   - User registration with email verification.
   - User login and authentication.
   - User profile management, including updating user information and passwords.
   - Logout functionality.
  
## Screenshots

**Login page**

![App Screenshot](https://i.ibb.co/QHTyZjx/Screen-Shot-2023-09-20-at-15-39-38.png)

**User profile page**

![App Screenshot](https://i.ibb.co/TwjdGqc/Screen-Shot-2023-09-20-at-15-39-28.png)

**User edit profile page**

![App Screenshot](https://i.ibb.co/d0R0D38/Screen-Shot-2023-09-20-at-15-39-01.png)
