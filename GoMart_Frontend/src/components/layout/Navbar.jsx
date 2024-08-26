/*import React, { useEffect, useState } from "react";
import "./Navbar.css";
// import assets from "../../assets/asset";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

import {
  faPlus,
  faCog,
  faSignOutAlt,
  faChartLine,
  faExpand,
  faTags,
  faShoppingBasket,
} from "@fortawesome/free-solid-svg-icons";

export default function Navbar({ categoryCount, productCount }) {
  console.log("Category count in Navbar:", categoryCount);
  console.log("Product count in Navbar:", productCount);

  const navigate = useNavigate();
  const [businessName, setBusinessName] = useState("GOMART");
  const [logoUrl, setLogoUrl] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/GoMart/settings")
      .then((response) => {
        // Log the entire response to check its structure
        console.log("API Response:", response.data);

        // Extract the settings from the response
        const settings = response.data;

        // Find the setting with ID 1
        const setting = settings.find((item) => item.settingid === 1);

        if (setting) {
          setBusinessName(setting.business_name || "GOMART");
          const logo = setting.business_logo || "";
          setLogoUrl(logo);

          // Print the logo URL to the console
          console.log("Logo URL:", logo);
        } else {
          console.error("Setting with ID 1 not found");
        }
      })
      .catch((error) => {
        console.error("Error fetching settings:", error);
      });
  }, []);

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const handleLogout = () => {
    // Perform any logout operations here (e.g., clearing tokens)
    navigate("/"); // Navigate to the login page
  };

  const [menu, setMenu] = useState("view-category");

  return (
    <div className="container-fluid p-3">
      <nav className="navbar navbar-expand-lg p-2">
        <div className="container-fluid p-3">
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
          </div>

          <div className="heading">
            <Link className="navbar-brand" to="#">
              <span className="hed1">{businessName.split(" ")[0]}</span>
              <span className="hed2">{businessName.split(" ")[1] || ""}</span>
            </Link>
          </div>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse text-md-center text-sm-center"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li onClick={() => setMenu("homePage")} className="nav-item">
                <Link className={menu === "homePage" ? "active" : ""}>
                  <FontAwesomeIcon icon={faTags} /> POS
                </Link>
              </li>
              <li onClick={() => setMenu("view-product")} className="nav-item">
                <Link className={menu === "view-product" ? "active" : ""}>
                  <FontAwesomeIcon icon={faPlus} /> Product
                  {productCount > 0 && (
                    <span className="category-count-dot">{productCount}</span>
                  )}
                </Link>
              </li>
              <li onClick={() => setMenu("view-category")} className="nav-item">
                <Link className={menu === "view-category" ? "active" : ""}>
                  <FontAwesomeIcon icon={faPlus} /> Category
                  {categoryCount > 0 && (
                    <span className="category-count-dot">{categoryCount}</span>
                  )}
                </Link>
              </li>
              <li onClick={() => setMenu("report")} className="nav-item">
                <Link className={menu === "report" ? "active" : ""}>
                  <FontAwesomeIcon icon={faChartLine} /> Reports
                </Link>
              </li>

              <li onClick={() => setMenu("setting")} className="nav-item">
                <Link className={menu === "setting" ? "active" : ""}>
                  <FontAwesomeIcon icon={faCog} /> Setting
                </Link>
              </li>
              <li className="nav-item">
                <button className="nav-link" onClick={handleLogout}>
                  <FontAwesomeIcon icon={faSignOutAlt} /> Log Out
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link" onClick={handleFullscreen}>
                  <FontAwesomeIcon icon={faExpand} className="fa-icon" />
                </button>
              </li>
              {/* <li onClick={() => setMenu()} className="nav-item">
                <Link className="nav-link" to="/cart">
                  <FontAwesomeIcon icon={faShoppingBasket} /> Cart
                </Link>
              </li> }
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
*/

import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

import {
  faPlus,
  faCog,
  faSignOutAlt,
  faChartLine,
  faExpand,
  faTags,
  faShoppingBasket,
} from "@fortawesome/free-solid-svg-icons";

export default function Navbar({ categoryCount, productCount }) {
  const navigate = useNavigate();
  const [businessName, setBusinessName] = useState("GO MART");
  const [logoUrl, setLogoUrl] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/GoMart/settings")
      .then((response) => {
        const settings = response.data;
        const setting = settings.find((item) => item.settingid === 1);

        if (setting) {
          setBusinessName(setting.business_name || "GOMART");
          setLogoUrl(setting.business_logo || "/logo.png");
        }
      })
      .catch((error) => {
        console.error("Error fetching settings:", error);
      });
  }, []);

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const handleLogout = () => {
    navigate("/"); // Navigate to the login page
  };

  const [menu, setMenu] = useState("homePage");

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        {/* Logo and Business Name */}
        <div className="logo-container">
          {logoUrl ? (
            <img
              src={logoUrl}
              alt="Logo"
              onError={(e) => {
                e.target.src = "/logo.png";
              }}
            />
          ) : (
            <img src="/logo.png" alt="Default Logo" />
          )}
          <span className="business-name">{businessName}</span>
        </div>

        {/* Centered Navbar Items */}
        <div className="navbar-center">
          <ul className="navbar-nav">
            <li onClick={() => setMenu("homePage")} className="nav-item">
              <Link
                className={menu === "homePage" ? "active" : ""}
                to="/homePage" // Ensure this path matches your route configuration
              >
                <FontAwesomeIcon icon={faTags} /> POS
              </Link>
            </li>
            <li onClick={() => setMenu("view-product")} className="nav-item">
              <Link
                className={menu === "view-product" ? "active" : ""}
                to="/view-product" // Ensure this path matches your route configuration
              >
                <FontAwesomeIcon icon={faPlus} /> Product
                {productCount > 0 && (
                  <span className="category-count-dot">{productCount}</span>
                )}
              </Link>
            </li>
            <li onClick={() => setMenu("view-category")} className="nav-item">
              <Link
                className={menu === "view-category" ? "active" : ""}
                to="/view-category" // Ensure this path matches your route configuration
              >
                <FontAwesomeIcon icon={faPlus} /> Category
                {categoryCount > 0 && (
                  <span className="category-count-dot">{categoryCount}</span>
                )}
              </Link>
            </li>
            <li onClick={() => setMenu("report")} className="nav-item">
              <Link
                className={menu === "report" ? "active" : ""}
                to="/report" // Ensure this path matches your route configuration
              >
                <FontAwesomeIcon icon={faChartLine} /> Reports
              </Link>
            </li>
            <li onClick={() => setMenu("setting")} className="nav-item">
              <Link
                className={menu === "setting" ? "active" : ""}
                to="/setting" // Ensure this path matches your route configuration
              >
                <FontAwesomeIcon icon={faCog} /> Setting
              </Link>
            </li>
          </ul>
        </div>

        {/* Logout, Settings, and Expand Icon */}
        <div className="navbar-end">
          <button className="nav-link" onClick={handleFullscreen}>
            <FontAwesomeIcon icon={faExpand} />
          </button>
          <button className="nav-link" onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} /> Log Out
          </button>
        </div>
      </div>
    </nav>
  );
}
