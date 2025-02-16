import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AvailableCars() {
  const [cars, setCars] = useState([]); // State to hold car data
  const [loading, setLoading] = useState(true); // Loading state to show a loading indicator

  // Fetch available cars from the backend on component mount
  useEffect(() => {
    const fetchCars = async () => {
      try {
        // Make an API call to fetch available cars from the backend
        const response = await axios.get('http://localhost:8089/api/cars/available-cars');
        
        // Update state with the data received from backend
        setCars(response.data);
      } catch (error) {
        console.error('Error fetching car data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  // Display a loading indicator while data is being fetched
  if (loading) {
    return <div>Loading available cars...</div>;
  }

  return (
    <div>
      <h1>Available Cars</h1>
      <p>Here are the available cars for your ride:</p>
      
      {cars.length === 0 ? (
        <p>No cars available at the moment.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Make</th>
              <th>Model</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr key={car.id}>
                <td>{car.make}</td>
                <td>{car.model}</td>
                <td>{car.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AvailableCars;
