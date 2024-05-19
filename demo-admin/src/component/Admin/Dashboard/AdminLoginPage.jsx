import React, { useState } from 'react';
import axios from 'axios';
import {Button }from 'react-bootstrap';
import { toast } from 'react-toastify';
import { ToastContainer} from 'react-toastify';
import { Navigate, Redirect } from 'react-router-dom';
// import Logo from "../../../Assests/logo.png"
function AdminLoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/adminlogin', { email, password });
            if (response.status === 200) {
                // Redirect to admin dashboard upon successful login
                // history.push('/admin/dashboard');
                setLoggedIn(true); 
                toast.success("login success")
            } else {
                console.error('Login failed');
                toast.error('Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('Error during login. Please try again later.');
        }
    };

    if (loggedIn) {
        // Redirect to admin dashboard upon successful login
        return <Navigate to="/admin/dashboard" />;
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-6">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                {/* <img
                    className="mx-auto h-10 w-auto"
                    src={Logo}
                    alt="Workflow"
                /> */}
                <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
                    Sign in to your account
                </h2>
                
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form onSubmit={handleLogin}>
                        <div>
                            <h1 className='m-2 mb-5'>Filmy Kart</h1>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium leading-5  text-gray-700"
                            >
                                Email address
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <input
                                    id="email"
                                    name="email"
                                    placeholder="user@example.com"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                />
                            </div>
                        </div>
                        <div className="mt-6">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium leading-5 text-gray-700"
                            >
                                Password
                            </label>
                            <div className="mt-1 rounded-md shadow-sm">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder='Password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                />
                            </div>
                        </div>
                        <div className="mt-6 flex items-center justify-between">
                            
                           
                        </div>
                        <div className="mt-6">
                            <button type="submit" className="btn btn-success">Sign In</button>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer/>
        </div>
    );
}

export default AdminLoginPage;
