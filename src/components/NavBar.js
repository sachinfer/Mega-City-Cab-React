import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; // Ensure you create this file for styling

function NavBar() {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/make-order">Make Order</Link></li>
        <li><Link to="/available-cars">Available Cars</Link></li>
        <li><Link to="/about-us">About Us</Link></li>
      </ul>
    </nav>
  );
}

export default NavBar;
