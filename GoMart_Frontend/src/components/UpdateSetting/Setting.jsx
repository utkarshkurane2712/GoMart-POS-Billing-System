/*import React, { useState } from "react";
import { TextField, Button, IconButton } from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useNavigate } from "react-router-dom";
import "./Setting.css";

const Setting = ({ addSetting }) => {
  const [businessName, setBusinessName] = useState("");
  const [businessMobile, setBusinessMobile] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [businessGstNumber, setBusinessGstNumber] = useState("");
  const [businessLogo, setBusinessLogo] = useState(null);

  const navigate = useNavigate();

  const handleBusinessNameChange = (event) => {
    setBusinessName(event.target.value);
  };

  const handleBusinessMobileChange = (event) => {
    setBusinessMobile(event.target.value);
  };

  const handleBusinessEmailChange = (event) => {
    setBusinessEmail(event.target.value);
  };

  const handleBusinessAddressChange = (event) => {
    setBusinessAddress(event.target.value);
  };

  const handleBusinessGstNumberChange = (event) => {
    setBusinessGstNumber(event.target.value);
  };

  const handleBusinessLogoChange = (event) => {
    setBusinessLogo(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const businessDetails = {
      id: Date.now(),
      businessName,
      businessMobile,
      businessEmail,
      businessAddress,
      businessGstNumber,
      businessLogo,
    };
    addSetting(businessDetails);
    navigate("/updatesetting");
  };

  return (
    <form onSubmit={handleSubmit} className="setting-form">
      <h2>Business Settings</h2>

      <TextField
        label="Business Name"
        value={businessName}
        onChange={handleBusinessNameChange}
        required
        fullWidth
      />

      <TextField
        label="Mobile Number"
        type="tel"
        value={businessMobile}
        onChange={handleBusinessMobileChange}
        required
        fullWidth
      />

      <TextField
        label="Email"
        type="email"
        value={businessEmail}
        onChange={handleBusinessEmailChange}
        required
        fullWidth
      />

      <TextField
        label="Address"
        value={businessAddress}
        onChange={handleBusinessAddressChange}
        required
        fullWidth
      />

      <TextField
        label="GST Number"
        value={businessGstNumber}
        onChange={handleBusinessGstNumberChange}
        required
        fullWidth
      />

      <div className="button-group">
        <Button
          variant="contained"
          component="label"
          startIcon={<PhotoCamera />}
        >
          Upload Logo
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleBusinessLogoChange}
          />
        </Button>

        <Button type="submit" variant="contained">
          Save Settings
        </Button>
      </div>

      {businessLogo && <p>{businessLogo.name}</p>}
    </form>
  );
};

export default Setting;
*/
import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useNavigate } from "react-router-dom";
import Navbar from "../layout/Navbar";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS for toast

const Setting = () => {
  const [businessName, setBusinessName] = useState("");
  const [businessMobile, setBusinessMobile] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [businessGstNumber, setBusinessGstNumber] = useState("");
  const [businessLogo, setBusinessLogo] = useState(null);
  const [logoUrl, setLogoUrl] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/GoMart/settings")
      .then((response) => {
        console.log("Settings response:", response.data); // Log the entire response

        const setting = response.data;

        if (setting) {
          console.log("Setting found:", setting); // Log the found setting object

          setBusinessName(setting[0].business_name || "");
          setBusinessMobile(setting[0].business_mobile || "");
          setBusinessEmail(setting[0].business_email || "");
          setBusinessAddress(setting[0].business_address || "");
          setBusinessGstNumber(setting[0].business_gst_number || "");
          setLogoUrl(setting[0].business_logo || "");
        } else {
          toast.error("Setting with ID 1 not found");
        }
      })
      .catch((error) => {
        console.error("Error fetching settings:", error);
        toast.error("Failed to fetch settings");
      });
  }, []);

  const handleBusinessLogoChange = (event) => {
    const file = event.target.files[0];
    setBusinessLogo(file);
    setLogoUrl(URL.createObjectURL(file));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Show a toast message before saving the settings
    toast.info("Saving settings...");

    const formData = new FormData();
    formData.append("business_name", businessName);
    formData.append("business_mobile", businessMobile);
    formData.append("business_email", businessEmail);
    formData.append("business_address", businessAddress);
    formData.append("business_gst_number", businessGstNumber);
    if (businessLogo) {
      formData.append("image", businessLogo);
    }

    // Add a delay to show the saving message before performing the save
    setTimeout(() => {
      axios
        .put("http://localhost:8080/GoMart/settings/updateSettings/1", formData)
        .then(() => {
          toast.success("Settings updated successfully");
          console.log("Setting updated sucessfully...!!!");
        })
        .catch((error) => {
          console.error("Error saving settings:", error);
          toast.error("Failed to save settings");
        });
    }, 1000); // Delay of 1 second
  };

  return (
    <>
      <Navbar />
      <Box
        component="form"
        onSubmit={handleSubmit}
        className="setting-form-vertical mt-2"
        sx={{
          maxWidth: "400px",
          margin: "auto",
          padding: "20px",
          boxShadow: 3,
          borderRadius: 2,
          bgcolor: "white",
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: 3, textAlign: "center" }}>
          Business Settings
        </Typography>

        <TextField
          label="Business Name"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          required
          fullWidth
          sx={{ marginBottom: 2 }}
        />

        <TextField
          label="Mobile Number"
          type="tel"
          value={businessMobile}
          onChange={(e) => setBusinessMobile(e.target.value)}
          required
          fullWidth
          sx={{ marginBottom: 2 }}
        />

        <TextField
          label="Email"
          type="email"
          value={businessEmail}
          onChange={(e) => setBusinessEmail(e.target.value)}
          required
          fullWidth
          sx={{ marginBottom: 2 }}
        />

        <TextField
          label="Address"
          value={businessAddress}
          onChange={(e) => setBusinessAddress(e.target.value)}
          required
          fullWidth
          sx={{ marginBottom: 2 }}
        />

        <TextField
          label="GST Number"
          value={businessGstNumber}
          onChange={(e) => setBusinessGstNumber(e.target.value)}
          required
          fullWidth
          sx={{ marginBottom: 2 }}
        />

        <Button
          variant="contained"
          component="label"
          sx={{
            backgroundColor: "#57b849",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#4da03f",
            },
            marginBottom: 2,
          }}
          startIcon={<PhotoCamera />}
          fullWidth
        >
          Upload Logo
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleBusinessLogoChange}
          />
        </Button>

        {logoUrl && (
          <Box sx={{ textAlign: "center", marginBottom: 2 }}>
            <img
              src={logoUrl}
              alt="Business Logo"
              style={{
                maxWidth: "100px",
                maxHeight: "100px",
                marginBottom: "10px",
              }}
            />
            {businessLogo && <Typography>{businessLogo.name}</Typography>}
          </Box>
        )}

        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "#57b849",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#4da03f",
            },
            fullWidth: true,
          }}
        >
          Save Settings
        </Button>
      </Box>
    </>
  );
};

export default Setting;
