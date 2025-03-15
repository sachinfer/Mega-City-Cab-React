import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCarById, saveBooking } from '../services/api';
import { messaging } from './firebase'; // Import your firebase setup

const BookingPage = () => {
  const { carId } = useParams();
  const [notificationToken, setNotificationToken] = useState(null);
  
  // Request notification permissions on mount
  useEffect(() => {
    const requestNotifications = async () => {
      try {
        const token = await getToken(messaging, {
          vapidKey: 'YOUR_PUBLIC_VAPID_KEY' // Get from Firebase Console
        });
        setNotificationToken(token);
        console.log('Notification token:', token);
        
        // Send token to your backend to store
        if (token) {
          await fetch('/api/save-notification-token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token })
          });
        }
      } catch (error) {
        console.error('Error getting notification token:', error);
      }
    };

    requestNotifications();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');
    
    const bookingData = { 
      name, address, phone, email, vehicleName, time, date, carId 
    };
    
    try {
      const response = await saveBooking(bookingData);
      console.log("Booking response:", response);
      setMessage('Booking successful!');
      
      // Trigger notification from backend
      if (response.success) {
        await fetch('/api/send-booking-notification', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ...bookingData,
            notificationToken
          })
        });
      }
    } catch (error) {
      console.error("Booking error:", error.response?.data || error.message);
      setMessage('Failed to save booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking-container">
      {/* Your existing JSX remains the same */}
    </div>
  );
};

export default BookingPage;