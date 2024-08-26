import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AddCustomerModal.css";

const AddCustomerModal = ({ open, handleClose, addNewCustomer }) => {
  const [fullname, setFullname] = useState("");
  const [mobile, setMobile] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newCustomer = {
      fullname,
      mobile,
    };

    axios
      .post("http://localhost:8080/GoMart/customer/addCustomer", newCustomer)
      .then((response) => {
        toast.success("Customer added successfully!");
        addNewCustomer(response.data);
        handleClose();
      })
      .catch((error) => {
        toast.error("Failed to add customer.");
        console.error("Error adding customer:", error);
      });
  };

  if (!open) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-modal" onClick={handleClose}>
          &times;
        </button>
        <h2>Add Customer</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Mobile</label>
            <input
              type="text"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-success">
            Save
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddCustomerModal;
