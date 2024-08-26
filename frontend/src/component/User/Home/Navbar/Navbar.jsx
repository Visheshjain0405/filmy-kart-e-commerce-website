import React, { useState, useEffect } from "react";
import { IoMdSearch } from "react-icons/io";
import { FaCaretDown, FaCartShopping } from "react-icons/fa6";
import { MdAccountCircle } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useCart } from "react-use-cart";
import "./Navbar.css";
import { useGoogleLogin } from '@react-oauth/google';
import DarkMode from "./DarkMode";
const MenuLinks = [
  {
    id: 1,
    name: "Home",
    link: "/",
  },
  {
    id: 2,
    name: "Shop",
    link: "/shop",
  },
  {
    id: 3,
    name: "Movie Merchandise",
    link: "/movieproduct",
  },
 
];

const DropdownLinks = [
  {
    id: 1,
    name: "Trending Products",
    link: "trendingproduct",
  },
  {
    id: 2,
    name: "Best Selling",
    link: "bestselling",
  },
  {
    id: 3,
    name: "Top Rated",
    link: "toprated",
  },
];

const Navbar = ({ handleOrderPopup, setSearchedProduct }) => {
  const { items } = useCart();
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const [userData, setUserData] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Check if user is logged in when the component mounts
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user')
    // Set loggedIn state to false
    setLoggedIn(false);
    window.location.reload();
    // Redirect to login page if needed
    // window.location.href = '/login';
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/products/search?search=${searchQuery}`);
      setSearchedProduct(response.data);
    } catch (error) {
      console.error('Error searching for product:', error);
    }
  };

  const login = useGoogleLogin({
    onSuccess: async(response)=>{
      try {
        const res=await axios.get("https://www.googleapis.com/oauth2/v3/userinfo",{
          headers:{
            Authorization:`Bearer ${response.access_token}`
          }
        })

        const userData = {
          useremailid: res.data.email,
          userfullname: res.data.name,
          userpassword:res.data.name
        };

        await axios.post('http://localhost:5000/api/save-user', userData);

        console.log(res)
      } catch (error) {
        console.log(error)
        
      }
    },
  });

  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 relative z-40">
      <div className="py-4">
        <div className="container flex justify-between items-center">
          {/* Logo and Links section */}
          <div className="flex items-center gap-4">
            <Link to={"/"}>
              <a
                href="#"
                className="text-redprimary font-semibold tracking-widest text-2xl uppercase sm:text-3xl"
              >
                FILMY KART
              </a>
            </Link>
            {/* Menu Items */}
            <div className="hidden lg:block">
              <ul className="flex items-center gap-4">
                {MenuLinks.map((data, index) => (
                  <li key={index}>
                    <Link
                      to={data.link}
                      className="inline-block px-4 font-semibold text-gray-500 hover:text-black dark:hover:text-white duration-200"
                    >
                      {data.name}
                    </Link>
                  </li>
                ))}
                {/* Dropdown  */}
                <li className="relative cursor-pointer group">
                  <a
                    href="#"
                    className="flex items-center gap-[2px] font-semibold text-gray-500 dark:hover:text-white py-2"
                  >
                    Best product 
                    <span>
                      <FaCaretDown className="group-hover:rotate-180 duration-300" />
                    </span>
                  </a>

                  {/* Dropdown Links */}
                  <div className="absolute z-[9999] hidden group-hover:block w-[200px] rounded-md bg-white shadow-md dark:bg-gray-900 p-2 dark:text-white ">
                    <ul className="space-y-2">
                      {DropdownLinks.map((data, index) => (
                        <li key={index}>
                          <Link
                            className="text-gray-500  dark:hover:text-white duration-200 inline-block w-full p-2 hover:bg-redredprimary/20 rounded-md font-semibold"
                            to={`/productbytype/${data.link}`}
                          >
                            {data.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Navbar Right section */}
          <div className="flex justify-between items-center gap-4">
            {/* Search Bar section */}
            <div className="relative group sm:block">
              <input
                type="text"
                placeholder="Search"
                className="search-bar"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Link to={`/search/${searchQuery}`} onClick={handleSearch}>
                <IoMdSearch className="text-xl text-gray-600 group-hover:text-redprimary dark:text-gray-400 absolute top-1/2 -translate-y-1/2 right-3 duration-200" />
              </Link>
            </div>
            <div className="dark:bg-gray-900 p-2 dark:text-white">
              {loggedIn ? (
                <div className="dropdown">
                  <button className="dropbtn dark:text-white">
                    <MdAccountCircle />
                  </button>
                  <div className="dropdown-content">
                    <Link to="/contactus">Contact Us</Link>
                    <Link to="/orderdetails">order details</Link>
                    <Link to="/supercoin">Super Coins</Link>
                    <a href="#">
                      {/* <button onClick={() => logout({ returnTo: window.location.origin })}>Log Out</button> */}
                       <button onClick={handleLogout}>Logout</button>
                    </a>
                  </div>
                </div>
              ) : (
                // <button onClick={() => loginWithRedirect()}>Log In</button>
                // <button onClick={handleGoogleAuth}>GOGGLE LOGIN</button>
                <Link to="/login"> <button>Login</button></Link>
              )}
             {/* <button onClick={() => login()}>Sign in with Google 🚀</button> */}
           {/* <Link to="/login">  <button>Login In</button></Link>
           {loggedIn ? (
        <button onClick={handleLogout}>Logout</button>
      ):(
        <Link to="/login"> <button>Login</button></Link>
      )} */}
            </div>
            {/* Order-button section */}
            <Link to="/addtocart">
              <button className="relative p-3" onClick={handleOrderPopup}>
                <FaCartShopping className="text-xl text-gray-600 dark:text-gray-400" />
                <div className="w-4 h-4 bg-red-500 text-white rounded-full absolute top-0 right-0 flex items-center justify-center text-xs">
                  {totalItems}
                </div>
              </button>
            </Link>
            {/* Dark Mode section */}
            <div>
              <DarkMode />
            </div>
            {/* Mobile Menu */}
            <button
              className="block lg:hidden focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6 text-gray-600 dark:text-gray-400"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu Overlay */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } absolute top-0 left-0 w-full h-[100vh] bg-redprimary dark:bg-gray-800 z-30`}
      >
        <div className="container p-4">
          <i className="fa-solid fa-xmark float-right" style={{color:"ffffff"}} onClick={()=>setIsMenuOpen(false)}></i>
          <ul className="space-y-4 text-center">
            
            {MenuLinks.map((data, index) => (
              <li key={index}>
                <Link
                  to={data.link}
                  className="inline-block px-4 p-5 font-semibold text-white hover:text-black dark:hover:text-white duration-200"
                  onClick={() => setIsMenuOpen(false)}
               >
                  {data.name}
                </Link>
              </li>
            ))}
              <div className="relative group sm:block">
              <input
                type="text"
                placeholder="Search"
                className="search-bar"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Link to={`/search/${searchQuery}`} onClick={handleSearch}>
                <IoMdSearch className="text-xl text-gray-600 group-hover:text-black dark:text-gray-400 absolute top-1/2 -translate-y-1/2 right-3 duration-200" />
              </Link>
            </div>
          </ul>
        </div>
      </div>
      {/* <DarkMode/> */}
    </div>
  );
};

export default Navbar;