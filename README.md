# Quiz Management API

This project provides a Quiz Management API built with Node.js, Express, MongoDB, and Mongoose. The API allows users to create quizzes, retrieve active quizzes, get quiz results, and retrieve information about all quizzes.

## Getting Started

Follow the steps below to set up and run the project locally.

### Prerequisites

- Node.js installed
- MongoDB database

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Smoke221/gurucool-backend-assignement
   ```
2. Install Dependencies:
   
    ```
    cd gurucool-backend-assignement
    npm install
    ```
3. Set up your MongoDB database and update the database configuration in the ```db.js``` file.
4. Start the server:
   
   ``` npm start```

##### The API will be accessible at http://localhost:3000.


# Rate Limiting and Security

## Rate Limiting

Rate limiting is implemented for user registration and login to prevent abuse.

- **Limit for User Registration/Login:**
  - **Route:** `POST /user/register`, `POST /user/login`
  - **Limit:** 5 requests per IP per hour.

- **Limit for Quiz routes:**
  - **Route:** `POST /quizzes`, `GET /quizzes/all`, `GET /quizzes/active`, `GET /quizzes/:id/result`
  - **Limit:** 10 requests per IP per hour.

## Security

Security measures have been implemented to ensure the protection of user data.

- **Password Security:**
  - Passwords are securely hashed using bcrypt before saving to the database.

- **Authentication:**
  - JSON Web Tokens (JWT) are used for user authentication.

These measures contribute to the overall security and integrity of the application, safeguarding user information and preventing unauthorized access.

### Sample data

 - ### User

```
{
  "name": "User Name",
  "email": "user@example.com",
  "password": "password"
}
```
 - ### Quiz

 ```
 {
  "question": "Sample question?",
  "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
  "rightAnswer": 1,
  "startDate": "2023-12-21T12:00:00.000Z",
  "endDate": "2023-12-21T14:00:00.000Z"
}
 ```