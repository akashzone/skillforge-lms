
import './App.css'
import api from './api/api';
import Register from './pages/Register';
import Login from './pages/Login';
import About from './pages/About';
import Courses from './pages/Courses';
import ProtectedRoute from './pages/ProtectedRoute';
import UnauthorizedRoute from './pages/UnauthorizedRoute';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';

import { Routes, Route } from 'react-router-dom';
import { useAuth } from "./context/AuthContext"

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route element={<UnauthorizedRoute />}>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />}/>
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
