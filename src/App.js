import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';

// Import components
import HomePage from './components/HomePage';
import BookingPage from './components/BookingPage';
import DriverPage from './components/DriverPage';
import LoginPage from './components/LoginPage';
import ChooseRolePage from './components/ChooseRolePage';
import CustomerDashboard from './components/CustomerDashboard';
import CompanyWorkerDashboard from './components/CompanyWorkerDashboard';
import NavBar from './components/NavBar';

function App() {
  return (
    <Router>
      <MainApp />
    </Router>
  );
}

// This component helps to hide NavBar on the login page
function MainApp() {
  const location = useLocation();
  const hideNavBarOnPages = ['/login']; // List pages where NavBar shouldn't appear

  return (
    <div className="App">
      {!hideNavBarOnPages.includes(location.pathname) && <NavBar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/driver" element={<DriverPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/choose-role" element={<ChooseRolePage />} />
        <Route path="/customer-dashboard" element={<CustomerDashboard />} />
        <Route path="/company-worker-dashboard" element={<CompanyWorkerDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
