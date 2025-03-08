import React, { useState } from "react";
import { auth, googleProvider } from "../firebase/firebaseConfig";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const LoginPage = () => {
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password
  const [loading, setLoading] = useState(false); // State for loading
  const [error, setError] = useState(""); // State for error message
  const navigate = useNavigate(); // Initialize navigate for page redirection

  // Hardcoded credentials
  const hardcodedUsername = "sachin";
  const hardcodedPassword = "qaz@123";

  // Handle email login
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Check if email and password match hardcoded credentials
    if (email === hardcodedUsername && password === hardcodedPassword) {
      setLoading(false);
      navigate("/choose-role");
    } else {
      setLoading(false);
      setError('Invalid email or password');
    }
  };

  // Handle Google login
  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/choose-role");
    } catch (err) {
      setError('Google login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-900 to-blue-800">
      <div className="flex flex-col md:flex-row items-center gap-10 p-10">
        <div className="text-white max-w-md">
          <h1 className="text-5xl font-bold mb-4">Mega City <br /> <span className="text-blue-300">Cab Service</span></h1>
          <p className="text-gray-300">
            Mega City Cab Service is Sri Lanka's No. 1 cab service and online booking platform. We offer reliable and affordable transportation solutions to meet all your travel needs. Book your ride with us today and experience the best in class service.
          </p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
          <form className="space-y-6" onSubmit={handleEmailLogin}>
            <input 
              type="email" 
              placeholder="Email address" 
              className="w-full p-3 border rounded-md" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
            <input 
              type="password" 
              placeholder="Password" 
              className="w-full p-3 border rounded-md" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button 
              type="submit" 
              className="w-full py-3 bg-blue-500 text-white rounded-md font-semibold hover:bg-blue-600" 
              disabled={loading}
            >
              {loading ? 'Loading...' : 'SIGN IN'}
            </button>
          </form>
          <p className="text-center text-gray-500 my-4">or sign in with:</p>
          <div className="flex justify-center gap-4 text-blue-500">
            <button 
              onClick={handleGoogleLogin} 
              className="text-blue-500 hover:text-blue-600 font-semibold"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Sign in with Google'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
