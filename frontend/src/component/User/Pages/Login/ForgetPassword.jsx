import React, { useState } from 'react';
import axios from 'axios';
import Logo from "../../../assets/logo.png";
import { ToastContainer, toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css';

const ForgotPassword = () => {
    const [userEmail, setUserEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleResetRequest = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        try {
            await axios.post('http://localhost:5000/api/auth/forgot-password', { userEmail });
            setMessage('Email sent with password reset instructions');
            toast.success('Email sent with password reset instructions');
            window.location.href="/login"
        } catch (error) {
            setMessage('Error: ' + error.response.data.message);
        }
    };

    return (
        <div>
            <div className="bg-black min-h-screen flex items-center justify-center">
                <div className="relative z-10 bg-white h-[500px] w-[350px] p-8 rounded-md shadow-lg">
                    <img src={Logo} alt="logo" />
                    <h1 className="text-xl font-bold mb-4 text-center">Reset Your Password</h1>
                    <form onSubmit={handleResetRequest}>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2 mt-[50px]" htmlFor="email">
                                Email Address
                            </label>
                            <input
                                className="appearance-none border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
                                id="email"
                                type="email"
                                name="userEmail"
                                value={userEmail}
                                onChange={(e) => setUserEmail(e.target.value)}
                                placeholder="Email"
                            />
                        </div>
                        <div className="flex items-center justify-between gap-8">
                            <button
                                className="bg-violet-700  text-white font-bold mt-[50px] py-2 px-4 w-full rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                Reset Password {/* Change button text to indicate password reset action */}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default ForgotPassword;
