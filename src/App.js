import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { AuthProvider, useAuth } from "./context/AuthContext";  // Import authentication context
import './App.css';

// Import components
import HomePage from './components/HomePage';
import BookingPage from './components/BookingPage';
import DriverPage from './components/DriverPage';
import LoginPage from './components/LoginPage';
import ChooseRolePage from './components/ChooseRolePage';
import CustomerDashboard from './components/CustomerDashboard';
import CarManagement from './components/CarManagement';
import NavBar from './components/NavBar';

// Import pages
import Orders from './pages/Orders';
import AvailableCars from './pages/AvailableCars';
import AboutUs from './pages/AboutUs';
import NotFoundPage from './pages/NotFoundPage';  // 404 page

function App() {
  return (
    <AuthProvider>
      <Router>
        <MainApp />
      </Router>
    </AuthProvider>
  );
}

// Component to handle hiding NavBar on specific pages
function MainApp() {
  const location = useLocation();
  const hideNavBarOnPages = ['/login', '/choose-role']; // Hide NavBar on these pages

  return (
    <div className="App">
      {/* Conditionally render the NavBar */}
      {!hideNavBarOnPages.includes(location.pathname) && <NavBar />}
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/booking/:carId" element={<BookingPage />} /> {/* Dynamic route for booking */}
        <Route path="/driver" element={<DriverPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/choose-role" element={<ChooseRolePage />} />
        
        {/* Protected Routes */}
        <Route path="/customer-dashboard" element={<ProtectedRoute><CustomerDashboard /></ProtectedRoute>} />
        <Route path="/company-worker-dashboard" element={<ProtectedRoute><CarManagement /></ProtectedRoute>} />

        {/* Orders and Available Cars */}
        <Route path="/orders" element={<Orders />} />
        <Route path="/available-cars" element={<AvailableCars />} />
        <Route path="/about-us" element={<AboutUs />} />
        
        {/* Dynamic Route for Customer Dashboard */}
        <Route path="/customer-dashboard/:username" element={<ProtectedRoute><CustomerDashboard /></ProtectedRoute>} />

        {/* Catch-all Route for 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

// 🔒 Protected Route Wrapper (Redirects if user is not logged in)
function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" replace />;
}

export default App;
