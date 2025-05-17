# 🚀 RevoltronX Blog Editor

A modern full-stack blog editor with auto-save, rich text editing, and one-click publishing — built for the RevoltronX internship assignment.

---

## ✨ Features

* 📝 Rich Text Editor
* 📎 Auto-Save Drafts (every 5 seconds)
* 📄 One-Click Publish
* ✏️ Edit Drafts & Published Blogs

---

## 💠 Tech Stack

### Frontend

* Next.js 14
* React
* Tailwind CSS
* Lucide Icons
* React Hot Toast
* React-Quill (`react-quill-new`)

### Backend

* Node.js
* Express.js
* MongoDB + Mongoose

---

## 📦 Installation & Running Locally

### 1⃣ Backend Setup

```bash
cd backend
npm install
npm run dev
```

> Ensure MongoDB is running locally or update the connection URI in `server.js`.

---

### 2⃣ Frontend Setup

```bash
cd frontend
npm install
```

Create `.env.local` in the `frontend` folder:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

---

## 📄 Assignment

Internship Assignment for **RevoltronX**
Task: Build a Blog Editor Page with Backend & Auto-Save Draft Feature

---

