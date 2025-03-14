import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCarById } from '../services/api';
import axios from 'axios';
import './BookingPage.css';

const api = axios.create({
  baseURL: 'http://localhost:8089',
  headers: {
    'Content-Type': 'application/json',
  },
});

const BookingPage = () => {
  const { carId } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phoneNumber: '',
    email: '',
    time: '',
    date: '',
    destination: 'Pettah',
  });
  const [vehicleName, setVehicleName] = useState('');
  const [carHirePrice, setCarHirePrice] = useState(100);
  const driverCharge = 500;
  const [totalPrice, setTotalPrice] = useState(carHirePrice + driverCharge);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const destinations = ['Pettah', 'Nugegoda', 'Kollupitiya', 'Bambalapitiya', 'Maradana'];
  const priceMap = {
    Pettah: 100,
    Nugegoda: 200,
    Kollupitiya: 200,
    Bambalapitiya: 200,
    Maradana: 200,
  };

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const carDetails = await getCarById(carId);
        setVehicleName(`${carDetails.make} ${carDetails.model}`);
      } catch (error) {
        console.error('Failed to fetch car details:', error);
      }
    };
    fetchCarDetails();
  }, [carId]);

  useEffect(() => {
    setTotalPrice(carHirePrice + driverCharge);
  }, [carHirePrice]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'destination') {
      setCarHirePrice(priceMap[value] || 100);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    const customerData = { ...formData, vehicleName, carId, price: totalPrice };

    try {
      await api.post('/api/bookings/save', customerData);
      setShowSuccessPopup(true);
      setFormData({ name: '', address: '', phoneNumber: '', email: '', time: '', date: '', destination: 'Pettah' });
      setCarHirePrice(100);
      setTotalPrice(600);
      setTimeout(() => setShowSuccessPopup(false), 3000);
    } catch (error) {
      console.error('Error saving booking:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="booking-container">
      <h2>Customer Details</h2>
      <p>Please fill in your details to complete the rental process.</p>
      <form onSubmit={handleSubmit} className="booking-form">
        {['name', 'address', 'phoneNumber', 'email'].map((field) => (
          <div className="form-group" key={field}>
            <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
            <input type={field === 'email' ? 'email' : 'text'} id={field} name={field} value={formData[field]} onChange={handleChange} required className="form-control" disabled={isSubmitting} />
          </div>
        ))}
        <div className="form-group">
          <label htmlFor="vehicleName">Vehicle Name:</label>
          <input type="text" id="vehicleName" value={vehicleName} disabled className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="destination">Destination:</label>
          <select id="destination" name="destination" value={formData.destination} onChange={handleChange} required className="form-control" disabled={isSubmitting}>
            {destinations.map((dest) => (
              <option key={dest} value={dest}>{dest}</option>
            ))}
          </select>
        </div>
        {['carHirePrice', 'driverCharge', 'totalPrice'].map((field, index) => (
          <div className="form-group" key={field}>
            <label htmlFor={field}>{field.replace(/([A-Z])/g, ' $1').trim()} (LKR):</label>
            <input type="text" id={field} value={`LKR ${index === 0 ? carHirePrice : index === 1 ? driverCharge : totalPrice}`} disabled className="form-control" />
          </div>
        ))}
        {['date', 'time'].map((field) => (
          <div className="form-group" key={field}>
            <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
            <input type={field} id={field} name={field} value={formData[field]} onChange={handleChange} required className="form-control" disabled={isSubmitting} />
          </div>
        ))}
        <button type="submit" className="submit-btn" disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Submit'}</button>
      </form>
      {showSuccessPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Order is Successful!</h3>
            <p>Your booking has been successfully submitted.</p>
            <button onClick={() => setShowSuccessPopup(false)}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingPage;
