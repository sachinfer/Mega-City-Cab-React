import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAvailableCars } from '../services/api';
import { motion } from 'framer-motion'; // For animations
import './AvailableCars.css';

const AvailableCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  const handleRentClick = (carId) => {
    navigate(`/booking/${carId}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <p className="text-black text-xl">Fetching available cars...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <p className="text-red-500 text-xl mb-4">{error}</p>
        <button
          className="px-6 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg hover:from-red-600 hover:to-orange-600 transition"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <motion.h2
        className="text-4xl font-bold text-center text-black mb-6"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Available <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Cars</span>
      </motion.h2>
      <motion.p
        className="text-center text-gray-600 mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        Choose from a wide range of cars for your trip.
      </motion.p>

      {cars.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car) => (
            <motion.div
              className="bg-white shadow-lg border border-gray-200 rounded-2xl p-6 transition duration-300 hover:shadow-xl"
              key={car.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="car-details">
                <h3 className="text-2xl font-bold text-black mb-2">
                  {car.make} {car.model}
                </h3>
                <p className="text-gray-700"><strong>Price:</strong> ${car.price?.toFixed(2) || 'N/A'}</p>
                <p className="text-gray-700"><strong>Quantity Available:</strong> {car.quantity}</p>
                <p className="text-gray-700"><strong>Status:</strong> {car.quantity > 0 ? 'Available' : 'Out of Stock'}</p>
              </div>
              <button
                className={`w-full mt-4 px-6 py-2 text-white rounded-lg transition ${
                  car.quantity === 0
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'
                }`}
                onClick={() => handleRentClick(car.id)}
                disabled={car.quantity === 0}
              >
                {car.quantity === 0 ? 'Out of Stock' : 'Rent Now'}
              </button>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No cars available at the moment.</p>
      )}
    </div>
  );
};

export default AvailableCars;