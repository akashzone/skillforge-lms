
import './App.css'
import api from './api/api';
import Register from './pages/Register';
import Login from './pages/Login';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
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
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route element={< StudentRoute />}>
            <Route path="/about" element={<About />} />
            <Route path="/courses" element={<Courses />} />
          </Route>

          <Route element={< InstructorRoute/>}>
            <Route path="/dashboard" element={<Dashboard/>}>
          </Route>
        </Route>
      </Route>
      </Routes>
    </>
  )
}

export default App
