import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaUserCog } from 'react-icons/fa'; // Updated icons
import { motion } from 'framer-motion'; // For animations

function ChooseRolePage() {
  const navigate = useNavigate();

  const handleRoleSelection = (role) => {
    if (role === 'customer') {
      navigate('/customer-dashboard');
    } else if (role === 'company-worker') {
      navigate('/company-worker-dashboard');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 p-6">
      {/* Heading */}
      <motion.h2
        className="text-5xl font-bold text-yellow-200 mb-12 text-center drop-shadow-lg"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Welcome to <span className="text-yellow-400">Mega City Cab</span>
      </motion.h2>

      {/* Role Selection Cards */}
      <div className="flex flex-wrap justify-center gap-8">
        {/* Customer Card */}
        <motion.div
          className="flex flex-col items-center bg-white/10 backdrop-blur-md p-8 rounded-3xl shadow-2xl cursor-pointer hover:shadow-xl transition-all duration-300 w-80 border border-white/20"
          onClick={() => handleRoleSelection('customer')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="p-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-6">
            <FaUser className="text-6xl text-gray-200" />
          </div>
          <h3 className="text-3xl font-bold text-gray-200 mb-4">Customer</h3>
          <p className="text-gray-300 text-center mb-6">
            Book rides, track your trips, and enjoy seamless transportation.
          </p>
          <button
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-gray-200 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
          >
            Continue as Customer
          </button>
        </motion.div>

        {/* Company Worker Card */}
        <motion.div
          className="flex flex-col items-center bg-white/10 backdrop-blur-md p-8 rounded-3xl shadow-2xl cursor-pointer hover:shadow-xl transition-all duration-300 w-80 border border-white/20"
          onClick={() => handleRoleSelection('company-worker')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="p-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mb-6">
            <FaUserCog className="text-6xl text-gray-200" />
          </div>
          <h3 className="text-3xl font-bold text-gray-200 mb-4">Company Worker</h3>
          <p className="text-gray-300 text-center mb-6">
            Manage rides, assist customers, and optimize operations.
          </p>
          <button
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-gray-200 rounded-xl font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-300"
          >
            Continue as Worker
          </button>
        </motion.div>
      </div>
    </div>
  );
}

export default ChooseRolePage;