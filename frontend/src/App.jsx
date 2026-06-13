
import './App.css'
import api from './api/api';
import Register from './pages/Register';
import Login from './pages/Login';
import About from './pages/About';
import InstructorDashboard from './pages/InstructorDashboard';
import StudentDashboard from './pages/StudentDashboard';
import Courses from './pages/Courses';
import ProtectedRoute from './routes/ProtectedRoute';
import UnauthorizedRoute from './routes/UnauthorizedRoute';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';

import { Routes, Route } from 'react-router-dom';
import { useAuth } from "./context/AuthContext"
import StudentRoute from './routes/StudentRoutes';
import InstructorRoute from './routes/InstructorRoutes';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route element={<UnauthorizedRoute />}>
          // initial page.
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          // can access if logged or sign up.
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />
          // if created acc on role = "student"
          <Route element={< StudentRoute />}>
            <Route path="/student" element={<StudentDashboard />} />
          </Route>
          // if created acc on role = "instructor"
          <Route element={< InstructorRoute />}>
            <Route path="/instructor" element={<InstructorDashboard />}>
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
