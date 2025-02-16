import axios from 'axios';

// Create an axios instance with the base URL set to your backend
const api = axios.create({
  baseURL: 'http://localhost:8089',  // Backend API base URL
  headers: {
    'Content-Type': 'application/json',  // Default header for sending JSON data
  },
});

// Interceptor for adding token (if you are using authentication)
api.interceptors.request.use(
  (config) => {
    // Assuming you store your auth token in localStorage or another secure place
    const token = localStorage.getItem('authToken');  // Replace with your token retrieval logic
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Example GET request function (retrieving orders)
export const getOrders = async () => {
  try {
    const response = await api.get('/orders');  // Replace with your endpoint
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

// Example POST request function (creating an order)
export const createOrder = async (orderData) => {
  try {
    const response = await api.post('/orders', orderData);  // Replace with your endpoint
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

// Example PUT request function (updating an order)
export const updateOrder = async (orderId, orderData) => {
  try {
    const response = await api.put(`/orders/${orderId}`, orderData);  // Replace with your endpoint
    return response.data;
  } catch (error) {
    console.error('Error updating order:', error);
    throw error;
  }
};

// Example DELETE request function (deleting an order)
export const deleteOrder = async (orderId) => {
  try {
    const response = await api.delete(`/orders/${orderId}`);  // Replace with your endpoint
    return response.data;
  } catch (error) {
    console.error('Error deleting order:', error);
    throw error;
  }
};

// Example login POST request function (user authentication)
export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);  // Replace with your auth endpoint
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

// Example function to get user data (GET request)
export const getUserData = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}`);  // Replace with your endpoint
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

// Example function to register a new user (POST request)
export const registerUser = async (userData) => {
  try {
    const response = await api.post('/users/register', userData);  // Replace with your registration endpoint
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

// Example function to logout (could remove auth token or session)
export const logout = () => {
  localStorage.removeItem('authToken');  // Remove auth token from storage
  // You can add any additional logout logic if needed
};

export default api;
