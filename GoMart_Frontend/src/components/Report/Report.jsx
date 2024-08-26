/*import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRupeeSign,
  faBox,
  faShoppingCart,
  faUsers,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import "./Report.css";
import Navbar from "../layout/Navbar";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Report = () => {
  const [customerCount, setCustomerCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [products, setProducts] = useState([]); // State for products

  useEffect(() => {
    const fetchCustomerCount = async () => {
      try {
        const response = await fetch("http://localhost:8080/GoMart/customer");
        const data = await response.json();
        setCustomerCount(data.length);
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };

    const fetchProductCount = async () => {
      try {
        const response = await fetch("http://localhost:8080/GoMart/product");
        const data = await response.json();
        setProductCount(data.length); // Set the total product count
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8080/GoMart/product");
        const data = await response.json();
        console.log(data); // Log the data to check the structure

        // Assuming each product has a 'createdAt' field for sorting
        const sortedProducts = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setProducts(sortedProducts.slice(0, 5)); // Display the most recent 10 products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchCustomerCount();
    fetchProductCount();
    fetchProducts(); // Fetch products
  }, []);

  const data = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
    ],
    datasets: [
      {
        label: "Sales",
        data: [65, 59, 80, 81, 56, 55, 40, 85, 90],
        fill: false,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
      {
        label: "Purchase",
        data: [-65, -59, -80, -81, -56, -55, -40, -85, -90],
        fill: false,
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Purchase & Sales",
      },
    },
  };

  return (
    <>
      <div className="container-fluid p-0 m-0">
        <div className="row">
          <div className="col-md-12 p-0">
            <Navbar />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 p-0 content">
            <div className="dashboard">
              <div className="stats">
                <div className="card">
                  <FontAwesomeIcon
                    icon={faRupeeSign}
                    size="2x"
                    className="iconn"
                  />
                  Total Purchase Due: Rs 0
                </div>
                <div className="card">
                  <FontAwesomeIcon icon={faBox} size="2x" className="iconn" />
                  Total Sales Due: Rs 0
                </div>
                <div className="card">
                  <FontAwesomeIcon
                    icon={faShoppingCart}
                    size="2x"
                    className="iconn"
                  />
                  Total Sale Amount: Rs 0
                </div>
                <div className="card">
                  <FontAwesomeIcon
                    icon={faRupeeSign}
                    size="2x"
                    className="iconn"
                  />
                  Total Expense Amount: Rs 0
                </div>

                <div className="card">
                  <FontAwesomeIcon icon={faUsers} size="2x" className="iconn" />
                  Customers: {customerCount}
                </div>
                <div className="card">
                  <FontAwesomeIcon
                    icon={faUserPlus}
                    size="2x"
                    className="iconn"
                  />
                  Products: {productCount}
                </div>
              </div>
              <div className="charts">
                <div className="chart">
                  <Line data={data} options={options} />
                </div>
                <div className="recent-products">
                  <h2>Recent Products</h2>
                  <table>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Product</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.length > 0 ? (
                        products.map((product, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{product.name || "No Name"}</td>{" "}
                            <td>Rs {product.price || "0"}</td>{" "}
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="3">No recent products available</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Report;*/

/**import React, { useEffect, useState } from "react";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement, // Add ArcElement for Pie chart
} from "chart.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRupeeSign,
  faBox,
  faShoppingCart,
  faUsers,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import "./Report.css";
import Navbar from "../layout/Navbar";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement // Register ArcElement for Pie chart
);

const Report = () => {
  const [customerCount, setCustomerCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [products, setProducts] = useState([]); // State for products

  useEffect(() => {
    const fetchCustomerCount = async () => {
      try {
        const response = await fetch("http://localhost:8080/GoMart/customer");
        const data = await response.json();
        setCustomerCount(data.length);
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };

    const fetchProductCount = async () => {
      try {
        const response = await fetch("http://localhost:8080/GoMart/product");
        const data = await response.json();
        setProductCount(data.length); // Set the total product count
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8080/GoMart/product");
        const data = await response.json();
        console.log(data); // Log the data to check the structure

        // Assuming each product has a 'createdAt' field for sorting
        const sortedProducts = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setProducts(sortedProducts.slice(0, 5)); // Display the most recent 5 products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchCustomerCount();
    fetchProductCount();
    fetchProducts(); // Fetch products
  }, []);

  const data = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
    ],
    datasets: [
      {
        label: "Sales",
        data: [65, 59, 80, 81, 56, 55, 40, 85, 90],
        fill: false,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
      {
        label: "Purchase",
        data: [-65, -59, -80, -81, -56, -55, -40, -85, -90],
        fill: false,
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Purchase & Sales",
      },
    },
  };

  const pieData = {
    labels: ["Product A", "Product B", "Product C"],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Product Distribution",
      },
    },
  };

  return (
    <>
      <div className="container-fluid p-0 m-0">
        <div className="row">
          <div className="col-md-12 p-0">
            <Navbar />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 p-0 content">
            <div className="dashboard">
              <div className="stats">
                <div className="card">
                  <FontAwesomeIcon
                    icon={faRupeeSign}
                    size="2x"
                    className="iconn"
                  />
                  Total Purchase Due: Rs 0
                </div>
                <div className="card">
                  <FontAwesomeIcon icon={faBox} size="2x" className="iconn" />
                  Total Sales Due: Rs 0
                </div>
                <div className="card">
                  <FontAwesomeIcon
                    icon={faShoppingCart}
                    size="2x"
                    className="iconn"
                  />
                  Total Sale Amount: Rs 0
                </div>
                <div className="card">
                  <FontAwesomeIcon
                    icon={faRupeeSign}
                    size="2x"
                    className="iconn"
                  />
                  Total Expense Amount: Rs 0
                </div>

                <div className="card">
                  <FontAwesomeIcon icon={faUsers} size="2x" className="iconn" />
                  Customers: {customerCount}
                </div>
                <div className="card">
                  <FontAwesomeIcon
                    icon={faUserPlus}
                    size="2x"
                    className="iconn"
                  />
                  Products: {productCount}
                </div>
              </div>
              <div className="charts">
                <div className="chart">
                  <Line data={data} options={options} />
                </div>

                <div className="chart">
                  <Pie data={pieData} options={pieOptions} />
                </div>

                <div className="recent-products">
                  <h2>Recent Products</h2>
                  <table>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Product</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.length > 0 ? (
                        products.map((product, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{product.name || "No Name"}</td>{" "}
                            <td>Rs {product.price || "0"}</td>{" "}
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="3">No recent products available</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Report;**/

import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRupeeSign,
  faBox,
  faShoppingCart,
  faUsers,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import "./Report.css";
import Navbar from "../layout/Navbar";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Report = () => {
  const [customerCount, setCustomerCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchCustomerCount = async () => {
      try {
        const response = await fetch("http://localhost:8080/GoMart/customer");
        const data = await response.json();
        console.log("Customer Data:", data); // Debugging
        setCustomerCount(data.length);
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };

    const fetchProductCount = async () => {
      try {
        const response = await fetch("http://localhost:8080/GoMart/product");
        const data = await response.json();
        console.log("Product Data:", data); // Debugging
        setProductCount(data.length);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8080/GoMart/product");
        const data = await response.json();
        console.log(data); // Log the data to check the structure

        // Assuming each product has a 'createdAt' field for sorting
        const sortedProducts = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setProducts(sortedProducts.slice(0, 5)); // Display the most recent 5 products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchCustomerCount();
    fetchProductCount();
    fetchProducts(); // Fetch products
  }, []);
  const lineChartData = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
    ],
    datasets: [
      {
        label: "Sales",
        data: [65, 59, 80, 81, 56, 55, 40, 85, 90],
        fill: false,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
      {
        label: "Purchase",
        data: [-65, -59, -80, -81, -56, -55, -40, -85, -90],
        fill: false,
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Purchase & Sales",
      },
    },
  };

  return (
    <>
      <div className="container-fluid p-0 m-0">
        <div className="row">
          <div className="col-md-12 p-0">
            <Navbar />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 p-0 content">
            <div className="dashboard">
              <div className="stats">
                <div className="card">
                  <FontAwesomeIcon
                    icon={faRupeeSign}
                    size="2x"
                    className="iconn"
                  />
                  Total Purchase Due: Rs 0
                </div>
                <div className="card">
                  <FontAwesomeIcon icon={faBox} size="2x" className="iconn" />
                  Total Sales Due: Rs 0
                </div>
                <div className="card">
                  <FontAwesomeIcon
                    icon={faShoppingCart}
                    size="2x"
                    className="iconn"
                  />
                  Total Sale Amount: Rs 0
                </div>
                <div className="card">
                  <FontAwesomeIcon
                    icon={faRupeeSign}
                    size="2x"
                    className="iconn"
                  />
                  Total Expense Amount: Rs 0
                </div>

                <div className="card">
                  <FontAwesomeIcon icon={faUsers} size="2x" className="iconn" />
                  Customers: {customerCount}
                </div>
                <div className="card">
                  <FontAwesomeIcon
                    icon={faUserPlus}
                    size="2x"
                    className="iconn"
                  />
                  Products: {productCount}
                </div>
              </div>
              <div className="charts">
                <div className="chart">
                  <Line data={lineChartData} options={options} />
                </div>
                <div className="recent-products">
                  <h2>Recent Products</h2>
                  <table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Product</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.length > 0 ? (
                        products.map((product, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{product.product_name || "No Name"}</td>
                            <td>Rs {product.product_price || "0"}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="3">No recent products available</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Report;
/** 
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRupeeSign,
  faBox,
  faShoppingCart,
  faUsers,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import "./Report.css";
import Navbar from "../layout/Navbar";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Report = () => {
  const [customerCount, setCustomerCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [products, setProducts] = useState([]);
  const [todayProductCount, setTodayProductCount] = useState(0);

  useEffect(() => {
    const fetchCustomerCount = async () => {
      try {
        const response = await fetch("http://localhost:8080/GoMart/customer");
        const data = await response.json();
        setCustomerCount(data.length);
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };

    const fetchProductCount = async () => {
      try {
        const response = await fetch("http://localhost:8080/GoMart/product");
        const data = await response.json();
        setProductCount(data.length);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8080/GoMart/product");
        const data = await response.json();

        console.log("Fetched Products:", data); // Log the fetched products

        const today = new Date();
        console.log("Today's Date:", today); // Log today's date

        const todayProducts = data.filter((product) => {
          const createdOn = product.created_on;

          if (!createdOn) {
            console.error("Missing created_on for product:", product);
            console.log("Full product details:", product); // Log full product details
            return false; // Skip this product if 'created_on' is missing
          }

          // Try different formats
          let productDate;
          try {zz
            productDate = new Date(createdOn);
            if (isNaN(productDate.getTime())) {
              // If date is invalid, try manually parsing
              const dateParts = createdOn.split("T")[0].split("-");
              productDate = new Date(
                dateParts[0], // Year
                dateParts[1] - 1, // Month (0-indexed)
                dateParts[2] // Day
              );
            }
          } catch (error) {
            console.error("Error parsing created_on:", createdOn);
            return false; // Skip this product if parsing fails
          }

          console.log("Product Date:", productDate); // Log each product's date

          return (
            productDate.getDate() === today.getDate() &&
            productDate.getMonth() === today.getMonth() &&
            productDate.getFullYear() === today.getFullYear()
          );
        });

        console.log("Today's Products:", todayProducts); // Log products added today

        setTodayProductCount(todayProducts.length);

        // Sort products by the created_on field
        const sortedProducts = data.sort(
          (a, b) => new Date(b.created_on) - new Date(a.created_on)
        );
        setProducts(sortedProducts.slice(0, 5)); // Display the most recent 5 products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchCustomerCount();
    fetchProductCount();
    fetchProducts();
  }, []);

  const lineChartData = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
    ],
    datasets: [
      {
        label: "Sales",
        data: [65, 59, 80, 81, 56, 55, 40, 85, 90],
        fill: false,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
      {
        label: "Purchase",
        data: [-65, -59, -80, -81, -56, -55, -40, -85, -90],
        fill: false,
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Purchase & Sales",
      },
    },
  };

  return (
    <>
      <div className="container-fluid p-0 m-0">
        <div className="row">
          <div className="col-md-12 p-0">
            <Navbar />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 p-0 content">
            <div className="dashboard">
              <div className="stats">
                <div className="card">
                  <FontAwesomeIcon
                    icon={faRupeeSign}
                    size="2x"
                    className="iconn"
                  />
                  Products Added Today: {todayProductCount}
                </div>
                <div className="card">
                  <FontAwesomeIcon icon={faBox} size="2x" className="iconn" />
                  Total Sales Due: Rs 0
                </div>
                <div className="card">
                  <FontAwesomeIcon
                    icon={faShoppingCart}
                    size="2x"
                    className="iconn"
                  />
                  Total Sale Amount: Rs 0
                </div>
                <div className="card">
                  <FontAwesomeIcon
                    icon={faRupeeSign}
                    size="2x"
                    className="iconn"
                  />
                  Total Expense Amount: Rs 0
                </div>
                <div className="card">
                  <FontAwesomeIcon icon={faUsers} size="2x" className="iconn" />
                  Customers: {customerCount}
                </div>
                <div className="card">
                  <FontAwesomeIcon
                    icon={faUserPlus}
                    size="2x"
                    className="iconn"
                  />
                  Products: {productCount}
                </div>
              </div>
              <div className="charts">
                <div className="chart">
                  <Line data={lineChartData} options={options} />
                </div>
                <div className="recent-products">
                  <h2>Recent Products</h2>
                  <table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Product</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.length > 0 ? (
                        products.map((product, index) => (
                          <tr key={index}>
                            <td>{product.product_id}</td>
                            <td>{product.product_name || "No Name"}</td>
                            <td>Rs {product.product_price || "0"}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="3">No recent products available</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Report;**/
