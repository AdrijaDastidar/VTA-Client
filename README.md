# 🎓 Virtual Teaching Assistant – Client (Frontend)

Welcome to the **frontend** of **Virtual Teaching Assistant**, an AI-powered web platform designed to revolutionize learning and teaching experiences! 🧑‍🏫📚

From **AI-generated lecture summaries** to **interactive quizzes**, **student performance dashboards**, and a **24/7 chatbot tutor**, this project brings **intelligence, automation, and accessibility** to education — all wrapped in a sleek, modern UI. ✨

---

## 🌟 Core Features

- 🎤 **Live Audio Capture** – Record lectures in real-time, ready for processing
- 🧾 **Lecture Summaries** – Automatically generated, searchable summaries
- 🧠 **AI Quizzes** – Personalized quizzes built from lecture content
- 📊 **Progress Dashboards** – Real-time insights into student performance
- 🤖 **Chatbot Tutor** – Ask follow-up questions on misunderstood topics
- 💬 **Discussion Hub** – Shared forum for teacher-student topic discussion
- 🧑‍🏫 **Teacher Tools** – Know where students are struggling and improve
- 🏛️ **Admin Insights** – University-level overview on faculty impact

---

## 🛠️ Tech Stack

| 🔧 Layer            | 🚀 Tech Used                                                                 |
|--------------------|------------------------------------------------------------------------------|
| 🧱 **Framework**    | [React](https://react.dev/), [Vite](https://vitejs.dev/)                     |
| 🧭 **Routing**      | `react-router-dom@7`                                                         |
| 🎨 **Styling**      | TailwindCSS, `clsx`, `tailwind-merge`                                       |
| 🎞️ **Animations**   | `framer-motion`, `animate.css`                                              |
| 🧩 **UI Toolkit**   | Radix UI (`@radix-ui/*`), `lucide-react`                                    |
| 📈 **Charts**       | `recharts`                                                                   |
| 📑 **Export Tools** | `html2canvas`, `jspdf`, `pdf-lib`, `pdfjs-dist`                             |
| 🧰 **Utilities**    | `mammoth`, `date-fns`                                                        |

---

## 🌐 App Routes Overview

Here's how the app is structured using `react-router-dom`:

| 🌍 Route           | 🔧 Component            | 📋 Description                                  |
|-------------------|------------------------|------------------------------------------------|
| `/`               | `Login`                | 🔐 Entry point for students, teachers, admins  |
| `/home`           | `Home`                 | 🏠 Personalized landing screen after login     |
| `/dashboard`      | `Dashboard`            | 🎓 Student’s learning & quiz performance view  |
| `/summary`        | `Summary`              | 📄 Lecture summaries for easy topic recall     |
| `/quiz`           | `QuizHome`             | 🧪 Quiz list based on your lectures            |
| `/quiz/:id`       | `Quiz`                 | 📝 Take quiz for a specific topic              |
| `/result/:score`  | `Result`               | 📊 Feedback on quiz results and corrections    |
| `/create`         | `CreateQuiz`           | ✍️ Generate new quiz (manual + AI-powered)     |
| `/dash`           | `TeacherDashboard`     | 👩‍🏫 Overview of student performance & analytics|
| `/setting`        | `Setting`              | ⚙️ Preferences & user account controls         |
| `/voice`          | `Voice`                | 🎤 Upload or record audio for summary          |

---

## ⚙️ Getting Started

### ✅ Prerequisites

- Node.js v18 or higher
- npm installed

### 🚀 Setup Instructions

```bash
# Step into the frontend folder
cd client

# Install all dependencies
npm install

# Start development server
npm run dev
```

---

## 💡 Suggestions for Future Enhancements

* 🌙 Dark mode toggle using Radix primitives
* 🔐 Role-based route protection (Student / Teacher / Admin)
* 🛡️ JWT-based persistent login using cookies or localStorage
* 📤 Drag-and-drop audio upload with live waveform preview
* 📱 Progressive Web App (PWA) support for mobile

---

## 👥 Contributing

We ❤️ contributions! Here's how you can help:

* 💬 Suggest new features
* 🐛 Report bugs
* 📂 Submit PRs and improvements

Let’s build better classrooms together — one smart assistant at a time! 🚀

---
