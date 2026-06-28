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
    <nav className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex h-20 max-w-7xl items-center gap-6 px-6">

        {/* Logo */}
        <Link
          to="/"
          className="mr-8 text-3xl font-black tracking-tight text-slate-900 transition-colors hover:text-emerald-600"
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
                placeholder="Search for courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-5 pr-12 text-sm text-slate-700 placeholder:text-slate-400 outline-none transition-all focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
              />

              <button
                type="submit"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition-colors hover:text-emerald-600"
              >
                <Search size={20} />
              </button>
            </form>

            {/* Links */}
            <div className="hidden items-center gap-8 lg:flex text-sm font-medium">
              <Link
                to="/student/courses"
                className="relative text-slate-600 transition hover:text-emerald-600 after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-0 after:bg-emerald-500 after:transition-all hover:after:w-full"
              >
                Courses
              </Link>

              <Link
                to="/student/my-courses"
                className="relative text-slate-600 transition hover:text-emerald-600 after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-0 after:bg-emerald-500 after:transition-all hover:after:w-full"
              >
                My Learning
              </Link>
            </div>
          </>
        )}

        {/* Instructor Navbar */}
        {token && user?.role === "instructor" && (
          <div className="ml-auto hidden items-center gap-8 text-sm font-medium lg:flex">
            <Link
              to="/instructor"
              className="relative text-slate-600 transition hover:text-emerald-600 after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-0 after:bg-emerald-500 after:transition-all hover:after:w-full"
            >
              Dashboard
            </Link>

            <Link
              to="/instructor/my-courses"
              className="relative text-slate-600 transition hover:text-emerald-600 after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-0 after:bg-emerald-500 after:transition-all hover:after:w-full"
            >
              My Courses
            </Link>
          </div>
        )}

        {/* Right Side */}
        <div className="ml-auto flex items-center gap-3">
          {token ? (
            <>
              <button className="rounded-xl cursor-pointer border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-all hover:border-emerald-500 hover:text-emerald-600">
                Profile
              </button>

              <button
                onClick={handleLogout}
                className="rounded-xl cursor-pointer bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/20"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-xl border cursor-pointer border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-all hover:border-emerald-500 hover:text-emerald-600"
              >
                Log in
              </Link>

              <Link
                to="/register"
                className="rounded-xl cursor-pointer bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/20"
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