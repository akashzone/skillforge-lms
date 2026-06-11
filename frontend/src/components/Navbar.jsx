import { Link } from "react-router-dom";

function Navbar() { 
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <h1 className="text-2xl font-bold text-blue-600">
          SkillForge
        </h1>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="/"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Home
          </a>

          <a
            href="/courses"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Courses
          </a>

          <a
            href="/about"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            About
          </a>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition">
            <Link to="/login">Login</Link>
          </button>

          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            <Link to="/register">Sign Up</Link>
          </button>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;