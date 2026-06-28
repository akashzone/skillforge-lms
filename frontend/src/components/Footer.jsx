import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-8 py-16">
        {/* Top */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Brand */}
          <div>
            <h2 className="text-3xl font-black tracking-tight text-white">
              Skill<span className="text-emerald-400">Forge</span>
            </h2>

            <p className="mt-5 text-sm leading-7 text-slate-400">
              Learn industry-ready skills through structured courses,
              hands-on projects, and interactive lessons designed to
              help you grow your career.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">
              Explore
            </h3>

            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="/"
                  className="transition-colors hover:text-emerald-400"
                >
                  Home
                </a>
              </li>

              <li>
                <a
                  href="/student/courses"
                  className="transition-colors hover:text-emerald-400"
                >
                  Courses
                </a>
              </li>

              <li>
                <a
                  href="/about"
                  className="transition-colors hover:text-emerald-400"
                >
                  About
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">
              Resources
            </h3>

            <ul className="space-y-3 text-sm">
              <li className="transition-colors hover:text-emerald-400 cursor-pointer">
                Help Center
              </li>

              <li className="transition-colors hover:text-emerald-400 cursor-pointer">
                Terms & Conditions
              </li>

              <li className="transition-colors hover:text-emerald-400 cursor-pointer">
                Privacy Policy
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">
              Connect
            </h3>

            <div className="flex gap-4">
              <a
                href="https://github.com/akashzone"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-slate-700 bg-slate-800 p-3 transition-all hover:border-emerald-500 hover:bg-emerald-500"
              >
                <FaGithub size={22} />
              </a>

              <a
                href="https://www.linkedin.com/in/akashnadar-dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-slate-700 bg-slate-800 p-3 transition-all hover:border-emerald-500 hover:bg-emerald-500"
              >
                <FaLinkedin size={22} />
              </a>
            </div>

            <p className="mt-6 text-sm leading-6 text-slate-400">
              Built with React, Express, Node.js & MongoDB.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 border-t border-slate-700"></div>

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 text-sm md:flex-row">
          <p className="text-slate-400">
            © {new Date().getFullYear()} SkillForge. All rights reserved.
          </p>

          <p className="text-slate-500">
            Designed & Developed by{" "}
            <span className="font-semibold text-emerald-400">
              Akash Nadar
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;