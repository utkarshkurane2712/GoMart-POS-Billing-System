import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faPlus } from "@fortawesome/free-solid-svg-icons";
import "./ViewCategoryCss.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../layout/Navbar";
import ReactPaginate from "react-paginate";
import "bootstrap/dist/css/bootstrap.min.css";
import AddCategoryModal from "./AddCategoryModal"; // Import the modal

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

export default function ViewCategory() {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [categoriesPerPage] = useState(4); // Set to 4 rows per page
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false); // State for modal visibility
  const [editCategory, setEditCategory] = useState(null); // State for edit category

  const BASE_URL = "http://localhost:8080";

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    setFilteredCategories(
      categories.filter((category) =>
        category.categoryname.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setCurrentPage(0); // Reset to the first page whenever the search term changes
  }, [categories, searchTerm]);

  const loadCategories = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/GoMart/category`);
      setCategories(result.data);
    } catch (error) {
      console.error("There was an error loading the categories!", error);
      toast.error("Failed to load categories");
    }
  };

  const deleteCategory = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/GoMart/category/deleteCategory/${id}`);
      loadCategories();
      toast.success("Category deleted successfully!");
    } catch (error) {
      console.error("There was an error deleting the category!", error);
      toast.error("Failed to delete category");
    }
  };

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const offset = currentPage * categoriesPerPage;
  const currentCategories = filteredCategories.slice(
    offset,
    offset + categoriesPerPage
  );
  const pageCount = Math.ceil(filteredCategories.length / categoriesPerPage);
  const startEntry = offset + 1;
  const endEntry = offset + currentCategories.length;

  return (
    <div className="container-fluid p-0">
      <Navbar />
      <ToastContainer />
      <div className="row">
        <div className="col-md-12">
          <div className="Navbar">
            <nav className="navbar bg-body-tertiary">
              <div className="container-fluid">
                <a className="navbar-brand fw-bold">Category List</a>

                <button
                  className="btn btn-success"
                  type="submit"
                  onClick={() => {
                    setEditCategory(null);
                    setModalOpen(true);
                  }}
                >
                  <span className="plus">
                    <FontAwesomeIcon icon={faPlus} />
                  </span>{" "}
                  Add Category
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
                  <th scope="col">SL</th>
                  <th scope="col">Category Image</th>
                  <th scope="col">Category Name</th>
                  <th scope="col">Created On</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentCategories.map((category, index) => (
                  <tr key={index}>
                    <th scope="row">{offset + index + 1}</th>
                    <td className="catImg">
                      <img
                        src={category.category_image}
                        alt={category.categoryname}
                        width="70"
                        height="70"
                      />
                    </td>
                    <td>{category.categoryname}</td>
                    <td>{category.createdon}</td>
                    <td>
                      <button
                        className="icondel border-0"
                        onClick={() => {
                          setEditCategory(category);
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
                        onClick={() => deleteCategory(category.categoryid)}
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
                ))}
              </tbody>
            </table>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                Showing {startEntry} to {endEntry} of{" "}
                {filteredCategories.length} entries
              </div>
              <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                breakLabel={"..."}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
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
      <AddCategoryModal
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
        reloadCategories={loadCategories}
        editCategory={editCategory}
      />
    </div>
  );
}
