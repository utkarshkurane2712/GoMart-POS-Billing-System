/*
import React, { useState } from "react";
import { TextField, IconButton, InputAdornment, Switch } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./LoginPage.css";
import { assets } from "../../assets/asset";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const LoginPage = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const BASE_URL = "http://localhost:8080";

  const handleRememberMeToggle = () => {
    setRememberMe(!rememberMe);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    setUsernameError(""); // Clear the error when the user types
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError(""); // Clear the error when the user types
  };

  const validateForm = () => {
    let isValid = true;

    if (!username) {
      setUsernameError("Please enter this field.");
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username)) {
      setUsernameError("Please enter a valid email address.");
      isValid = false;
    }

    if (!password) {
      setPasswordError("Please enter this field.");
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      const userData = {
        username,
        password,
      };

      axios
        .post(`${BASE_URL}/GoMart/users/loggedin`, userData)
        .then((response) => {
          toast.success("Login successful!", { autoClose: 2000 });
          setTimeout(() => {
            navigate("/homePage");
          }, 2000); // Delay navigation by 2 seconds
        })
        .catch((error) => {
          toast.error("Error during login. Please try again.", {
            autoClose: 2000,
          });
          console.log("Error:", error);
        });
    } else {
      toast.error("Form is invalid. Please check the fields and try again.", {
        autoClose: 2000,
      });
      console.log("Form is invalid");
    }
  };

  return (
    <div className="login-container">
      <ToastContainer />
      <div className="login-box">
        <div className="logo">
          <img src={assets.logo} alt="LaundryBox Logo" />
          <h1>
            <span className="hed1">GO</span>
            <span className="hed2">MART</span>
          </h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={username}
              onChange={handleUsernameChange}
              error={Boolean(usernameError)}
              helperText={usernameError}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#57b849",
                  },
                },
                "& .MuiInputLabel-root": {
                  "&.Mui-focused": {
                    color: "#57b849",
                  },
                },
              }}
            />
          </div>
          <div className="input-group">
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              margin="normal"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              error={Boolean(passwordError)}
              helperText={passwordError}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#57b849",
                  },
                },
                "& .MuiInputLabel-root": {
                  "&.Mui-focused": {
                    color: "#57b849",
                  },
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className="remember-me">
            <Switch
              checked={rememberMe}
              onChange={handleRememberMeToggle}
              color="primary"
              sx={{
                "& .MuiSwitch-switchBase.Mui-checked": {
                  color: "#57b849",
                },
                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                  backgroundColor: "#57b849",
                },
              }}
            />
            <label htmlFor="remember">Remember me</label>
          </div>
          <button type="submit" variant="contained" className="login-button">
            Login
          </button>
        </form>
        <footer>
          Powered by <span className="hed1">Combat</span>
          <span className="hed2">Team</span>
        </footer>
      </div>
    </div>
  );
};

export default LoginPage;*/

import React, { useState, useEffect } from "react";
import { TextField, IconButton, InputAdornment, Switch } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [businessName, setBusinessName] = useState("GO MART");
  const navigate = useNavigate();

  const BASE_URL = "http://localhost:8080";

  useEffect(() => {
    axios
      .get(`${BASE_URL}/GoMart/settings`)
      .then((response) => {
        const settings = response.data;
        const setting = settings.find((item) => item.settingid === 1);

        if (setting) {
          setBusinessName(setting.business_name || "GO MART");
          setLogoUrl(setting.business_logo || "/default-logo.png"); // Fallback to a default logo if not available
          console.log("Logo URL:", setting.business_logo);
        } else {
          console.error("Setting with ID 1 not found");
        }
      })
      .catch((error) => {
        console.error("Error fetching settings:", error);
      });
  }, []);

  const handleRememberMeToggle = () => {
    setRememberMe(!rememberMe);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    setUsernameError(""); // Clear the error when the user types
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError(""); // Clear the error when the user types
  };

  const validateForm = () => {
    let isValid = true;

    if (!username) {
      setUsernameError("Please enter this field.");
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username)) {
      setUsernameError("Please enter a valid email address.");
      isValid = false;
    }

    if (!password) {
      setPasswordError("Please enter this field.");
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      const userData = {
        username,
        password,
      };

      axios
        .post(`${BASE_URL}/GoMart/users/loggedin`, userData)
        .then((response) => {
          toast.success("Login successful!", { autoClose: 2000 });
          setTimeout(() => {
            navigate("/homePage");
          }, 2000); // Delay navigation by 2 seconds
        })
        .catch((error) => {
          toast.error("Error during login. Please try again.", {
            autoClose: 2000,
          });
          console.log("Error:", error);
        });
    } else {
      toast.error("Form is invalid. Please check the fields and try again.", {
        autoClose: 2000,
      });
      console.log("Form is invalid");
    }
  };

  return (
    <div className="login-container">
      <ToastContainer />
      <div className="login-box">
        <div className="logo">
          {logoUrl ? (
            <img
              src={logoUrl}
              alt="Logo"
              onError={(e) => {
                console.error("Error loading image:", e.target.src);
                e.target.src = "/logo.png";
              }} // Fallback if the image fails to load
              style={{ maxWidth: "100px", maxHeight: "100px" }} // Adjust size as needed
            />
          ) : (
            <img
              src="/logo.png"
              alt="Default Logo"
              style={{ maxWidth: "100px", maxHeight: "100px" }} // Adjust size as needed
            />
          )}
          <h1>
            <span className="hed1">{businessName.split(" ")[0]}</span>
            <span className="hed2">{businessName.split(" ")[1] || ""}</span>
          </h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={username}
              onChange={handleUsernameChange}
              error={Boolean(usernameError)}
              helperText={usernameError}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#57b849",
                  },
                },
                "& .MuiInputLabel-root": {
                  "&.Mui-focused": {
                    color: "#57b849",
                  },
                },
              }}
            />
          </div>
          <div className="input-group">
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              margin="normal"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              error={Boolean(passwordError)}
              helperText={passwordError}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#57b849",
                  },
                },
                "& .MuiInputLabel-root": {
                  "&.Mui-focused": {
                    color: "#57b849",
                  },
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className="remember-me">
            <Switch
              checked={rememberMe}
              onChange={handleRememberMeToggle}
              color="primary"
              sx={{
                "& .MuiSwitch-switchBase.Mui-checked": {
                  color: "#57b849",
                },
                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                  backgroundColor: "#57b849",
                },
              }}
            />
            <label htmlFor="remember">Remember me</label>
          </div>
          <button
            type="submit"
            className="login-button"
            style={{ backgroundColor: "#57b849", color: "#fff" }} // Change button color to primary
          >
            Login
          </button>
        </form>
        <footer>
          Powered by <span className="hed1">Combat</span>
          <span className="hed2">Team</span>
        </footer>
      </div>
    </div>
  );
};

export default LoginPage;
