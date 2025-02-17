import React, { useEffect, useState } from 'react';
import { getAvailableCars } from '../services/api';  // Import API function

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

  if (loading) return <p>Loading cars...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h2>Available Cars</h2>
      <p>Here are the available cars for your ride:</p>
      {cars.length > 0 ? (
        <ul>
          {cars.map((car) => (
            <li key={car.id}>
              {car.make} {car.model} - {car.status}
            </li>
          ))}
        </ul>
      ) : (
        <p>No cars available at the moment.</p>
      )}
    </div>
  );
};

export default AvailableCars;
