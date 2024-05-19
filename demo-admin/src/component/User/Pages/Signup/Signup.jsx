import React, { useState } from 'react';
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
// import Logo from "../../../assets/logo.png"
import { Link } from 'react-router-dom';
function Signup() {
    
    const [formData, setFormData] = useState({
        userFullName: '',
        userEmail: '',
        userPassword: ''
    });

    const navigate = useNavigate();

    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.userFullName.trim()) {
            toast.error('Full name is required');
            return;
        }
        if (!formData.userEmail.trim()) {
            toast.error('Email is required');
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.userEmail.trim())) {
            toast.error('Invalid email format');
            return;
        }
        if (!formData.userPassword.trim()) {
            toast.error('Password is required');
            return;
        }
        if (formData.userPassword.trim().length < 8) {
            toast.error('Password must be at least 8 characters long');
            return;
        }
        if (formData.userPassword.trim().toLowerCase() === formData.userFullName.trim().toLowerCase()) {
            toast.error('Password should not be your name');
            return;
        }
        try {
            const response = await axios.post('http://localhost:5000/api/signup', formData);
            console.log(response.data);
            alert('Registration successful!');
            
            navigate('/login');
        } catch (error) {
            console.error('Signup Error:', error);
            if (error.response && error.response.data && error.response.data.error) {
                toast.error(error.response.data.error);
            } else {
                toast.error('Something went wrong. Please try again later.');
            }
        }
    };


    return (
        // <div>
        //     <div className="h-screen md:flex">
        //         <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center hidden">
        //             <div>
        //                 <h1 className="text-white font-bold text-4xl font-sans">GoFinance</h1>
        //                 <p className="text-white mt-1">
        //                     The most popular peer to peer lending at SEA
        //                 </p>
        //                 <button
        //                     type="submit"
        //                     className="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2"
        //                 >
        //                     Read More
        //                 </button>
        //             </div>
        //             <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8" />
        //             <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8" />
        //             <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8" />
        //             <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8" />
        //         </div>
        //         <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
        //             <form className="bg-white" onSubmit={handleSubmit}>
        //                 <h1 className="text-gray-800 font-bold text-2xl mb-1">Hello Again!</h1>
        //                 <p className="text-sm font-normal text-gray-600 mb-7">Welcome Back</p>
        //                 <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
        //                     <svg
        //                         xmlns="http://www.w3.org/2000/svg"
        //                         className="h-5 w-5 text-gray-400"
        //                         viewBox="0 0 20 20"
        //                         fill="currentColor"
        //                     >
        //                         <path
        //                             fillRule="evenodd"
        //                             d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
        //                             clipRule="evenodd"
        //                         />
        //                     </svg>
        //                     <input
        //                         className="pl-2 outline-none border-none"
        //                         type="text"
        //                         name="userFullName" value={formData.userFullName} onChange={handleChange}
        //                         placeholder="Full name"
        //                     />
        //                 </div>
        //                 <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
        //                     <svg
        //                         xmlns="http://www.w3.org/2000/svg"
        //                         className="h-5 w-5 text-gray-400"
        //                         fill="none"
        //                         viewBox="0 0 24 24"
        //                         stroke="currentColor"
        //                     >
        //                         <path
        //                             strokeLinecap="round"
        //                             strokeLinejoin="round"
        //                             strokeWidth={2}
        //                             d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
        //                         />
        //                     </svg>
        //                     <input
        //                         className="pl-2 outline-none border-none"
        //                         type="text"
        //                         name="userEmail" value={formData.userEmail} onChange={handleChange}
        //                         placeholder="Email Address"
        //                     />
        //                 </div>
        //                 <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
        //                     <svg
        //                         xmlns="http://www.w3.org/2000/svg"
        //                         className="h-5 w-5 text-gray-400"
        //                         viewBox="0 0 20 20"
        //                         fill="currentColor"
        //                     >
        //                         <path
        //                             fillRule="evenodd"
        //                             d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
        //                             clipRule="evenodd"
        //                         />
        //                     </svg>
        //                     <input
        //                         className="pl-2 outline-none border-none"
        //                         type="text"
        //                         name="userPassword" value={formData.userPassword} onChange={handleChange}
        //                         placeholder="Password"
        //                     />
        //                 </div>
        //               <button
        //                     type="submit"
        //                     className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
        //                 >
        //                     Sign Up
        //                 </button>
                       
        //             </form>
        //         </div>
        //     </div>
        //     <ToastContainer />
        // </div>
        <div>
     

        <div className="bg-black min-h-screen flex items-center justify-center">
          {/* Background Image */}
  
          {/* Login Form */}
          <div className="relative z-10 bg-white h-[550px] w-[350px] p-8 rounded-md shadow-lg">
            {/* <img src={Logo} alt="logo" /> */}
            <h1 className="text-xl font-bold mb-4 text-center">Welcome</h1>
            <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                  Full Name
                </label>
                <input
                  className="appearance-none border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
                  id="text"
                  type="text"
                  name="userFullName"
                  value={formData.userFullName}
                  onChange={handleChange}
                  placeholder="User Full Name"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                  Email Address
                </label>
                <input
                  className="appearance-none border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
                  id="email"
                  type="email"
                  name="userEmail"
                  value={formData.userEmail}
                  onChange={handleChange}
                  placeholder="Email"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="appearance-none border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
                  id="password"
                  type="password"
                  name="userPassword"
                  value={formData.userPassword}
                  onChange={handleChange}
                  placeholder="Password"
                />
              </div>
              <div className="flex items-center justify-between gap-8 mt-8">
                <button
                  className="bg-violet-700  text-white font-bold py-2 px-4 w-full rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Sign Up
                </button>
  
              </div>
              <div className='mb-4 mt-4'>
               Already have a account ?
                <Link to={"/login"}>
                <a
                  className="inline-block align-baseline font-bold text-sm text-redprimary ml-2"
                  href="#"
                >
                  Login In
                </a>
                </Link>
              </div>
            </form>
          </div>
        </div>
  <ToastContainer/>
      </div>
    )
}

export default Signup