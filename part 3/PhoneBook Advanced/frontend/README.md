# Phonebook Backend

A clean and robust Node.js and Express backend built as part of the **Full Stack Open** curriculum. This service handles the API logic and data persistence for a phonebook application and is configured to serve the frontend production build.

##  Live Demo
You can find the live version of this project deployed on Render here:  
[**https://phone-book-q54k.onrender.com**](https://phone-book-q54k.onrender.com)[cite: 1]

---

##  Tech Stack
* **Runtime:** [Node.js](https://nodejs.org/)[cite: 1]
* **Framework:** [Express.js](https://expressjs.com/)[cite: 1]
* **Middleware:** `cors`, `morgan` (logging), and `express.static`
* **Deployment:** [Render](https://render.com/)[cite: 1]

---

##  Features
* **RESTful API:** Full support for GET, POST, and DELETE requests.
* **Static UI Serving:** Automatically serves the Vite/React frontend from the `dist` directory.
* **Logging:** Detailed request logging using Morgan to track API interactions.
* **Production Ready:** Optimized for deployment with environment variable support.

---

##  Getting Started

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### 2. Installation
Clone the repository and install the dependencies:
```bash
git clone https://github.com/shyakacedrick/Fullstack-Exercise.git
cd Fullstack-Exercise
npm install