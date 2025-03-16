import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // For animations

function CustomerDashboard() {
  return (
    <div className="min-h-screen bg-black p-6 flex flex-col items-center">
      {/* Header */}
      <motion.h2
        className="text-5xl font-bold text-center text-white mb-12"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Welcome to Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Dashboard</span>
      </motion.h2>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <DashboardCard
          title="Upcoming Rides"
          description="Check your scheduled rides."
          link="/upcoming-rides"
          gradient="from-blue-500 to-purple-500"
        />
        <DashboardCard
          title="Ride History"
          description="View your past trips."
          link="/ride-history"
          gradient="from-green-500 to-cyan-500"
        />
        <DashboardCard
          title="Your Profile"
          description="Manage your account details."
          link="/profile"
          gradient="from-purple-500 to-pink-500"
        />
      </div>

      {/* Quick Actions */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <QuickAction
          title="Book a Ride"
          link="/book-ride"
          gradient="from-blue-500 to-purple-500"
        />
        <QuickAction
          title="Available Cars"
          link="/available-cars"
          gradient="from-green-500 to-cyan-500"
        />
        <QuickAction
          title="Orders"
          link="/orders"
          gradient="from-purple-500 to-pink-500"
        />
        <QuickAction
          title="Support"
          link="/support"
          gradient="from-red-500 to-orange-500"
        />
      </div>
    </div>
  );
}

// 📌 Reusable Dashboard Card Component
const DashboardCard = ({ title, description, link, gradient }) => {
  return (
    <motion.div
      className="bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex flex-col justify-between transition duration-300 hover:shadow-lg hover:border-white/20"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div>
        <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
      <Link
        to={link}
        className={`mt-4 px-5 py-2 text-white rounded-lg bg-gradient-to-r ${gradient} transition text-center block`}
      >
        View More
      </Link>
    </motion.div>
  );
};

// 📌 Reusable Quick Action Component
const QuickAction = ({ title, link, gradient }) => {
  return (
    <motion.div
      className="bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex items-center justify-center transition duration-300 hover:shadow-lg hover:border-white/20"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link
        to={link}
        className={`px-5 py-3 text-white rounded-lg bg-gradient-to-r ${gradient} transition w-full text-center`}
      >
        {title}
      </Link>
    </motion.div>
  );
};

export default CustomerDashboard;