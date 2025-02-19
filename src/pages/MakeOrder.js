import React, { useState } from 'react';

const MakeOrder = () => {
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit the customer details to your database here
    console.log('Customer Details:', customerDetails);
    // Reset the form or show a success message
  };

  return (
    <div>
      <h2>Customer Details</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={customerDetails.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={customerDetails.address}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            name="phone"
            value={customerDetails.phone}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={customerDetails.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default MakeOrder;
