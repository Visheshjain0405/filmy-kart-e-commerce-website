import React, { useState,useEffect } from 'react'
import { Link } from "react-router-dom"
import "./Sidebar.css"
// import "./SidebarScript"
function Sidebar() {

  useEffect(() => {
    const navBar = document.querySelector("nav");
    const menuBtns = document.querySelectorAll(".menu-icon");
    const overlay = document.querySelector(".overlay");

    const handleMenuClick = () => {
      navBar.classList.toggle("open");
    };

    const handleOverlayClick = () => {
      navBar.classList.remove("open");
    };

    menuBtns.forEach((menuBtn) => {
      menuBtn.addEventListener("click", handleMenuClick);
    });

    overlay.addEventListener("click", handleOverlayClick);

    // Cleanup event listeners on component unmount
    return () => {
      menuBtns.forEach((menuBtn) => {
        menuBtn.removeEventListener("click", handleMenuClick);
      });

      overlay.removeEventListener("click", handleOverlayClick);
    };
  }, []); // Empty dependency array to ensure useEffect runs only once


  
    return (
        <div>
 
 <>
  <nav>
    <div className="logo">
      <div>
      <i className="bx bx-menu menu-icon mt-5 bg-transparent" />
      </div>
      {/* <span className="logo-name">Filmy Kart</span> */}
    </div>
    <div className="sidebar border-gray-300 border-r-2">
      <div className="logo">
        <i className="bx bx-menu menu-icon" />
        <span className="logo-name">Filmy Kart</span>
      </div>
      <div className="sidebar-content">
        <ul className="lists">
          <li className="list">
            <Link to="/admin/dashboard" className="nav-link"> 
              <i className="bx bx-home-alt icon" />
              <span className="link no-underline">Dashboard</span>
            </Link>
          </li>
          <li className="list">
            <Link to="/admin/order" className="nav-link">
              <i className="bx bx-bar-chart-alt-2 icon" />
              <span className="link no-underline">Orders</span>
            </Link>
          </li>
          <li className="list">
            <Link to="/admin/category" className="nav-link">
              <i className="bx bx-bell icon" />
              <span className="link no-underline">Category</span>
            </Link>
          </li>
          <li className="list">
            <Link to="/admin/product" className="nav-link">
              <i className="bx bx-message-rounded icon" />
              <span className="link no-underline">Products</span>
            </Link>
          </li>
          <li className="list">
            <Link to="/admin/coupon" className="nav-link">
              <i className="bx bx-pie-chart-alt-2 icon" />
              <span className="link no-underline">Coupon</span>
            </Link>
          </li>
          <li className="list">
          <Link to="/admin/review" className="nav-link">
           
              <i className="bx bx-heart icon" />
              <span className="link no-underline">Reviews</span>
           
            </Link>
          </li>
        </ul>
        <div className="bottom-cotent">
         
          <li className="list">
            <Link to="/admin" className="nav-link">
              <i className="bx bx-log-out icon" />
              <span className="link no-underline">Logout</span>
            </Link>
          </li>
        </div>
      </div>
    </div>
  </nav>
  <section className="overlay" />
</>

 
 
        </div>
    )
}

export default Sidebar