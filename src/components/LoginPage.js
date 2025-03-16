import React, { useState } from "react";
import { auth, googleProvider } from "../firebase/firebaseConfig";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaGoogle, FaEnvelope, FaLock } from "react-icons/fa"; // Import icons

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const hardcodedUsername = "sachin";
  const hardcodedPassword = "qaz@123";

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (email === hardcodedUsername && password === hardcodedPassword) {
      setLoading(false);
      navigate("/choose-role");
    } else {
      setLoading(false);
      setError("Invalid email or password");
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/choose-role");
    } catch (err) {
      setError("Google login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-900 to-blue-800">
      <motion.div 
        className="flex flex-col md:flex-row items-center gap-10 p-10 w-full max-w-6xl bg-white shadow-2xl rounded-xl overflow-hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Left Side: Branding and Description */}
        <div className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-700 p-10 text-white rounded-xl">
          <h1 className="text-5xl font-bold mb-4">Mega City <br /> <span className="text-yellow-400">Cab Service</span></h1>
          <p className="text-gray-200 leading-relaxed">
            Mega City Cab Service – Sri Lanka’s #1 cab and online booking platform. Reliable, affordable rides for all your travel needs. Book now for top-tier service!
          </p>
        </div>

        {/* Right Side: Login Form */}
        <motion.div 
          className="flex-1 p-8 bg-white rounded-xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Welcome Back!</h2>
          <form className="space-y-6" onSubmit={handleEmailLogin}>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="email" 
                placeholder="Email address" 
                className="w-full pl-10 p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="password" 
                placeholder="Password" 
                className="w-full pl-10 p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <motion.button 
              type="submit" 
              className="w-full py-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 shadow-md transition duration-300 flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={loading}
            >
              <FaEnvelope className="text-lg" />
              {loading ? 'Loading...' : 'SIGN IN'}
            </motion.button>
          </form>
          <p className="text-center text-gray-500 my-6">or sign in with:</p>
          <motion.button 
            onClick={handleGoogleLogin} 
            className="w-full py-3 bg-red-600 text-white rounded-md font-semibold hover:bg-red-700 shadow-md transition duration-300 flex items-center justify-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
          >
            <FaGoogle className="text-lg" />
            {loading ? 'Loading...' : 'Sign in with Google'}
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;