import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaUserPlus } from 'react-icons/fa'; // Import icons
import './HomePage.css'; // Ensure the styles are included here

function HomePage() {
  return (
    <div className="home-container bg-gradient-to-br from-blue-900 to-gray-900 min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden relative">
      {/* Background Vibe */}
      <div className="absolute inset-0 z-0">
        <div className="animate-pulse-slow bg-gradient-to-r from-blue-800 to-purple-800 w-64 h-64 rounded-full opacity-20 absolute top-1/4 left-1/4"></div>
        <div className="animate-pulse-slower bg-gradient-to-r from-purple-800 to-pink-800 w-72 h-72 rounded-full opacity-20 absolute bottom-1/4 right-1/4"></div>
        <div className="animate-pulse-slow bg-gradient-to-r from-pink-800 to-blue-800 w-56 h-56 rounded-full opacity-20 absolute top-1/3 right-1/4"></div>
        <div className="animate-pulse-slower bg-gradient-to-r from-green-800 to-yellow-800 w-64 h-64 rounded-full opacity-20 absolute bottom-1/3 left-1/4"></div>
      </div>

      {/* Content */}
      <div className="home-header text-center relative z-10 max-w-2xl w-full">
        <h1 className="text-6xl font-bold text-white mb-6 animate-fade-in">
          Welcome to <span className="text-green-400">Mega City Cab</span>
        </h1>
        <p className="text-xl text-gray-300 mb-8 animate-fade-in-delay">
          Your trusted transportation service in Colombo, anywhere, anytime.
        </p>
        <div className="cta-buttons flex gap-6 justify-center animate-fade-in-delay-2">
          <Link to="/login" className="w-48">
            <button className="login-button bg-green-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-green-700 transition duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl w-full flex items-center justify-center gap-2">
              <FaUser className="text-xl" /> Login
            </button>
          </Link>
          <Link to="/signup" className="w-48">
            <button className="signup-button bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl w-full flex items-center justify-center gap-2">
              <FaUserPlus className="text-xl" /> Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;