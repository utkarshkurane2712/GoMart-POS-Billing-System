import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faPlus } from "@fortawesome/free-solid-svg-icons";
import "./ViewProduct.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../layout/Navbar";
import ReactPaginate from "react-paginate";
import "bootstrap/dist/css/bootstrap.min.css";
import AddProductModal from "./AddProductModal";

const styles = {
  statusActive: {
    color: "green",
    fontWeight: "600",
  },
  statusInactive: {
    color: "red",
    fontWeight: "600",
  },
};

export default function ViewProduct() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); // State for categories
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false); // State for modal visibility
  const [editProduct, setEditProduct] = useState(null); // State for edit product
  const [currentPage, setCurrentPage] = useState(0); // State for pagination
  const [entriesPerPage] = useState(5); // Entries per page

  const BASE_URL = "http://localhost:8080";

  useEffect(() => {
    loadProducts();
    loadCategories(); // Load categories on component mount
  }, []);

  useEffect(() => {
    const filtered = products.filter(
      (product) =>
        product.productname &&
        product.productname.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
    setCurrentPage(0); // Reset to the first page whenever the search term changes
  }, [products, searchTerm]);

  const loadProducts = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/GoMart/product`);
      console.log("Products fetched:", result.data);
      setProducts(result.data);
    } catch (error) {
      console.error("There was an error loading the products!", error);
      toast.error("Failed to load products");
    }
  };

  const loadCategories = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/GoMart/category`);
      console.log("Categories fetched:", result.data); // Log the fetched categories
      setCategories(result.data);
    } catch (error) {
      console.error("There was an error loading the categories!", error);
      toast.error("Failed to load categories");
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/GoMart/product/deleteProduct/${id}`);
      loadProducts();
      toast.success("Product deleted successfully!", { autoClose: 1000 });
    } catch (error) {
      console.error("There was an error deleting the product!", error);
      toast.error("Failed to delete product");
    }
  };

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  // Calculate the displayed entries
  const offset = currentPage * entriesPerPage;
  const currentEntries = filteredProducts.slice(
    offset,
    offset + entriesPerPage
  );
  const pageCount = Math.ceil(filteredProducts.length / entriesPerPage);
  const startEntry = offset + 1;
  const endEntry = offset + currentEntries.length;

  return (
    <div className="container-fluid p-0">
      <Navbar
        productCount={products.length}
        categoryCount={categories.length}
      />{" "}
      <ToastContainer />
      <div className="row">
        <div className="col-md-12">
          <div className="Navbar">
            <nav className="navbar bg-body-tertiary">
              <div className="container-fluid">
                <a className="navbar-brand fw-bold">Product List</a>
                <button
                  className="btn btn-success"
                  type="button"
                  onClick={() => {
                    setEditProduct(null);
                    setModalOpen(true);
                  }}
                >
                  <span className="plus">
                    <FontAwesomeIcon icon={faPlus} />
                  </span>{" "}
                  Add Product
                </button>
              </div>
            </nav>
          </div>
          <div className="searchbar">
            <label>Search: </label>
            <input
              type="search"
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="py-4">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">sl</th>
                  <th scope="col">product_image</th>
                  <th scope="col">product_name</th>
                  <th scope="col">category_name</th>
                  <th scope="col">product_price</th>
                  <th scope="col">created_on</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentEntries.map((product, index) => {
                  const category = categories.find(
                    (cat) => cat.categoryid === product.categoryid
                  );
                  return (
                    <tr key={product.productid || index}>
                      <th scope="row">{product.productid}</th>
                      <td className="prodImg">
                        <img
                          src={product.product_image}
                          alt={product.productname}
                          width="50"
                          height="50"
                        />
                      </td>
                      <td>{product.productname}</td>
                      <td>{category ? category.categoryname : "Unknown"}</td>
                      <td>{product.product_price}</td>
                      <td>{product.createdon}</td>
                      <td>
                        <button
                          className="icondel border-0"
                          onClick={() => {
                            setEditProduct(product);
                            setModalOpen(true);
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faEdit}
                            style={{
                              marginRight: "10px",
                              color: "green",
                              border: "2px solid green",
                              padding: "3px",
                            }}
                          />
                        </button>
                        <button
                          className="idonupd border-0"
                          onClick={() => deleteProduct(product.productid)}
                        >
                          <FontAwesomeIcon
                            icon={faTrash}
                            style={{
                              color: "red",
                              border: "2px solid red",
                              padding: "3px",
                            }}
                          />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="row">
              <div className="col-md-6 pt-3">
                Showing {startEntry} to {endEntry} of {filteredProducts.length}{" "}
                entries
              </div>
              <div className="col-md-6 d-flex justify-content-end pt-3">
                <ReactPaginate
                  previousLabel={"Previous"}
                  nextLabel={"Next"}
                  breakLabel={"..."}
                  breakClassName={"page-item"}
                  breakLinkClassName={"page-link"}
                  pageCount={pageCount}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={handlePageClick}
                  containerClassName={"pagination mb-0"}
                  pageClassName={"page-item"}
                  pageLinkClassName={"page-link"}
                  previousClassName={"page-item"}
                  previousLinkClassName={"page-link"}
                  nextClassName={"page-item"}
                  nextLinkClassName={"page-link"}
                  activeClassName={"active"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddProductModal
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
        reloadProducts={loadProducts}
        editProduct={editProduct}
        categories={categories}
      />
    </div>
  );
}
