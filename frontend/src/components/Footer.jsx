import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#1c1d1f] text-gray-300">
      <div className="max-w-7xl mx-auto px-8 py-12">

        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <h2 className="text-3xl font-bold text-purple-500">
              SkillForge
            </h2>

            <p className="mt-4 text-sm leading-6 text-gray-400">
              Learn industry-ready skills through structured courses,
              hands-on projects, and interactive lessons.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Explore
            </h3>

            <ul className="space-y-3 text-sm">
              <li>
                <a href="/" className="hover:text-white transition">
                  Home
                </a>
              </li>

              <li>
                <a href="/student/courses" className="hover:text-white transition">
                  Courses
                </a>
              </li>

              <li>
                <a href="/about" className="hover:text-white transition">
                  About
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Resources
            </h3>

            <ul className="space-y-3 text-sm">
              <li>Help Center</li>
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Connect
            </h3>

            <div className="flex gap-4">

              <a
                href="https://github.com/akashzone"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gray-800 hover:bg-purple-600 transition"
              >
                <FaGithub size={22} />
              </a>

              <a
                href="https://www.linkedin.com/in/akashnadar-dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gray-800 hover:bg-blue-600 transition"
              >
                <FaLinkedin size={22} />
              </a>

            </div>

            <p className="mt-5 text-sm text-gray-400">
              Built with React, Express, Node.js & MongoDB.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-8"></div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} SkillForge. All rights reserved.
          </p>

          <p className="text-sm text-gray-500">
            Designed & Developed by <span className="text-purple-400 font-medium">Akash Nadar</span>
          </p>

        </div>

      </div>
    </footer>
  );
};

export default Footer;