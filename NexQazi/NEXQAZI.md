# 🛍️ NEXTQAZI — Full-Stack E-Commerce & Seller Platform

A full-stack MERN e-commerce application built with React, Node.js, Express, MongoDB, and Redux Toolkit. Features user authentication, role-based access control (Buyer & Seller), product management, shopping cart persistence, and inventory controls.

---

## 🔗 Live Submission Links

* 🌐 **Frontend Live Application:** (https://your-frontend-live-url.vercel.app)

* ⚙️ **Backend Live API:** (https://assingment-task-cohort-3-revj.vercel.app/)

* 📁 **GitHub Repository:** (https://github.com/Gilmanqazi/Assingment-Task-Cohort-3/tree/main/NexQazi)

---

## ✨ Key Features

### 👤 User & Authentication
* JWT Access & Refresh Token Authentication
* Role-based access control (`user` vs `seller`)
* Persistent user sessions with Redux Persist

### 🛍️ Shopper Experience
* Product catalog viewing
* Persistent Cart Management (Add, update quantity, remove items)
* Real-time order price calculation

### 🏪 Seller Management
* Dedicated Seller Product Dashboard
* Product creation with price, stock, variants, and image uploads
* Product updates (Title, Description, Stock, Images)
* Product deletion with automatic cache sync

---

## 🛠️ Tech Stack

* **Frontend:** React.js, Redux Toolkit, React Router v6, Tailwind CSS, Lucide React, React-Hook-Form, React Toastify
* **Backend:** Node.js, Express.js, MongoDB & Mongoose
* **Auth & File Uploads:** JWT, Multer, ImageKit
* **State & Persistence:** Redux Toolkit, Redux Persist

---

## 📁 Repository & Folder Structure

```text
nextqazi-ecommerce/
│
├── backend/
│   ├── src/
│   │   ├── config/          # Database & third-party API configurations
│   │   ├── controllers/     # Request logic handlers (Auth, Product, Cart)
│   │   ├── middleware/      # JWT auth, role validation & Multer middlewares
│   │   ├── models/          # Mongoose data schemas (User, Product, Cart)
│   │   ├── routers/         # Express API route declarations
│   │   ├── services/        # Business logic & database interaction services
│   │   ├── utils/           # Helper functions & custom utility methods
│   │   ├── validation/      # Request body input validation logic
│   │   └── app.js           # Express app setup & middleware configuration
│   ├── .env                 # Backend environment variables
│   ├── package.json         # Backend dependencies
│   └── server.js            # Server entry point
│
├── frontend/
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── app/             # Router & Redux store configuration
│   │   ├── assets/          # Global images & icons
│   │   ├── features/        # Feature-sliced modules
│   │   │   ├── auth/        # Auth state, hooks, and views
│   │   │   ├── cart/        # Cart state, hooks, and views
│   │   │   ├── products/    # Product list, create, edit, and seller catalog
│   │   │   └── shared/      # Shared components (Navbar, AuthInit)
│   │   ├── index.css        # Global styles & Tailwind imports
│   │   └── main.jsx         # React application root render
│   ├── index.html           # Main HTML document
│   ├── package.json         # Frontend dependencies
│   └── vite.config.js       # Vite bundler configuration
│
└── README.md                # Unified project documentation