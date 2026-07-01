import React from 'react'
import { useState } from 'react'
import api from '../../api/api';
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: "student",
    });
    const navigate = useNavigate();
    async function handleSubmit(e) {
        e.preventDefault();
        // console.log(formData);
        const { username, email, password } = formData;
        if (!username || !email || !password) {
            alert("All fields are required");
            return;
        }
        if (!email.includes("@")) {
            alert("Invalid email format, must include @");
            return;
        }
        try {
            const { username, email, password, role } = formData;
            const response = await api.post("/auth/register", { username, email, password, role });
            alert(response.data?.message || "Registration successful!");
            navigate("/login");
        } catch (error) {
            console.error("Registration error:", error.response?.data || error.message);
            alert(error.response?.data?.message || "Registration failed. Please try again.");
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 via-white to-emerald-50 px-6 py-12">
            <div className="w-full max-w-lg overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
                {/* Header */}
                <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-600 px-8 py-10 text-center text-white">
                    <h1 className="text-4xl font-black">Create Account</h1>
                    <p className="mt-3 text-slate-300">
                        Join SkillForge and start your learning journey today.
                    </p>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="space-y-6 p-8"
                >
                    {/* Username */}
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Username
                        </label>

                        <input
                            type="text"
                            placeholder="Enter your username"
                            value={formData.username}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    username: e.target.value,
                                })
                            }
                            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                        />
                    </div>

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
                            placeholder="Create a password"
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

                    {/* Role */}
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Register As
                        </label>

                        <select
                            value={formData.role}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    role: e.target.value,
                                })
                            }
                            className="w-full cursor-pointer rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition-all duration-200 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                        >
                            <option value="student"> Student</option>
                            <option value="instructor">  Instructor</option>
                        </select>
                    </div>

                    {/* Register Button */}
                    <button
                        type="submit"
                        className="w-full cursor-pointer rounded-xl bg-emerald-500 py-3 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:bg-emerald-600 hover:shadow-emerald-500/30 active:scale-[0.98]"
                    >
                        Create Account
                    </button>

                    {/* Divider */}
                    <div className="flex items-center gap-3">
                        <div className="h-px flex-1 bg-slate-200"></div>
                        <span className="text-sm text-slate-400">OR</span>
                        <div className="h-px flex-1 bg-slate-200"></div>
                    </div>

                    {/* Login */}
                    <p className="text-center text-sm text-slate-500">
                        Already have an account?{" "}
                        <span onClick={() => navigate("/login")} className="cursor-pointer font-semibold text-emerald-600 transition hover:text-emerald-700">
                            Sign In
                        </span>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Register;