import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';

// Import your page components
import HomePage from './components/HomePage';
import BookingPage from './components/BookingPage';
import DriverPage from './components/DriverPage';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/booking">Booking</Link>
              </li>
              <li>
                <Link to="/driver">Driver Management</Link>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/driver" element={<DriverPage />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
