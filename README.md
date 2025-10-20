# 🛍️ MERN_Ecommerce

A full-stack **E-Commerce** web application built with the **MERN** stack — MongoDB, Express.js, React, and Node.js.

> This project includes both client and server code. It’s designed as a clean boilerplate to help you (actually myself) build scalable e-commerce apps with product listings, cart flow, and admin-ready backend structure.

---



## ✨ Features

- 🛒 Product listing and details  
- 🧺 Add to cart flow  
- 🧭 Order management (basic backend structure)  
- 🧰 Ready for product CRUD, authentication & payments  
- 📦 Dummy/sample data included

---

## 🧰 Tech Stack

- **Frontend:** React (client/)  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Styling:** CSS, Bootstrap (you can replace with Tailwind/SCSS)

---

## 📂 Repository Structure

```
MERN_Ecommerce/
├─ client/                # React frontend
├─ dummy-data/            # sample products / seed data
├─ .vscode/
├─ app.js                 # express app entry
├─ index.js               # server start point
├─ package.json           # server dependencies & scripts
└─ README.md
```

> The `client/` folder contains the React app. Backend entry points are at the root.

---

##  Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/anonymousFaisal/MERN_Ecommerce.git
cd MERN_Ecommerce
```

### 2. Install server dependencies
```bash
npm install
```

### 3. Install client dependencies
```bash
cd client
npm install
```

### 4. Create `.env` file
See the [Environment Variables](#-environment-variables) section below.

### 5. Run the project

#### Option 1: Run separately
```bash
# Terminal 1 - Backend
cd MERN_Ecommerce
npm run dev      # or nodemon index.js

# Terminal 2 - Frontend
cd client
npm start
```

#### Option 2: Run both together
Use `concurrently` in `package.json` (optional setup).

---

## 🔐 Environment Variables

Create a `.env` file in the **root** of the server:

```
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/your-db-name
JWT_SECRET=your_jwt_secret_here
CLIENT_URL=http://localhost:3000
```

*(Remove variables if you’re not using JWT or other things.)*


---


## 🤝 Contributing

1. Fork the repo  
2. Create a new branch  
   ```bash
   git checkout -b feature/awesome-feature
   ```
3. Commit your changes  
   ```bash
   git commit -m "Add awesome feature"
   ```
4. Push and open a Pull Request


---

## 📬 Contact

For questions, issues, or suggestions — open an issue on the repo or create a PR.

---

**It will be great if you want to use the repo and give feedbacks!**
