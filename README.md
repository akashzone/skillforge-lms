# SkillForge LMS

SkillForge LMS is a comprehensive, modern Learning Management System (LMS) built on the MERN stack. Designed with a clean, responsive interface and role-based access control, it empowers instructors to publish high-quality educational content and allows students to seamlessly enroll, learn, and track their progress.

---

## 🚀 Features

### 👤 Role-Based Authorization
- **Students**: Can explore courses, enroll in their chosen topics, stream video lessons, and track progress.
- **Instructors**: Have full control over course creation, including managing sections, lessons, uploading video lectures, and accessing an instructor dashboard.

### 📚 Course & Content Management
- Multi-tier course structure: **Course ➡️ Sections ➡️ Lessons**.
- Full CRUD operations for courses, sections, and lessons.
- Drag-and-drop or file-selector lecture video uploads with streaming capabilities.

### 🎥 Cloud Integration
- Integrated with **Cloudinary** for scalable, secure hosting of video lectures and media assets.
- Multer-driven buffer streaming to ensure files are processed securely without cluttering the local server.

### 📈 Progress Tracking & Student Experience
- Track completed lessons within each course.
- Interactive course player interface.
- Confetti celebration using `react-confetti` upon course completion.

---

## 🛠️ Tech Stack

| Domain | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | React (v19) | Modern component-driven UI library |
| | Vite | Next-generation frontend build tool |
| | Tailwind CSS (v4) | Utility-first CSS framework for modern styling |
| | React Router DOM (v7) | Declarative routing |
| | Lucide React / React Icons | Clean and consistent iconography |
| | Axios | Promise-based HTTP client for API requests |
| **Backend** | Node.js / Express | Fast, unopinionated web framework for API services |
| | MongoDB / Mongoose | Flexible NoSQL document database and ODM |
| | JWT (JSON Web Tokens) | Secure token-based user authentication |
| | Multer & Streamifier | Multipart form-data processing and buffer streaming |
| | Cloudinary SDK | Cloud storage management for lecture videos |

---

## 📂 Directory Structure

```text
SkillForge/
├── backend/
│   ├── config/             # Database & Cloudinary configurations
│   ├── controller/         # API controllers handling business logic
│   ├── middleware/         # Auth & Role-based route guard middlewares
│   ├── models/             # Mongoose database schemas
│   ├── routes/             # Express API endpoints
│   ├── utils/              # Helper utilities
│   ├── server.js           # App entrypoint
│   └── package.json
└── frontend/
    ├── public/             # Static public assets
    ├── src/
    │   ├── api/            # Axios API client setup
    │   ├── components/     # Shared layout & UI components (Navbar, Footer, Cards)
    │   ├── context/        # React Auth State context provider
    │   ├── pages/          # Views grouped by Auth, Student, and Instructor roles
    │   ├── routes/         # Protected/Public React routing guards
    │   ├── App.jsx         # App routing definitions
    │   ├── main.jsx        # React DOM entrypoint
    │   └── index.css       # Tailwind configuration imports
    ├── vite.config.js
    └── package.json
```

---

## ⚙️ Environment Configurations

Configure the environment variables in both directories prior to running the applications.

### Backend Configurations
Create a `.env` file inside the `backend/` directory:
```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key
FRONTEND_URL=http://localhost:5173
```

### Frontend Configurations
Create a `.env` file inside the `frontend/` directory:
```env
VITE_API_URL=http://localhost:3000/api
```

---

## 🛣️ API Reference

### 🔐 Authentication (`/api/auth`)
| Method | Endpoint | Description | Auth Required | Role |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/register` | Register a new user | No | Guest |
| `POST` | `/login` | Login user and receive JWT | No | Guest |

### 📖 Courses (`/api/courses`)
| Method | Endpoint | Description | Auth Required | Role |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/` | Retrieve all active courses | No | Guest/Student/Instructor |
| `GET` | `/:id` | Get specific course details | Yes | Student |
| `GET` | `/instructor/my-courses` | Get instructor's created courses | Yes | Instructor |
| `GET` | `/instructor/my-courses/:id` | Get course details for management | Yes | Instructor |
| `POST` | `/` | Create a new course | Yes | Instructor |
| `PUT` | `/:id` | Update an existing course | Yes | Instructor |
| `DELETE` | `/:id` | Delete a course | Yes | Instructor |

### 📂 Sections (`/api/sections`)
| Method | Endpoint | Description | Auth Required | Role |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/student/:id` | Get sections as student | Yes | Student |
| `GET` | `/student/:id/lessons` | Get lessons under section | Yes | Student |
| `POST` | `/` | Create a section | Yes | Instructor |
| `GET` | `/:id` | Get specific section details | Yes | Instructor |
| `GET` | `/:id/lessons` | Get lessons in a section | Yes | Instructor |
| `PUT` | `/:id` | Update section title/description | Yes | Instructor |
| `DELETE` | `/:id` | Delete section | Yes | Instructor |

### 📝 Lessons (`/api/lessons`)
| Method | Endpoint | Description | Auth Required | Role |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/` | Create a lesson | Yes | Instructor |
| `GET` | `/:id` | Get lesson details | Yes | Instructor |
| `PUT` | `/:id` | Edit lesson details | Yes | Instructor |
| `DELETE` | `/:id` | Delete a lesson | Yes | Instructor |

### ☁️ Media Uploads (`/api/uploads`)
| Method | Endpoint | Description | Auth Required | Role |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/` | Upload lecture video to Cloudinary | Yes | Instructor |

### 🎟️ Enrollment (`/api/enroll`)
| Method | Endpoint | Description | Auth Required | Role |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/` | Enroll student in a course | Yes | Student |
| `GET` | `/:courseId` | Check enrollment status | Yes | Student |
| `GET` | `/` | Retrieve student enrolled courses | Yes | Student |

### 📈 Progress (`/api/progress`)
| Method | Endpoint | Description | Auth Required | Role |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/:lessonId` | Toggle lesson completion progress | Yes | Student |
| `GET` | `/course/:courseId` | Fetch overall course progress details | Yes | Student |

---

## 🏃 Local Setup & Installation

### Prerequisites
Make sure you have Node.js (v18+) and MongoDB installed locally or access to a MongoDB Atlas cluster.

### Step 1: Clone & Navigate
```bash
git clone https://github.com/akashzone/skillforge-lms.git
cd skillforge-lms
```

### Step 2: Set Up Backend
```bash
cd backend
npm install
# Configure your .env file
npm run dev
```

### Step 3: Set Up Frontend
```bash
cd ../frontend
npm install
# Configure your .env file
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view and interact with the application.