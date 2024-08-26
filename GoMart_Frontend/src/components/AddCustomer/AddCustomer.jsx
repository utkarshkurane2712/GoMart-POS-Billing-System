import React, { useState } from "react";
import axios from "axios"; // Import axios if using axios
import "./AddCustomer.css";

const AddCustomer = ({ onSave }) => {
  // State to manage form inputs
  const [customer, setCustomer] = useState({
    fullname: "",
    mobile: "",
  });
  const [loading, setLoading] = useState(false); // Optional: Manage loading state
  const [error, setError] = useState(null); // Optional: Manage error state

  // Handler for input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // Make the POST request to the backend API
      const response = await axios.post(
        "http://localhost:8080/GoMart/customer/addCustomer",
        customer
      );
      console.log("Customer added:", response.data);
      onSave(customer); // Call the onSave function from props
    } catch (err) {
      console.error("Error adding customer:", err);
      setError("Failed to add customer. Please try again."); // Set error message if needed
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-customer">
      <form onSubmit={handleSubmit}>
        <h2>Add Customer</h2>
        <div className="form-group">
          <label>Customer Name *</label>
          <input
            type="text"
            name="fullname"
            value={customer.fullname}
            onChange={handleChange}
            placeholder="Enter Customer Name"
            required
          />
        </div>
        <div className="form-group">
          <label>Phone Number *</label>
          <input
            type="text"
            name="mobile"
            value={customer.mobile}
            onChange={handleChange}
            placeholder="Enter Phone Number"
            required
          />
        </div>
        {error && <p className="error">{error}</p>}{" "}
        {/* Optional: Display error message */}
        <div className="form-buttons">
          <button type="button" className="cancel-button">
            Cancel
          </button>
          <button type="submit" className="save-button" disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCustomer;
