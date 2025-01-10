import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.png';
import { FaCartShopping } from 'react-icons/fa6';
import DarkMode from './DarkMode';

const Navbar = ({ cartCount }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in
    const loggedInUser = localStorage.getItem('loggedInUser');
    setIsLoggedIn(loggedInUser ? true : false); // Update the state based on login status
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');  // Remove user data from localStorage
    setIsLoggedIn(false);  // Update login state
    window.location.reload();  // Refresh the page to reflect changes
  };

  return (
    <div className="shadow-md bg-white dark:bg-pink-300 dark:text-white duration-200 relative z-40">
      <div className="bg-primary/40 py-2">
        <div className="container flex justify-between items-center">
          <div>
            <a href="#" className="font-bold items-center text-pink-800 text-xl sm:text-1xl flex gap-2">
              <img src={Logo} alt="logo" className="w-14" />
              <Link to="/">Keeva's</Link>
            </a>
          </div>

          <div className="flex justify-between items-center gap-4">
            {/* Cart Icon Link */}
            <Link to="/cart" className="relative text-white">
              <FaCartShopping className="text-2xl drop-shadow-sm cursor-pointer text-pink-800 hover:text-pink-500" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 text-xs bg-red-600 text-white rounded-full px-2 py-1">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Darkmode Switch */}
            <DarkMode />

            {/* Login/Register Links */}
            <div className="flex gap-4">
              <Link to="/" className="text-sm font-semibold text-pink-800 hover:underline">
                Home
              </Link>
              <Link to="/products" className="text-sm font-semibold text-pink-800 hover:underline">
                Products
              </Link>
              {!isLoggedIn ? (
                <>
                  <Link to="/login" className="text-sm font-semibold text-pink-800 hover:underline">
                    Login
                  </Link>
                  <Link to="/register" className="text-sm font-semibold text-pink-800 hover:underline">
                    Register
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/profile" className="text-sm font-semibold text-pink-800 hover:underline">
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-sm font-semibold text-pink-800 hover:underline"
                  >
                    Logout
                  </button>
                  <Link to="/control-panel" className="text-sm font-semibold text-pink-800 hover:underline">
                    Control Panel
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
