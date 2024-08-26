////////////////////////////////////////////
/*
import React, { useState, useEffect } from "react";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import axios from "axios";
import AddCustomerModal from "../AddCustomer/AddCustomerModal";
import PrintableBill from "../PrintableBill/PrintableBill";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Billing.css";

const BillingPage = ({ items, setItems }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [customers, setCustomers] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/GoMart/customer")
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching customer data:", error);
      });
  }, []);

  useEffect(() => {
    if (searchTerm.length > 1) {
      const filteredSuggestions = customers.filter((customer) =>
        customer.fullname.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm, customers]);

  const handleSuggestionClick = (customer) => {
    setSearchTerm(customer.fullname);
    setSuggestions([]);
    setSelectedCustomer(customer); // Set the selected customer
    console.log("Selected Customer:", customer); // Debugging
  };

  const handleDelete = (productid) => {
    const updatedItems = items.filter((item) => item.productid !== productid);
    setItems(updatedItems);
  };

  const handleQuantityChange = (productid, increment) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.productid === productid
          ? { ...item, qty: Math.max(1, item.qty + increment) }
          : item
      )
    );
  };

  const addNewCustomer = (newCustomer) => {
    setCustomers((prevCustomers) => [...prevCustomers, newCustomer]);
  };

  const calculateTotal = () => {
    return items.reduce(
      (total, item) => total + item.product_price * item.qty,
      0
    );
  };

  const calculateSubtotal = () => {
    return calculateTotal(); // Assuming no other charges for now
  };

  const calculateTotalQuantity = () => {
    return items.reduce((total, item) => total + item.qty, 0);
  };

  return (
    <div className="billing-page1">
      <div className="header1">
        {/* <input
          type="text"
          placeholder="Walk-In Customer"
          className="form-control"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        /> }

       /* {suggestions.length > 0 && (
          <div className="suggestions-box">
            {suggestions.map((customer) => (
              <div
                key={customer.customer_id}
                className="suggestion-item"
                onClick={() => handleSuggestionClick(customer)}
              >
                {customer.fullname} - {customer.mobile}
              </div>
            ))}
          </div>
        )}
      </div>
      <table className="table table-striped item-table">
        <thead className="tableHead">
          <tr>
            <th>Sl</th>
            <th>Item .</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.productname}</td>
              <td> ₹ {item.product_price}</td>
              <td>
                <FaMinus
                  className="quantity-icon"
                  onClick={() => handleQuantityChange(item.productid, -1)}
                />
                <span className="quantity-value">{item.qty}</span>
                <FaPlus
                  className="quantity-icon"
                  onClick={() => handleQuantityChange(item.productid, 1)}
                />
              </td>
              <td> ₹ {item.product_price * item.qty}</td>
              <td>
                <FaTrash
                  className="delete-icon"
                  onClick={() => handleDelete(item.productid)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AddCustomerModal
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
        addNewCustomer={addNewCustomer}
      />
      <ToastContainer />

      {selectedCustomer && (
        <PrintableBill
          items={items}
          customer={selectedCustomer}
          discount={10} // Example discount
          calculateTotal={calculateTotal}
          calculateSubtotal={calculateSubtotal}
          calculateTotalQuantity={calculateTotalQuantity}
        />
      )}
    </div>
  );
};

export default BillingPage;*/
/******/ ///////////////////////////////////////

import React, { useState, useEffect } from "react";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import axios from "axios";
import AddCustomerModal from "../AddCustomer/AddCustomerModal";
import PrintableBill from "../PrintableBill/PrintableBill";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Billing.css";

const BillingPage = ({ items, setItems }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [customers, setCustomers] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/GoMart/customer")
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching customer data:", error);
      });
  }, []);

  useEffect(() => {
    if (searchTerm.length > 1) {
      const filteredSuggestions = customers.filter((customer) =>
        customer.fullname.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm, customers]);

  const handleSuggestionClick = (customer) => {
    setSearchTerm(customer.fullname);
    setSuggestions([]);
    setSelectedCustomer(customer);
    console.log("Selected Customer:", customer);
  };

  const handleDelete = (productid) => {
    const updatedItems = items.filter((item) => item.productid !== productid);
    setItems(updatedItems);
  };

  const handleQuantityChange = (productid, increment) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.productid === productid
          ? { ...item, qty: Math.max(1, item.qty + increment) }
          : item
      )
    );
  };

  const addNewCustomer = (newCustomer) => {
    setCustomers((prevCustomers) => [...prevCustomers, newCustomer]);
  };

  const calculateTotal = () => {
    return items.reduce(
      (total, item) => total + item.product_price * item.qty,
      0
    );
  };

  const calculateSubtotal = () => {
    return calculateTotal();
  };

  const calculateTotalQuantity = () => {
    return items.reduce((total, item) => total + item.qty, 0);
  };

  return (
    <div className="billing-page1">
      <table className="table table-striped item-table">
        <thead className="tableHead">
          <tr>
            <th>Sl</th>
            <th>Item </th>
            <th>Price</th>
            <th>Qty</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.productname}</td>
              <td> ₹ {item.product_price}</td>
              <td>
                <FaMinus
                  className="quantity-icon"
                  onClick={() => handleQuantityChange(item.productid, -1)}
                />
                <span className="quantity-value">{item.qty}</span>
                <FaPlus
                  className="quantity-icon"
                  onClick={() => handleQuantityChange(item.productid, 1)}
                />
              </td>
              <td> ₹ {item.product_price * item.qty}</td>
              <td>
                <FaTrash
                  className="delete-icon"
                  onClick={() => handleDelete(item.productid)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AddCustomerModal
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
        addNewCustomer={addNewCustomer}
      />
      <ToastContainer />

      {selectedCustomer && (
        <PrintableBill
          items={items}
          customer={selectedCustomer}
          discount={10}
          calculateTotal={calculateTotal}
          calculateSubtotal={calculateSubtotal}
          calculateTotalQuantity={calculateTotalQuantity}
        />
      )}
    </div>
  );
};

export default BillingPage;

// ** Suggestion is not displaying
