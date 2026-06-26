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
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="mx-auto flex h-18 max-w-[1400px] items-center gap-6 px-6">

        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-extrabold tracking-tight mx-10 text-purple-700"
        >
          SkillForge
        </Link>

        {/* Student Navbar */}
        {token && user?.role === "student" && (
          <>
            {/* Search */}
            <form
              onSubmit={handleSearch}
              className="relative hidden flex-1 lg:flex"
            >
              <input
                type="text"
                placeholder="Search for anything"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-gray-700 bg-gray-50 py-3 pl-6 pr-14 text-sm outline-none transition focus:border-black"
              />

              <button
                type="submit"
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-600 hover:text-black"
              >
                <Search size={20} />
              </button>
            </form>

            {/* Links */}
            <div className="hidden lg:flex items-center gap-6 text-sm font-medium">

              {/* <Link
                to="/student"
                className="hover:text-purple-700 transition"
              >
                Dashboard
              </Link> */}

              <Link
                to="/courses"
                className="hover:text-purple-700 transition"
              >
                Courses
              </Link>
              <Link
                to="/courses"
                className="hover:text-purple-700 transition"
              >
                My Learning
              </Link>

              {/* <Link
                to="/about"
                className="hover:text-purple-700 transition"
              >
                About
              </Link> */}

            </div>
          </>
        )}

        {/* Instructor Navbar */}
        {token && user?.role === "instructor" && (
          <div className="ml-auto hidden lg:flex items-center gap-6 text-sm">

            <Link
              to="/instructor"
              className="hover:text-purple-700 transition"
            >
              Dashboard
            </Link>

            <Link
              to="/instructor/my-courses"
              className="hover:text-purple-700 transition"
            >
              My Courses
            </Link>

          </div>
        )}

        {/* Right Side */}
        <div className="ml-auto flex items-center gap-3">

          {token ? (
            <>
              <button className="border border-black px-4 py-2 text-sm font-medium hover:bg-gray-100 transition">
                Profile
              </button>

              <button
                onClick={handleLogout}
                className="bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="border border-black px-4 py-2 text-sm font-medium hover:bg-gray-100 transition"
              >
                Log in
              </Link>

              <Link
                to="/register"
                className="bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 transition"
              >
                Sign up
              </Link>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;