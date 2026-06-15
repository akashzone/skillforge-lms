import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { Search } from "lucide-react";

function Navbar() {
  const { token, user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    // Redirect student to search results page or filter locally
    navigate(`/courses?search=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <h1 className="text-2xl font-bold text-blue-600">
          SkillForge
        </h1>

        {/* Navigation Links */}
        {token && (
          <>
            {user?.role === "student" && (<>
              <form
                onSubmit={handleSearch}
                className="hidden md:flex relative flex-1 max-w-md mx-8 items-center rounded-full border border-gray-200 bg-white p-1 transition-all focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100"
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="What do you want to learn?"
                  className="w-full bg-transparent pl-4 pr-12 py-1.5 text-sm text-gray-700 placeholder-gray-400 outline-none"
                />
                 <button
                    type="submit"
                    aria-label="Search"
                    className="absolute right-1 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white transition-all hover:bg-blue-700 active:scale-95"
                  >
                    <Search className="h-4 w-4" strokeWidth={2.5} />
                  </button>
              </form>
              <div className="hidden md:flex items-center gap-8">
                <Link
                  to="/student"
                  className="text-gray-700 hover:text-blue-600 transition"
                >
                  Dashboard
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
            </>
            )}

            {user?.role === "instructor" && (
              <div className="hidden md:flex items-center gap-8">
                <Link
                  to="/instructor"
                  className="text-gray-700 hover:text-blue-600 transition"
                >
                  Dashboard
                </Link>
                <Link
                  to="/instructor/my-courses"
                  className="text-gray-700 hover:text-blue-600 transition"
                >
                  My Course
                </Link>
                <a
                  href="#"
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Profile
                </a>
              </div>
            )}
          </>
        )}

        {/* Auth Buttons */}
        {token ? (
          <button
            className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;