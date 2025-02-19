// api.js
import axios from 'axios';

// Create an axios instance with the base URL set to your backend
const api = axios.create({
  baseURL: 'http://localhost:8089',  // Backend API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor for adding token (if using authentication)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Fetch available cars
export const getAvailableCars = async () => {
  try {
    const response = await api.get('/api/cars/available-cars');
    return response.data;
  } catch (error) {
    console.error('Error fetching available cars:', error);
    throw error;
  }
};

// Fetch car details by ID
export const getCarById = async (carId) => {
  try {
    const response = await api.get(`/api/cars/${carId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching car details:', error);
    throw error;
  }
};

// Create a new order
export const createOrder = async (orderData) => {
  try {
    const response = await api.post('/orders', orderData);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

// Other API calls (orders, login, etc.) can be added here

export default api;
