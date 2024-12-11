import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import logo from "../assets/logo.png"; // Correct path to import the image

const Navbar = ({ toggleSidebar, isLoggedIn, handleLogin, handleLogout }) => {
  const navigate = useNavigate(); // Initialize navigate function

  const handleLoginButtonClick = () => {
    if (!isLoggedIn) {
      // Navigate to login page if the user is not logged in
      navigate("/login");
    } else {
      // Log the user out
      handleLogout(); // Call the passed function to log out
      // Optionally, redirect to the home page or login page after logout
      navigate("/"); // Redirect to homepage after logout
    }
  };

  return (
    <nav className="w-full bg-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* Hamburger menu button on the left */}
      <button
        onClick={toggleSidebar}
        className="text-2xl text-green-600 focus:outline-none"
      >
        ☰
      </button>

      {/* Logo and Text Container (centered) */}
      <div className="flex items-center space-x-4 ml-4">
        {/* Logo */}
        <img
          src={logo}// Replace with your logo's path or URL
          alt="RentEase Logo"
          className="h-8 w-auto"
        />
        {/* Welcome Text */}
        <h1 className="text-lg font-bold">RentEase</h1>
      </div>

      <div className="flex items-center space-x-4">
        <span className="text-gray-600">👤 {isLoggedIn ? "Username" : "Guest"}</span>

        {/* Only show the shopping cart if logged in */}
        {isLoggedIn && (
          <div className="relative">
            <button className="text-2xl text-gray-600">
              <FaShoppingCart />
            </button>
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              3 {/* Number of items in the cart */}
            </span>
          </div>
        )}

        {/* Change the button text based on login state */}
        <button
          onClick={handleLoginButtonClick} // Use this function when the button is clicked
          className={`${
            isLoggedIn ? "bg-red-500" : "bg-green-500"
          } text-white px-4 py-2 rounded`}
        >
          {isLoggedIn ? "ออกจากระบบ" : "เข้าสู่ระบบ"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
