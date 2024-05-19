import React, { useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
// import Logo from "../../../assets/logo.png"
import { ToastContainer, toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [formData, setFormData] = useState({
    userEmail: '',
    userPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/login', formData);
      const { user, auth } = response.data;
      // Save token and user data in local storage
      localStorage.setItem('token', auth);
      localStorage.setItem('user', JSON.stringify(user));

      // Redirect to home page or do something else
      window.location.href = "/";
      toast.success('Login successful!');
    } catch (error) {
      console.error('Login Error:', error);
      // Handle error (display error message, etc.)
      toast.error('Invalid email or password. Please try again.');
    }
  };

  return (
    <div>
     

      <div className="bg-black min-h-screen flex items-center justify-center">
        {/* Background Image */}

        {/* Login Form */}
        <div className="relative z-10 bg-white h-[500px] w-[350px] p-8 rounded-md shadow-lg">
          {/* <img src={Logo} alt="logo" /> */}
          <h1 className="text-xl font-bold mb-4 text-center">Welcome</h1>
          <form onSubmit={handleSubmit}>
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
            <div className='mb-4'>
           <Link to="/forgetpassword">   <a
                className="inline-block align-baseline font-bold text-sm text-cyan-500 hover:text-cyan-800"
                href="#"
              >
                Forgot Password?
              </a>
              </Link>
            </div>
            <div className="flex items-center justify-between gap-8">
              <button
                className="bg-violet-700  text-white font-bold py-2 px-4 w-full rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Login
              </button>

            </div>
            <div className='mb-4 mt-4'>
              Don't have a account ?
              <Link to={"/signup"}>
              <a
                className="inline-block align-baseline font-bold text-sm text-redprimary ml-2"
                href="#"
              >
                Sign Up
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

export default Login