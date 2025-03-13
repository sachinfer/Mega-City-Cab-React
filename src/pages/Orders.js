import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook for navigation
import { getOrders } from '../services/api';  // Import API function
import './Orders.css'; // Import CSS file for styling

const Orders = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook to navigate to another page

  const fetchCars = async () => {
    try {
      const data = await getOrders();
      setCars(data);
    } catch (error) {
      setError('Failed to fetch cars.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars(); // Initial fetch call on component mount
  }, []);

  const handleRetry = () => {
    setLoading(true);
    setError(null);  // Reset error state before retrying
    fetchCars();  // Call the fetchCars function again
  };

  const handleDownloadBill = (car) => {
    const billContent = `
      Order Details:
      --------------------
      Car: ${car.name}
      Address: ${car.address}
      Phone Number: ${car.phoneNumber}
      Email: ${car.email}
      Vehicle Name: ${car.vehicleName}
      Time: ${car.time}
      Date: ${car.date}
      Status: ${car.status}
      Destination: ${car.destination}
      Price: $${car.price}
    `;

    const blob = new Blob([billContent], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Bill_${car.id}.txt`;
    link.click();
  };

  if (loading) return <p className="loading-message">Loading cars...</p>;

  if (error) {
    return (
      <div>
        <p className="error-message">{error}</p>
        <button className="btn-retry" onClick={handleRetry}>Retry</button>
      </div>
    );
  }

  return (
    <div className="cars-container">
      <h2 className="page-title">Orders</h2>
      <p className="intro-text">Here are the Orders cars for your ride:</p>
      
      {cars && cars.length > 0 ? (
        <div className="cars-list">
          {cars.map((car) => (
            <div className="car-item" key={car.id}>
              <div className="car-details">
                <h3 className="car-name">{car.name}</h3>
                <p><strong>Address:</strong> {car.address}</p>
                <p><strong>Phone Number:</strong> {car.phoneNumber}</p>
                <p><strong>Email:</strong> {car.email}</p>
                <p><strong>Vehicle Name:</strong> {car.vehicleName}</p>
                <p><strong>Time:</strong> {car.time}</p>
                <p><strong>Date:</strong> {car.date}</p>
                <p><strong>Status:</strong> {car.status}</p>
                <p><strong>Destination:</strong> {car.destination}</p>
                <p><strong>Price:</strong> ${car.price}</p>
                {/* Add the Download Bill button */}
                <button onClick={() => handleDownloadBill(car)} className="btn-download-bill">Download Bill</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-cars-message">No cars available at the moment.</p>
      )}
    </div>
  );
};

export default Orders;
