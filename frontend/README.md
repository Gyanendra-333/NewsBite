# User Login

email-gyan@gmail.com
passord-123456

# Admin Login

email- admin@gmail.com
password - 123456

# MERN Stack News Feed App

A full-stack MERN (MongoDB, Express, React, Node.js) application with authentication, user feed, and admin panel.

---

## Features

- User Authentication (Login / Signup)
- Protected Routes
- User Feed (Posts)
- Admin Panel (Special Access)
- Context API for State Management
- REST API Integration

---

## Tech Stack

### Frontend:

- React
- Context API
- Axios
- Taiwind CSS

### Backend:

- Node.js
- Express.js

### Database:

- MongoDB (Mongoose)

---

## Project Structure

```
client/
 ├── pages/
 │    ├── Login.js
 │    ├── Signup.js
 │    ├── Feed.js
 │    └── Admin.js
 ├── context/
 │    └── AuthContext.js
 ├── App.js
 └── index.js

server/
 ├── controllers/
 ├── models/
 ├── routes/
 ├── middleware/
 ├── server.js
```

---

## Installation

### 1. Clone Repository

```
git clone https://github.com/your-username/mern-app.git
cd mern-app
```

### 2. Install Dependencies

#### Client:

```
cd client
npm install
```

#### Server:

```
cd server
npm install
```

---

## Environment Variables

Create `.env` file in server folder:

```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

---

## Run Project

### Start Backend:

```
cd server
npm run dev
```

### Start Frontend:

```
cd client
npm run dev
```

---

## User Roles

- Normal User → Feed Access
- Admin ([admin@gmail.com](mailto:admin@gmail.com)) → Admin Panel

---

## Pages

- Login Page
- Signup Page
- Feed Page
- Admin Dashboard

---

## Future Improvements

- Likes & Comments
- Image Upload
- JWT Refresh Tokens
- Role-based Access Control
- Dark Mode

---

## Author

Made with by Gyanendra

Note- I have not much time because of office work otherwise i can make more user friendly and more.
