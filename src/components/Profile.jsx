import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');

    if (!loggedInUser) {
      // If no user is logged in, redirect to the login page
      navigate('/login');
    } else {
      // Set the logged-in user data
      setUser(loggedInUser);
    }
  }, [navigate]);

  if (!user) {
    return null; // Don't render anything until the user is set
  }

  const handleLogout = () => {
    // Remove user from localStorage to log them out
    localStorage.removeItem('loggedInUser');
    
    // Refresh the page and redirect to Home page
    window.location.reload(); // Refresh the page
    navigate('/'); // Navigate to Home page after reload
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Profile</h2>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Name</label>
          <input
            type="text"
            value={user}
            readOnly
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Email</label>
          <input
            type="email"
            value={`${user}@example.com`}  // You can use a default email or user email here
            readOnly
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div className="mb-4">
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
