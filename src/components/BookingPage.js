import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCarById } from '../services/api';
import axios from 'axios';
import './BookingPage.css';

const api = axios.create({
  baseURL: 'http://localhost:8089', // Backend API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});
const BookingPage = () => {
  const { carId } = useParams();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [vehicleName, setVehicleName] = useState('');
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const carDetails = await getCarById(carId);
        setVehicleName(`${carDetails.make} ${carDetails.model}`);
      } catch (error) {
        console.error('Failed to fetch car details:', error);
        setMessage('Error fetching vehicle details. Please try again later.');
      }
    };

    fetchCarDetails();
  }, [carId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    const customerData = { name, address, phone, email, vehicleName, time, date, carId };

    console.log("Booking data 22 : ", customerData);
    

    console.log("Booking data 234 : ", event)
    // export const saveBooking = async (bookingData) => {
    
      // console.log("Booking data : ", bookingData)
      try {
        const response = await api.post('/api/bookings/save', customerData);
        return response.data;
      } catch (error) {
        console.error('Error saving booking:', error);
        throw error;
      }
    // };

    // try {
    //   const response = await axios.post('/api/bookings/save', customerData);
    //   setMessage('Booking saved successfully!');
    //   console.log('Saved booking:', response.data);

    //   // Clear form fields
    //   setName('');
    //   setAddress('');
    //   setPhone('');
    //   setEmail('');
    //   setTime('');
    //   setDate('');
    // } catch (error) {
    //   console.error('Error saving booking:', error);
    //   setMessage('Failed to save booking. Please try again.');
    // } finally {
    //   setIsSubmitting(false);
    // }
  };

  return (
    <div className="booking-container">
      <h2>Customer Details</h2>
      <p>Please fill in your details to complete the rental process.</p>

      {message && <p className="message">{message}</p>}

      <form onSubmit={handleSubmit} className="booking-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="form-control"
            disabled={isSubmitting}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="form-control"
            disabled={isSubmitting}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number:</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="form-control"
            disabled={isSubmitting}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-control"
            disabled={isSubmitting}
          />
        </div>
        <div className="form-group">
          <label htmlFor="vehicle-name">Vehicle Name:</label>
          <input
            type="text"
            id="vehicle-name"
            value={vehicleName}
            disabled
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="form-control"
            disabled={isSubmitting}
          />
        </div>
        <div className="form-group">
          <label htmlFor="time">Time:</label>
          <input
            type="time"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
            className="form-control"
            disabled={isSubmitting}
          />
        </div>
        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default BookingPage;
