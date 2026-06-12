import React from 'react'
import { useState } from 'react'
import api from '../api/api';
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
            console.log("Submitting form with data:", { username, email, password, role });
            const response = await api.post("/auth/register", { username, email, password, role });
            console.log(response.data);
            role == "student" ?
                navigate("/") : navigate("/dashboard")
        } catch (error) {
            console.log(error.response.data);
        }
    }
    return (
        <div className='card p-4 rounded-lg shadow-md w-full max-w-md mx-auto mt-10'>
            <h1 className='font-semibold text-center'>Sign Up</h1>
            <form className='flex flex-col gap-4 mt-4 *:bg-gray-100 p-4 rounded-lg shadow-md' onSubmit={handleSubmit}>
                <input className='border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    type="text"
                    placeholder='Username'
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />

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
                <select
                    className=' border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    name="role"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                >
                    <option value="student">Student</option>
                    <option value="instructor">Instructor</option>
                </select>
                <button className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded" type='submit'>
                    Register
                </button>
            </form>
        </div>
    )
}

export default Register;