# 🛒 MERN E-Commerce Platform

![MERN Stack](https://img.shields.io/badge/MERN-MongoDB%20%7C%20Express%20%7C%20React%20%7C%20Node.js-blue?style=for-the-badge&logo=mongodb)
![React](https://img.shields.io/badge/React-18.x-61dafb?style=for-the-badge&logo=react&logoColor=black)
![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-RTK%20Query-764abc?style=for-the-badge&logo=redux)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.x-7952B3?style=for-the-badge&logo=bootstrap)

A sophisticated, full-stack E-Commerce web application built using the modern **MERN** stack. This project serves as a comprehensive platform featuring a beautifully overhauled UI, secure OTP-based authentication, real-time cart and wishlist management, and integrated payment gateway processing.

---

## ✨ Key Features & UI Overhaul

This application recently underwent a massive **12-Phase UI & UX Overhaul**, transforming it into a premium, modern shopping experience:

- **🎨 Modern Glassmorphism Design:** Beautiful, centered authentication cards (Login/OTP/Profile) featuring soft gradients and glassmorphic elevated effects.
- **⚡ Advanced State Management:** Powered by **Redux Toolkit (RTK) & RTK Query** for intelligent data caching, optimistic updates, and lightning-fast API responses without manual loading states.
- **🔐 Secure Passwordless Auth:** Email OTP (One-Time Password) based authentication flow for enhanced security and frictionless user onboarding.
- **🛍️ Dynamic Shopping Cart:** Sticky order summaries, quantity adjustments, and robust API error handling to prevent crashes from missing products.
- **💳 Integrated Checkout:** Full integration with payment gateways (SSLCommerz) including customer profile validation before secure checkout initiation.
- **📄 Clean Invoice Dashboard:** A modernized, grid-based Order History dashboard with color-coded status badges and detailed table-based Invoice views.
- **🔍 Smart Filtering & Search:** Filter products by Category, Brand, Keyword, or generic Remarks (Trending, New, Popular).
- **⭐ Real Product Reviews:** Authenticated users can leave multi-line text reviews with 5-star rating systems via modernized Bootstrap Modals.

---

## 🧰 Tech Stack

**Frontend Interface:**

- React (bootstrapped with Vite for instant HMR)
- React Router DOM
- Redux Toolkit & RTK Query
- Bootstrap 5 & Bootstrap Icons
- Lottie React (for animated skeletons and empty states)
- React Hot Toast (for elegant notifications)

**Backend Architecture:**

- Node.js & Express.js
- MongoDB & Mongoose (with aggregation pipelines)
- JSON Web Tokens (JWT) for secure session cookies
- Nodemailer (for OTP dispatch)
- Express Rate Limit, Helmet, XSS-clean (Security implementations)

---

## 📂 Repository Structure

```text
MERN_Ecommerce/
├── client/                 # React Vite Frontend App
│   ├── src/
│   │   ├── components/     # Reusable UI components (Cart, Product, User, etc.)
│   │   ├── pages/          # Full page layouts mapping to routes
│   │   ├── redux/          # RTK slices, API endpoints, and store setup
│   │   ├── skeleton/       # Lottie-based loading fallbacks
│   │   └── utility/        # Helper functions and validators
├── src/                    # Node.js Backend App
│   ├── controllers/        # Request handlers
│   ├── middlewares/        # JWT & Auth Guards
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API endpoint definitions
│   ├── services/           # Heavy lifting, database aggregations, external API calls
│   └── utility/            # Email helpers, token generators
├── index.js                # Server bootstrap entry point
├── app.js                  # Express app configuration & middleware pipeline
└── package.json
```

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### 1. Clone the repository

```bash
git clone https://github.com/anonymousFaisal/MERN_Ecommerce.git
cd MERN_Ecommerce
```

### 2. Environment Setup

**Backend `.env` (Create in root directory):**

```env
PORT=5000
DATABASE=mongodb+srv://<username>:<password>@cluster.mongodb.net/mern-ecommerce?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE_TIME=24h
EMAIL_HOST=mail.yourdomain.com
EMAIL_PORT=465
EMAIL_SECURITY=true
EMAIL_USER=no-reply@yourdomain.com
EMAIL_PASS=your_email_password
WEB_CACHE=false
STORE_ID=your_sslcommerz_store_id
STORE_PASSWD=your_sslcommerz_password
```

**Frontend Vite config proxy:**
The frontend utilizes Vite's built in proxy to avoid CORS issues during development. Ensure `vite.config.js` proxy aligns with your backend `PORT` (default `http://localhost:5000`).

### 3. Install Dependencies & Run

#### Backend Server

Open a terminal in the root directory:

```bash
npm install
npm run dev
```

#### Frontend Client

Open a second terminal in the `client/` directory:

```bash
cd client
npm install
npm run dev
```

The React app will typically run on `http://localhost:5173/`, and backend API requests will automatically proxy to `http://localhost:5000/api/v1/`.

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📬 Contact & Support

If you run into issues, find a bug, or want to suggest new features, feel free to open an issue on the repository. It will be great if you want to use the repo and provide feedback!
