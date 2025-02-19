import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // To get the carId from the URL
import { getCarById, saveBooking } from '../services/api'; // Import API functions

const BookingPage = () => {
  const { carId } = useParams(); // Get carId from the route parameter
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [vehicleName, setVehicleName] = useState('');
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch vehicle details using carId
    const fetchCarDetails = async () => {
      try {
        const carDetails = await getCarById(carId); // API call to get car details
        setVehicleName(carDetails.make + ' ' + carDetails.model); // Example: 'Toyota Corolla'
      } catch (error) {
        console.error('Failed to fetch car details:', error);
      }
    };

    fetchCarDetails();
  }, [carId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Prepare the booking data
    const bookingData = { name, address, phone, email, vehicleName, time, date, carId };

    try {
      const response = await saveBooking(bookingData); // API call to save booking
      if (response.ok) {
        setMessage('Booking successful!');
        setName('');
        setAddress('');
        setPhone('');
        setEmail('');
        setTime('');
        setDate('');
      } else {
        setMessage('Failed to save booking.');
      }
    } catch (error) {
      console.error('Error saving booking:', error);
      setMessage('Error saving booking. Please try again.');
    }
  };

  return (
    <div className="booking-container">
      <h2>Customer Details</h2>
      <p>Please fill in your details to complete the rental process.</p>
      {message && <p style={{ color: 'red' }}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input 
            type="text" 
            id="name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <input 
            type="text" 
            id="address" 
            value={address} 
            onChange={(e) => setAddress(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label htmlFor="phone">Phone Number:</label>
          <input 
            type="tel" 
            id="phone" 
            value={phone} 
            onChange={(e) => setPhone(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label htmlFor="vehicle-name">Vehicle Name:</label>
          <input 
            type="text" 
            id="vehicle-name" 
            value={vehicleName} 
            disabled 
          />
        </div>
        <div>
          <label htmlFor="date">Date:</label>
          <input 
            type="date" 
            id="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label htmlFor="time">Time:</label>
          <input 
            type="time" 
            id="time" 
            value={time} 
            onChange={(e) => setTime(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default BookingPage;
