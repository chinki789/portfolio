# 🌐 Chinki's Full-Stack Portfolio

A modern **Full-Stack Portfolio Website** built with **Node.js**, **Express.js**, **HTML**, **CSS**, and **JavaScript**. The portfolio dynamically loads profile information, projects, skills, education, and experience through a REST API, while also providing a functional contact form that stores messages on the server.

> Unlike static portfolios, all content is served dynamically from the backend, making it easy to update without modifying the frontend.

---

## 🚀 Live Demo

🔗 **Portfolio:** https://your-portfolio-url.onrender.com

---

## ✨ Features

- 📌 Dynamic portfolio powered by REST APIs
- 👩 Professional profile section
- 💼 Projects showcase
- 🛠 Skills & Technologies
- 🎓 Education timeline
- 💻 Experience section
- 🏆 Leadership & Achievements
- 📜 Certifications
- 📧 Functional contact form
- 💾 Contact messages stored on the server
- 🔒 Protected admin endpoint for viewing messages
- ⚡ Fast and lightweight (No database server required)

---

# 🏗 Project Structure

```text
portfolio-fullstack/
│
├── server/
│   ├── index.js            # Express server & API routes
│   └── db.js               # File-based database helper
│
├── public/
│   ├── index.html          # Portfolio layout
│   ├── style.css           # Styling
│   └── script.js           # Fetch API & UI rendering
│
├── db.json                 # Portfolio data + contact messages
├── package.json
├── .env.example
└── .gitignore
```

---

# 🛠 Tech Stack

### Frontend

- HTML5
- CSS3
- JavaScript (ES6)

### Backend

- Node.js
- Express.js

### Data Storage

- JSON File (`db.json`)

### API

- REST API

---

# 📡 REST API Endpoints

| Method | Endpoint | Description |
|----------|-------------------------|--------------------------------|
| GET | `/api/portfolio` | Complete portfolio data |
| GET | `/api/profile` | Profile information |
| GET | `/api/projects` | Project list |
| GET | `/api/experience` | Experience details |
| GET | `/api/skills` | Skills & technologies |
| GET | `/api/education` | Education details |
| GET | `/api/leadership` | Leadership activities |
| GET | `/api/certifications` | Certifications |
| POST | `/api/contact` | Submit contact form |
| GET | `/api/messages` | View submitted messages *(Admin only)* |
| GET | `/api/health` | Server health check |

---

# ⚙ Installation

### Clone the Repository

```bash
git clone https://github.com/chinki789/portfolio-fullstack.git
```

### Navigate to the Project

```bash
cd portfolio-fullstack
```

### Install Dependencies

```bash
npm install
```

### Create Environment File

```bash
cp .env.example .env
```

### Start the Server

```bash
npm start
```

Open your browser:

```text
http://localhost:3000
```

---

# 📬 Contact Form

The portfolio includes a working contact form.

Submitted messages are:

- Validated
- Rate Limited
- Saved inside `db.json`

---

# 🔐 View Submitted Messages

```bash
curl http://localhost:3000/api/messages \
-H "x-admin-key: YOUR_ADMIN_KEY"
```

Replace `YOUR_ADMIN_KEY` with the value from your `.env` file.

---

# ✏ Customizing Portfolio Content

All portfolio content is stored inside:

```text
db.json
```

You can update:

- 👤 Profile Information
- 💼 Projects
- 🛠 Skills
- 🎓 Education
- 🏆 Certifications
- 👨‍💼 Experience
- 🌟 Leadership
- 📊 Statistics

No HTML modifications are required.

---

# 🚀 Deployment

## Render (Recommended)

1. Push your repository to GitHub.
2. Go to **Render**.
3. Create a new **Web Service**.
4. Connect your repository.
5. Configure:

```text
Build Command:
npm install

Start Command:
npm start
```

6. Add an environment variable:

```text
ADMIN_KEY=your-secret-key
```

7. Deploy.

---

## Railway

1. Create a new project.
2. Connect your GitHub repository.
3. Railway automatically detects Node.js.
4. Add:

```text
ADMIN_KEY=your-secret-key
```

5. Deploy.

---

# 📂 Environment Variables

Create a `.env` file.

```env
PORT=3000
ADMIN_KEY=your-secret-admin-key
```

> Never commit your `.env` file to GitHub.

---

# 📌 Future Improvements

- MongoDB Database
- Authentication
- Admin Dashboard
- Resume Download
- Email Notifications
- Dark/Light Theme
- Blog Section
- Visitor Analytics

---

# 🤝 Connect With Me

📧 **Email:** chinkisinghal789@email.com

💼 **LinkedIn:** https://linkedin.com/in/YOUR_LINKEDIN

💻 **GitHub:** https://github.com/chinki789

🧩 **LeetCode:** https://leetcode.com/YOUR_USERNAME

---

# ⭐ Show Your Support

If you like this project, consider giving it a ⭐ on GitHub!

---

## 👩‍💻 Developed by

**Chinki**

> Building scalable web applications and AI-powered solutions.

