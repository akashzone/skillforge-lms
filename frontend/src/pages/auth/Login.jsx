import React from 'react'
import { useState } from 'react';
import api from '../../api/api';
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";



const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const navigate = useNavigate();
    const { login, token } = useAuth();

    async function handleSubmit(e) {
        e.preventDefault();
        const { email, password } = formData;
        if (!email || !password) {
            alert("All fields are required");
            return;
        }
        if (!email.includes("@")) {
            alert("Invalid email format, must include @");
            return;
        }
        try {
            const { email, password } = formData;
            const response = await api.post("/auth/login", { email, password });
            login(response.data.token, response.data.user);
            // console.log("Role:", response.data.user.role);

            if (response.data.user.role === "student") {
                navigate("/student/dashboard");
            } else {
                navigate("/instructor");
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-emerald-50 flex items-center justify-center px-6 py-12">
            <div className="w-full max-w-md overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">

                {/* Header */}
                <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-600 px-8 py-10 text-center text-white flex flex-col items-center">
                    <img src={logo} alt="SkillForge Logo" className="h-16 w-16 object-contain rounded-2xl mb-4 bg-white/10 p-2 backdrop-blur-sm" />
                    <h1 className="text-4xl font-black">Welcome Back</h1>
                    <p className="mt-3 text-slate-300">
                        Sign in to continue your learning journey.
                    </p>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="space-y-6 p-8"
                >
                    {/* Email */}
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Email Address
                        </label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    email: e.target.value,
                                })
                            }
                            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    password: e.target.value,
                                })
                            }
                            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                        />
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full cursor-pointer rounded-xl bg-emerald-500 py-3 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:bg-emerald-600 hover:shadow-emerald-500/30 active:scale-[0.98]"
                    >
                        Sign In
                    </button>

                    {/* Divider */}
                    <div className="flex items-center gap-3">
                        <div className="h-px flex-1 bg-slate-200"></div>
                        <span className="text-sm text-slate-400">OR</span>
                        <div className="h-px flex-1 bg-slate-200"></div>
                    </div>

                    {/* Register */}
                    <p className="text-center text-sm text-slate-500">
                        Don't have an account?{" "}
                        <span onClick={() =>navigate("/register")} className="cursor-pointer font-semibold text-emerald-600 hover:text-emerald-700">
                            Create one
                        </span>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login