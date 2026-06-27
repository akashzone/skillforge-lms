import { useLocation } from "react-router-dom";


import './App.css'
import api from './api/api';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import About from './pages/About';
import InstructorDashboard from './pages/instructor/InstructorDashboard';
import Courses from './pages/Courses';
import ProtectedRoute from './routes/ProtectedRoute';
import UnauthorizedRoute from './routes/UnauthorizedRoute';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';

import { Routes, Route } from 'react-router-dom';
import { useAuth } from "./context/AuthContext"
import StudentRoute from './routes/StudentRoutes';
import InstructorRoute from './routes/InstructorRoutes';
import CreateCourse from './pages/instructor/CreateCourse';
import MyCourses from './pages/instructor/MyCourses';
import CourseDetail from './pages/instructor/CourseDetail';
import EditCourse from './pages/instructor/EditCourse';
import CreateSection from './pages/instructor/CreateSection';
import CreateLesson from './pages/instructor/CreateLesson';
import UploadLecture from './pages/instructor/UploadLecture';
import PreviewLecture from './pages/instructor/PreviewLecture';


// -- Student --
import StudentDashboard from './pages/student/StudentDashboard';
import StudentCourseDetail from './pages/student/StudentCourseDetail';
import StudentMyCourse from "./pages/student/MyCourse"
import CourseContent from './pages/student/CourseContent';
import Footer from "./components/Footer";

function App() {
  const location = useLocation();

  const hideNavbar = location.pathname.startsWith("/student/my-course/");
  return (
    <>
      {!hideNavbar && <Navbar />}      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route element={<UnauthorizedRoute />}>
          // initial page.
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<ProtectedRoute />}>

          // can access if logged or sign up.
          <Route path="/about" element={<About />} />
          <Route path="/student/courses" element={<Courses />} />

          // if created acc on role = "student"
          <Route element={< StudentRoute />}>
            <Route path="/student" element={<StudentDashboard />} />
            <Route path="/student/course/:id" element={<StudentCourseDetail />} />
            <Route path="/student/my-courses" element={<StudentMyCourse />} />
            <Route path="/student/my-course/:id" element={<CourseContent />} />
          </Route>

          // if created acc on role = "instructor"
          <Route element={< InstructorRoute />}>
            <Route path="/instructor" element={<InstructorDashboard />}></Route>
            <Route path="/instructor/create-course" element={< CreateCourse />}></Route>
            <Route path="/instructor/my-courses" element={< MyCourses />}></Route>
            <Route path="/instructor/courses/:id" element={< CourseDetail />}></Route>
            <Route path="/instructor/:id/edit" element={< EditCourse />}></Route>
            <Route path="/instructor/courses/:id/create-section" element={< CreateSection />}></Route>
            <Route path="/instructor/lessons/:id/create-lesson" element={< CreateLesson />}></Route>
            <Route path="/instructor/lessons/:id/uploads" element={< UploadLecture />}></Route>
            <Route path="/instructor/lessons/:id/preview-lesson" element={< PreviewLecture />}></Route>
          </Route>
        </Route>
      </Routes>
      <Footer/>
    </>
  )
}

export default App
