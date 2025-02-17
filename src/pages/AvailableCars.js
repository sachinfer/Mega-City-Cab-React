import React, { useEffect, useState } from 'react';
import { getAvailableCars } from '../services/api';  // Import API function
import './AvailableCars.css'; // Import CSS file for styling

const AvailableCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const data = await getAvailableCars();
        setCars(data);
      } catch (error) {
        setError('Failed to fetch cars.');
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  if (loading) return <p className="loading-message">Loading cars...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="cars-container">
      <h2 className="page-title">Available Cars</h2>
      <p className="intro-text">Here are the available cars for your ride:</p>
      
      {cars.length > 0 ? (
        <div className="cars-list">
          {cars.map((car) => (
            <div className="car-item" key={car.id}>
              <div className="car-details">
                <h3 className="car-name">{car.make} {car.model}</h3>
                <p><strong>Price:</strong> ${car.price ? car.price.toFixed(2) : 'N/A'}</p> {/* Added fallback for price */}
                <p><strong>Quantity Available:</strong> {car.quantity}</p>
                <p><strong>Status:</strong> {car.status}</p>
              </div>
              <button className="btn-rent">Rent Now</button>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-cars-message">No cars available at the moment.</p>
      )}
    </div>
  );
};

export default AvailableCars;
