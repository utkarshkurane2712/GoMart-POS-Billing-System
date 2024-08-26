///////////////************************************************//////// */

import React, { useState, useRef, useEffect } from "react";
import "./HomePage.css";
import Navbar from "../layout/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Category from "../Category/Category";
import BillingPage from "../Billing/Billing";
import PrintableBill from "../PrintableBill/PrintableBill";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AddCustomerModal from "../AddCustomer/AddCustomerModal";

import { useReactToPrint } from "react-to-print";
import axios from "axios";

const HomePage = () => {
  const [items, setItems] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [customers, setCustomers] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isPrintableBillOpen, setIsPrintableBillOpen] = useState(false);

  const billRef = useRef();

  const addItemToBilling = (item) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find(
        (i) => i.productid === item.productid
      );
      if (existingItem) {
        return prevItems.map((i) =>
          i.productid === item.productid ? { ...i, qty: i.qty + 1 } : i
        );
      } else {
        return [...prevItems, { ...item, qty: 1 }];
      }
    });
  };

  const calculateSubtotal = () => {
    return items.reduce(
      (total, item) => total + item.product_price * item.qty,
      0
    );
  };

  const addNewCustomer = (newCustomer) => {
    setCustomers((prevCustomers) => [...prevCustomers, newCustomer]);
  };
  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const discountAmount = (subtotal * discount) / 100;
    return subtotal - discountAmount;
  };

  const calculateTotalQuantity = () => {
    return items.reduce((total, item) => total + item.qty, 0);
  };

  const handlePrint = useReactToPrint({
    content: () => billRef.current,
  });

  const openPrintableBillModal = () => {
    setIsPrintableBillOpen(true);
    // Delaying the print action to ensure the modal is open
    setTimeout(() => handlePrint(), 500);
  };
  // Fetch categories and products
  useEffect(() => {
    axios
      .get("http://localhost:8080/GoMart/category")
      .then((response) => {
        setCategories(response.data);
        console.log("categorycount: ", response.data.length);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
    axios
      .get("http://localhost:8080/GoMart/product")
      .then((response) => {
        setProducts(response.data);
        console.log("Product count: ", response.data.length);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  // Fetch customers
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
  };

  return (
    <>
      <div className="container-fluid p-0">
        <div className="row">
          <Navbar
            categoryCount={categories.length}
            productCount={products.length}
          />
        </div>
        <div className="row">
          <div className="col-md-7 categories">
            <Category addItemToBilling={addItemToBilling} />
          </div>
          <div className="col-md-5 billing-section">
            <div className="header">
              <input
                type="text"
                placeholder="Walk-In Customer"
                className="form-control"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                className=" btn btn-success add-btn"
                onClick={() => setModalOpen(true)}
              >
                <PersonAddIcon style={{ color: "white", marginRight: "5px" }} />{" "}
                Add
              </button>

              {suggestions.length > 0 && (
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
            <BillingPage
              items={items}
              setItems={setItems}
              selectedCustomer={selectedCustomer}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-7 footerBill">
            <div className="row pt-1">
              <div className="col-md-2">
                <label className="fw-bold">Sub Total :</label>
              </div>
              <div className="col-md-2">
                <label className="fw-bold">Discount :</label>
              </div>
              <div className="col-md-2">
                <label className="fw-bold">Discount Amount({discount}%)</label>
              </div>
              <div className="col-md-2">
                <label className="fw-bold">Total:</label>
              </div>
              <div className="col-md-2">
                <label className="fw-bold">Payment Type:</label>
              </div>
              <div className="col-md-2">
                <label className="fw-bold">Total Quantity:</label>
              </div>
            </div>
            <div className="row mt-1">
              <div className="col-md-2">
                <p style={{ color: "blue" }}>
                  ₹ {calculateSubtotal().toFixed(2)}
                </p>
              </div>
              <div className="col-md-2">
                <input
                  type="number"
                  name="discount"
                  placeholder="Enter Discount %"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  style={{ width: "100px" }}
                />
              </div>
              <div className="col-md-2">
                <p style={{ color: "blue" }}>
                  ₹ {(calculateSubtotal() * (discount / 100)).toFixed(2)}
                </p>
              </div>
              <div className="col-md-2">
                <p style={{ color: "green" }}>
                  ₹ {calculateTotal().toFixed(2)}
                </p>
              </div>
              <div className="col-md-2">
                <select>
                  <option value="option1">Cash</option>
                  <option value="option2">UPI</option>
                  <option value="option3">Cards</option>
                </select>
              </div>
              <div className="col-md-2">
                <p style={{ color: "blue" }} className="fw-bold">
                  {calculateTotalQuantity()}
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-5">
            <div className="row pt-3">
              <div className="col-md-4">
                <label className="fw-bold"> Net Bill </label>
                <p className="fw-bold" style={{ color: "green" }}>
                  ₹ {calculateTotal().toFixed(2)}
                </p>
              </div>
              <div className="col-md-8">
                <button
                  className="btn btn-danger clear-btn"
                  onClick={() => setItems([])}
                  style={{ marginRight: "20px", marginLeft: "90px" }}
                >
                  Clear All
                </button>
                <button
                  className="btn btn-primary order-btn"
                  onClick={openPrintableBillModal}
                >
                  Place order
                </button>
              </div>
            </div>

            {/* {modalOpen && (
              <AddCustomerModal
                open={modalOpen}
                closeModal={() => setModalOpen(false)}
                addNewCustomer={addNewCustomer}
              />
            )} */}
            <AddCustomerModal
              open={modalOpen}
              handleClose={() => setModalOpen(false)}
              addNewCustomer={addNewCustomer}
            />
          </div>
        </div>
      </div>

      {isPrintableBillOpen && (
        <div className="modal fade show" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  onClick={() => setIsPrintableBillOpen(false)}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <PrintableBill
                  ref={billRef}
                  items={items}
                  customer={selectedCustomer}
                  discount={discount}
                  calculateTotal={calculateTotal}
                  calculateSubtotal={calculateSubtotal}
                  calculateTotalQuantity={calculateTotalQuantity}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
/******************************************* */
/*import React, { useState, useRef, useEffect } from "react";
import "./HomePage.css";
import Navbar from "../layout/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Category from "../Category/Category";
import BillingPage from "../Billing/Billing";
import PrintableBill from "../PrintableBill/PrintableBill";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AddCustomerModal from "../AddCustomer/AddCustomerModal";
import { useReactToPrint } from "react-to-print";
import axios from "axios";

const HomePage = () => {
  const [items, setItems] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [customers, setCustomers] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isPrintableBillOpen, setIsPrintableBillOpen] = useState(false);

  const billRef = useRef();

  const addItemToBilling = (item) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find(
        (i) => i.productid === item.productid
      );
      if (existingItem) {
        return prevItems.map((i) =>
          i.productid === item.productid ? { ...i, qty: i.qty + 1 } : i
        );
      } else {
        return [...prevItems, { ...item, qty: 1 }];
      }
    });
  };

  const calculateSubtotal = () => {
    return items.reduce(
      (total, item) => total + item.product_price * item.qty,
      0
    );
  };

  const addNewCustomer = (newCustomer) => {
    setCustomers((prevCustomers) => [...prevCustomers, newCustomer]);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const discountAmount = (subtotal * discount) / 100;
    return subtotal - discountAmount;
  };

  const calculateTotalQuantity = () => {
    return items.reduce((total, item) => total + item.qty, 0);
  };

  const handlePrint = useReactToPrint({
    content: () => billRef.current,
  });

  const openPrintableBillModal = () => {
    setIsPrintableBillOpen(true);
    setTimeout(() => handlePrint(), 500);
  };

  // Fetch categories and products
  useEffect(() => {
    axios
      .get("http://localhost:8080/GoMart/category")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });

    axios
      .get("http://localhost:8080/GoMart/product")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  // Fetch customers
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
  };

  return (
    <>
      <div className="container-fluid p-0">
        <div className="row">
          <Navbar
            categoryCount={categories.length}
            productCount={products.length}
          />
        </div>
        <div className="row">
          <div className="col-md-7 categories">
            <Category addItemToBilling={addItemToBilling} />
          </div>
          <div className="col-md-5 billing-section">
            <div className="header">
              <input
                type="text"
                placeholder="Walk-In Customer"
                className="form-control"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                className="btn btn-success add-btn"
                onClick={() => setModalOpen(true)}
              >
                <PersonAddIcon style={{ color: "white", marginRight: "5px" }} />{" "}
                Add
              </button>
              {suggestions.length > 0 && (
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
            <BillingPage
              items={items}
              setItems={setItems}
              selectedCustomer={selectedCustomer}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-7 footerBill">
            <div className="row pt-1">
              <div className="col-md-2">
                <label className="fw-bold">Sub Total :</label>
              </div>
              <div className="col-md-2">
                <label className="fw-bold">Discount :</label>
              </div>
              <div className="col-md-2">
                <label className="fw-bold">Discount Amount({discount}%)</label>
              </div>
              <div className="col-md-2">
                <label className="fw-bold">Total:</label>
              </div>
              <div className="col-md-2">
                <label className="fw-bold">Payment Type:</label>
              </div>
              <div className="col-md-2">
                <label className="fw-bold">Total Quantity:</label>
              </div>
            </div>
            <div className="row mt-1">
              <div className="col-md-2">
                <p style={{ color: "blue" }}>
                  ₹ {calculateSubtotal().toFixed(2)}
                </p>
              </div>
              <div className="col-md-2">
                <input
                  type="number"
                  name="discount"
                  placeholder="Enter Discount %"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  style={{ width: "100px" }}
                />
              </div>
              <div className="col-md-2">
                <p style={{ color: "blue" }}>
                  ₹ {(calculateSubtotal() * (discount / 100)).toFixed(2)}
                </p>
              </div>
              <div className="col-md-2">
                <p style={{ color: "green" }}>
                  ₹ {calculateTotal().toFixed(2)}
                </p>
              </div>
              <div className="col-md-2">
                <select>
                  <option value="option1">Cash</option>
                  <option value="option2">UPI</option>
                  <option value="option3">Cards</option>
                </select>
              </div>
              <div className="col-md-2">
                <p style={{ color: "blue" }} className="fw-bold">
                  {calculateTotalQuantity()}
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-5">
            <div className="row pt-3">
              <div className="col-md-4">
                <label className="fw-bold"> Net Bill </label>
                <p className="fw-bold" style={{ color: "green" }}>
                  ₹ {calculateTotal().toFixed(2)}
                </p>
              </div>
              <div className="col-md-8">
                <button
                  className="btn btn-danger clear-btn"
                  onClick={() => setItems([])}
                  style={{ marginRight: "20px", marginLeft: "90px" }}
                >
                  Clear All
                </button>
                <button
                  className="btn btn-primary order-btn"
                  onClick={openPrintableBillModal}
                >
                  Place order
                </button>
              </div>
            </div>

            {modalOpen && (
              <AddCustomerModal
                closeModal={() => setModalOpen(false)}
                addNewCustomer={addNewCustomer}
              />
            )}
          </div>
        </div>
      </div>

      {isPrintableBillOpen && (
        <div className="modal fade show" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title"> X </h5>
              </div>
              <div className="modal-body">
                <PrintableBill
                  ref={billRef}
                  items={items}
                  selectedCustomer={selectedCustomer}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;*/
