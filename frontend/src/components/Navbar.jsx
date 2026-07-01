import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Search } from "lucide-react";

function Navbar() {
  const { token, user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex h-20 max-w-7xl items-center px-6">

        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-black tracking-tight text-slate-900 transition-colors hover:text-emerald-600"
        >
          SkillForge
        </Link>

        {/* Desktop Student Navbar */}
        {token && user?.role === "student" && (
          <div className="ml-10 hidden items-center gap-8 text-sm font-medium lg:flex">
            <Link
              to="/student/dashboard"
              className="relative text-slate-600 transition hover:text-emerald-600 after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-0 after:bg-emerald-500 after:transition-all hover:after:w-full"
            >
              Dashboard
            </Link>

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
        )}

        {/* Desktop Instructor Navbar */}
        {token && user?.role === "instructor" && (
          <div className="ml-10 hidden items-center gap-8 text-sm font-medium lg:flex">
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

          {/* Desktop Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {token ? (
              <button
                onClick={handleLogout}
                className="rounded-xl cursor-pointer bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/20"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-all hover:border-emerald-500 hover:text-emerald-600"
                >
                  Log in
                </Link>

                <Link
                  to="/register"
                  className="rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/20"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden rounded-lg p-2 hover:bg-slate-100"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-slate-200 bg-white lg:hidden">

          {token && user?.role === "student" && (
            <div className="flex flex-col p-5 gap-4 text-sm font-medium">
              <Link
                to="/student/dashboard"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>

              <Link
                to="/student/courses"
                onClick={() => setIsOpen(false)}
              >
                Courses
              </Link>

              <Link
                to="/student/my-courses"
                onClick={() => setIsOpen(false)}
              >
                My Learning
              </Link>
            </div>
          )}

          {token && user?.role === "instructor" && (
            <div className="flex flex-col p-5 gap-4 text-sm font-medium">
              <Link
                to="/instructor"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>

              <Link
                to="/instructor/my-courses"
                onClick={() => setIsOpen(false)}
              >
                My Courses
              </Link>
            </div>
          )}

          <div className="border-t border-slate-200 p-5 flex flex-col gap-3">
            {token ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="rounded-xl bg-emerald-500 px-5 py-2.5 text-white font-semibold"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl border border-slate-200 px-5 py-2.5 text-center font-semibold"
                >
                  Log in
                </Link>

                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl bg-emerald-500 px-5 py-2.5 text-center text-white font-semibold"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;