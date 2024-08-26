import React, { useEffect } from "react";
import { IconButton } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import "./Table.css";

const Table = ({ userData = [] }) => {
  useEffect(() => {
    console.log("UserData in Table:", userData);
  }, [userData]);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard");
  };

  return (
    <div className="table-container">
      <table className="user-details-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Email</th>
            <th>Password</th>
            <th>Copy</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user, index) => (
            <tr key={index}>
              <td>{user.user}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>
                <IconButton
                  onClick={() => handleCopy(user.email)}
                  aria-label="copy email"
                >
                  <ContentCopyIcon />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
