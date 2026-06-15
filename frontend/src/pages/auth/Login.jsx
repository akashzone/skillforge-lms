import React from 'react'
import { useState } from 'react';
import api from '../../api/api';
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";



const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const navigate = useNavigate();
    const { login,token } = useAuth();

    async function handleSubmit(e) {
        e.preventDefault();
        // console.log(formData);
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
            console.log("Submitting form with data:", { email, password });
            const response = await api.post("/auth/login", { email, password });
            login(response.data.token, response.data.user);
            console.log("Role:", response.data.user.role);

            if (response.data.user.role === "student") {
                navigate("/student");
            } else {
                navigate("/instructor");
            }
        } catch (error) {
            console.log(error.response.data);
        }
    }
    return (
        <div className='card p-4 rounded-lg shadow-md w-full max-w-md mx-auto mt-10'>
            <h1 className='font-semibold text-center'>Sign In</h1>
            <form className='flex flex-col gap-4 mt-4 *:bg-gray-100 p-4 rounded-lg shadow-md' onSubmit={handleSubmit}>

                <input className='border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    type="email"
                    placeholder='Email'
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <input className='border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    type="password"
                    placeholder='Password'
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded" type='submit'>
                    Login
                </button>
            </form>
        </div>
    )
}

export default Login