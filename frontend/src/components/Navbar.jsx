import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"
function Navbar() { 
  const token = localStorage.getItem("token");
  const { logout } = useAuth();
  const handleClick = ()=>{
    console.log("Successfully logged out");
    logout();
  }
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <h1 className="text-2xl font-bold text-blue-600">
          SkillForge
        </h1>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Home
          </Link>

          <Link
            to="/courses"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Courses
          </Link>

          <Link
            to="/about"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            About
          </Link>
        </div>

        {/* Buttons */}
        {
          token ?  <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition" onClick={handleClick}>
            <Link to="/login">Logout</Link>
          </button> : <div className="flex items-center gap-3">
          <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition">
            <Link to="/login">Login</Link>
          </button>

          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            <Link to="/register">Sign Up</Link>
          </button>
        </div>
        }

      </div>
    </nav>
  );
}

export default Navbar;