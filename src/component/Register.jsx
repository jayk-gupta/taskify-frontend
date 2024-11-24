import React, { useState } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Registration = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            username,
            email,
            password,
        };

        try {
            const response = await axios.post(
              "https://taskify-backend-7gvy.onrender.com/api/auth/register",
              formData,
              {
                withCredentials: true,
              }
            );

            
            setUsername("");
            setEmail("");
            setPassword("");

           
            toast.success("Registration Successful!", { autoClose: 2000 });

            console.log(response);
            setTimeout(() => {
                navigate("/login");
            }, 2000);

        } catch (err) {
        
            toast.error(err.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-white">
            <ToastContainer />
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
                    Create an Account
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            placeholder="Enter your full name"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mt-2 w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-2 w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-2 w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="text-center">
                        <button
                            type="submit"
                            className="w-full mt-4 p-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Register
                        </button>
                    </div>
                </form>

                <div className="mt-4 text-center text-sm">
                    <p className="text-gray-600">
                        Already have an account?{" "}
                        <a href="/login" className="text-blue-600 hover:underline">
                            Login here
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Registration;
