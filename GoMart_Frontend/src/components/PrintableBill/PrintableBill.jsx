import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./PrintableBill.css";
import { useReactToPrint } from "react-to-print";

const PrintableBill = ({
  items,
  customer,
  discount,
  calculateTotal,
  calculateSubtotal,
  calculateTotalQuantity,
}) => {
  const [logoUrl, setLogoUrl] = useState("");
  const [businessName, setBusinessName] = useState("GO MART");

  const BASE_URL = "http://localhost:8080";

  useEffect(() => {
    console.log("Fetching settings from the backend...");

    axios
      .get(`${BASE_URL}/GoMart/settings`)
      .then((response) => {
        console.log("Settings fetched successfully:", response.data);
        const settings = response.data;
        const setting = settings.find((item) => item.settingid === 1);

        if (setting) {
          setBusinessName(setting.business_name || "GO MART");
          setLogoUrl(setting.business_logo || "/logo.png");
          console.log("Business name and logo URL set:", setting);
        } else {
          console.error("Setting with ID 1 not found");
        }
      })
      .catch((error) => {
        console.error("Error fetching settings:", error);
      });
  }, []);

  const billRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => billRef.current,
  });

  const saveBill = async () => {
    const billData = {
      products: items.map((item) => ({
        productid: item.productid,
      })),
      qty: calculateTotalQuantity(),
      subTotal: calculateSubtotal(),
      discountPercentage: 10,
      discount,
      netBill: calculateTotal(),
      customer: {
        customer_id: customer.customer_id,
      },
    };

    console.log("Customer ", customer);

    console.log("Saving bill with data:", billData);

    try {
      const response = await axios.post(`${BASE_URL}/cart/addCart`, billData);
      if (response.status === 201) {
        console.log("Bill saved successfully:", response.data);
        handlePrint(); // Call the print function after saving the bill
      } else {
        console.error("Failed to save the bill. Status code:", response.status);
        alert("Failed to save the bill.");
      }
    } catch (error) {
      console.error("Error saving bill:", error);
      alert("An error occurred while saving the bill.");
    }
  };

  return (
    <div className="printable-bill" ref={billRef}>
      <div className="logo">
        <img
          src={logoUrl || "/logo.png"}
          alt="Logo"
          onError={(e) => {
            e.target.src = "/logo.png";
          }}
          style={{ maxWidth: "100px", maxHeight: "100px" }}
        />
        <h1>
          <span className="hed1">{businessName.split(" ")[0]}</span>
          <span className="hed2">{businessName.split(" ")[1] || ""}</span>
        </h1>
      </div>

      <div className="bill-customer-details">
        {customer ? (
          <>
            <p>
              <strong>Customer Name:</strong> {customer.fullname}
            </p>
            <p>
              <strong>Mobile:</strong> {customer.mobile}
            </p>
          </>
        ) : (
          console.log("No customer data provided")
        )}
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.productid}>
              <td>{item.productname}</td>
              <td>₹ {item.product_price.toFixed(2)}</td>
              <td>{item.qty}</td>
              <td>₹ {(item.product_price * item.qty).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="bill-footer pt-2">
        <p>
          <strong>Sub Total:</strong> ₹ {calculateSubtotal().toFixed(2)}
        </p>
        <p>
          <strong>Discount:</strong> {discount}%
        </p>
        <p>
          <strong>Discount Amount:</strong> ₹{" "}
          {((calculateSubtotal() * discount) / 100).toFixed(2)}
        </p>
        <p>
          <strong>Total Quantity:</strong> {calculateTotalQuantity()}
        </p>
        <p>
          <strong>Total:</strong> ₹ {calculateTotal().toFixed(2)}
        </p>
      </div>

      <div className="bill-footer-section">
        <p>Thank you for shopping with {businessName}!</p>
        <p>Visit us again!</p>
      </div>

      <button className="btn btn-primary order-btn" onClick={saveBill}>
        Save & Print Bill
      </button>
    </div>
  );
};

export default PrintableBill;
