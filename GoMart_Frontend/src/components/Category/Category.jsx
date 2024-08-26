import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import "./Category.css";

const Category = ({ addItemToBilling }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  // Fetch categories from the API
  useEffect(() => {
    axios
      .get("http://localhost:8080/GoMart/category")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  // Fetch products from the API
  useEffect(() => {
    axios
      .get("http://localhost:8080/GoMart/product")
      .then((response) => {
        setItems(response.data);
        setFilteredItems(response.data); // Initialize with all products
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
  }, []);

  // Filter products based on selected category and search term
  useEffect(() => {
    console.log("Selected Category:", selectedCategory); // Debug
    console.log("Search Term:", searchTerm); // Debug
    console.log("All Items:", items); // Debug

    let filtered = items;

    // Filter by selected category
    if (selectedCategory) {
      filtered = items.filter(
        (item) => item.categoryid === Number(selectedCategory)
      );
    }

    // Apply search term filtering
    if (searchTerm) {
      filtered = filtered.filter((item) =>
        item.productname.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredItems(filtered);
  }, [selectedCategory, searchTerm, items]);

  return (
    <div className="category-container">
      <div className="category-items">
        <div className="search-category-container">
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-dropdown"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.categoryid} value={category.categoryid}>
                {category.categoryname}
              </option>
            ))}
          </select>
        </div>

        <div className="items-container">
          <div className="items-grid">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <div
                  key={item.productid}
                  className="item-card"
                  onClick={() => addItemToBilling(item)}
                >
                  <img
                    src={item.product_image}
                    alt={item.productname}
                    className="productImage"
                    style={{ width: "130px", height: "80px" }}
                  />
                  <div className="item-details">
                    <p>
                      <span className="fw-bold">{item.productname}</span>
                      <br />
                      <span>₹ {item.product_price.toFixed(2)}</span>
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>No items found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
