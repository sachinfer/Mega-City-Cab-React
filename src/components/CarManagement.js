import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CarManagement.css'; // Import the CSS file

const CarManagement = () => {
  const [cars, setCars] = useState([]);
  const [newCar, setNewCar] = useState({ brand: '', model: '', status: '', quantity: 0, price: 0 });

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    const response = await axios.get('http://localhost:8089/api/cars/available-cars');
    setCars(response.data);
  };

  const handleAddCar = async () => {
    await axios.post('http://localhost:8089/api/cars/available-cars', newCar);
    fetchCars();
    setNewCar({ brand: '', model: '', status: '', quantity: 0, price: 0 });
  };

  const handleUpdateCar = async (id, updatedCar) => {
    await axios.put(`http://localhost:8089/api/cars/available-cars/${id}`, updatedCar);
    fetchCars();
  };

  const handleDeleteCar = async (id) => {
    await axios.delete(`http://localhost:8089/api/cars/available-cars/${id}`);
    fetchCars();
  };

  return (
    <div className="car-management-container">
      <h2>Car Management</h2>
      <table>
        <thead>
          <tr>
            <th>Brand</th>
            <th>Model</th>
            <th>Status</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cars.map(car => (
            <tr key={car.id}>
              <td>{car.brand}</td>
              <td>{car.model}</td>
              <td>{car.status}</td>
              <td>{car.quantity}</td>
              <td>{car.price}</td>
              <td>
                <button onClick={() => handleUpdateCar(car.id, { ...car, status: 'Available' })}>Make Available</button>
                <button onClick={() => handleDeleteCar(car.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Add New Car</h3>
      <div className="car-form">
        <input type="text" placeholder="Brand" value={newCar.brand} onChange={(e) => setNewCar({ ...newCar, brand: e.target.value })} />
        <input type="text" placeholder="Model" value={newCar.model} onChange={(e) => setNewCar({ ...newCar, model: e.target.value })} />
        <input type="text" placeholder="Status" value={newCar.status} onChange={(e) => setNewCar({ ...newCar, status: e.target.value })} />
        <input type="number" placeholder="Quantity" value={newCar.quantity} onChange={(e) => setNewCar({ ...newCar, quantity: Number(e.target.value) })} />
        <input type="number" placeholder="Price" value={newCar.price} onChange={(e) => setNewCar({ ...newCar, price: Number(e.target.value) })} />
        <button onClick={handleAddCar}>Add Car</button>
      </div>
    </div>
  );
};

export default CarManagement;
