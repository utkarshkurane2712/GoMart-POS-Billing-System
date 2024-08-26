import React from "react";
import { Divider, Typography, Grid } from "@mui/material";
import "./Invoice.css";

const Invoice = () => {
  const items = [
    { id: 1, name: "Snacks" },
    { id: 2, name: "Veggies" },
  ];

  return (
    <div className="invoice">
      <div className="receipt-container">
        <div className="store-info">
          <Typography variant="h4" className="logo">
            GoMart
          </Typography>
          <Typography variant="h6" className="store-name">
            STORE 01
          </Typography>
          <div className="store-details">
            <Typography variant="body1">Mobile No. 6235189</Typography>

            <Typography variant="body1">Email: gomart@store1.com</Typography>
          </div>
        </div>

        <Divider sx={{ marginY: 2 }} />

        <div className="invoice-info">
          <Typography variant="body2">Order ID: 12024/000000001</Typography>
          <Typography variant="body2">Date: 28 Jul 2024 12:20 AM</Typography>
          <Typography variant="body2">GST Reg: N/A</Typography>
          <Typography variant="body2">Mobile. 23619</Typography>{" "}
        </div>

        <Divider sx={{ marginY: 2 }} />

        <div className="customer-info">
          <Typography variant="body1">
            Customer Name: Walking Customer
          </Typography>
        </div>

        <Divider sx={{ marginY: 2 }} />

        <div className="invoice-items1">
          <h3>Invoice </h3>
          <Grid container spacing={2} className="invoice-header">
            <Grid item xs={1} className="grid-item">
              <Typography variant="body2" fontWeight="bold">
                SL.
              </Typography>
            </Grid>
            <Grid item xs={9} className="grid-item">
              <Typography variant="body2" fontWeight="bold">
                Name
              </Typography>
            </Grid>
          </Grid>

          <Divider sx={{ marginY: 1 }} />

          {items.map((item, index) => (
            <div key={item.id}>
              <Grid container spacing={2} className="invoice-item">
                <Grid item xs={1} className="grid-item">
                  <Typography variant="body2">{index + 1}</Typography>
                </Grid>
                <Grid item xs={9} className="grid-item">
                  <Typography variant="body2">{item.name}</Typography>
                </Grid>
              </Grid>
              {index < items.length - 1 && <Divider sx={{ marginY: 1 }} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Invoice;
