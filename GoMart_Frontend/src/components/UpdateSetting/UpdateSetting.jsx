// import React, { useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   IconButton,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   TextField,
//   Button,
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import "./UpdateSetting.css";

// const UpdateSetting = ({ settings, updateSetting, deleteSetting }) => {
//   const [editingItem, setEditingItem] = useState(null);
//   const [dialogOpen, setDialogOpen] = useState(false);

//   const handleEdit = (item) => {
//     setEditingItem(item);
//     setDialogOpen(true);
//   };

//   const handleDelete = (id) => {
//     deleteSetting(id);
//   };

//   const handleDialogClose = () => {
//     setDialogOpen(false);
//     setEditingItem(null);
//   };

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setEditingItem((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSave = () => {
//     updateSetting(editingItem);
//     handleDialogClose();
//   };

//   return (
//     <div className="update-setting">
//       <h2>Update Settings</h2>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Business Name</TableCell>
//               <TableCell>Mobile Number</TableCell>
//               <TableCell>Email</TableCell>
//               <TableCell>Address</TableCell>
//               <TableCell>GST Number</TableCell>
//               <TableCell>Image</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {settings.map((setting) => (
//               <TableRow key={setting.id}>
//                 <TableCell>{setting.businessName}</TableCell>
//                 <TableCell>{setting.businessMobile}</TableCell>
//                 <TableCell>{setting.businessEmail}</TableCell>
//                 <TableCell>{setting.businessAddress}</TableCell>
//                 <TableCell>{setting.businessGstNumber}</TableCell>
//                 <TableCell>
//                   {setting.businessLogo && (
//                     <img
//                       src={URL.createObjectURL(setting.businessLogo)}
//                       alt="Business Logo"
//                       style={{ width: "50px", height: "50px" }}
//                     />
//                   )}
//                 </TableCell>{" "}
//                 <TableCell>
//                   <IconButton onClick={() => handleEdit(setting)}>
//                     <EditIcon />
//                   </IconButton>
//                   <IconButton onClick={() => handleDelete(setting.id)}>
//                     <DeleteIcon />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Edit Dialog */}
//       <Dialog open={dialogOpen} onClose={handleDialogClose}>
//         <DialogTitle>Edit Setting</DialogTitle>
//         <DialogContent>
//           {editingItem && (
//             <form>
//               <TextField
//                 name="businessName"
//                 label="Business Name"
//                 value={editingItem.businessName}
//                 onChange={handleChange}
//                 fullWidth
//                 margin="normal"
//               />
//               <TextField
//                 name="businessMobile"
//                 label="Mobile Number"
//                 value={editingItem.businessMobile}
//                 onChange={handleChange}
//                 fullWidth
//                 margin="normal"
//               />
//               <TextField
//                 name="businessEmail"
//                 label="Email"
//                 value={editingItem.businessEmail}
//                 onChange={handleChange}
//                 fullWidth
//                 margin="normal"
//               />
//               <TextField
//                 name="businessAddress"
//                 label="Address"
//                 value={editingItem.businessAddress}
//                 onChange={handleChange}
//                 fullWidth
//                 margin="normal"
//               />
//               <TextField
//                 name="businessGstNumber"
//                 label="GST Number"
//                 value={editingItem.businessGstNumber}
//                 onChange={handleChange}
//                 fullWidth
//                 margin="normal"
//               />
//               <div className="dialog-actions">
//                 <Button
//                   onClick={handleSave}
//                   variant="contained"
//                   color="primary"
//                 >
//                   Save
//                 </Button>
//                 <Button
//                   onClick={handleDialogClose}
//                   variant="outlined"
//                   color="secondary"
//                 >
//                   Cancel
//                 </Button>
//               </div>
//             </form>
//           )}
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default UpdateSetting;

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import "./UpdateSetting.css";

const UpdateSetting = ({ settings, updateSetting, deleteSetting }) => {
  const [editingItem, setEditingItem] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleEdit = (item) => {
    setEditingItem(item);
    setDialogOpen(true);
  };

  const handleDelete = (id) => {
    deleteSetting(id);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setEditingItem(null);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditingItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    updateSetting(editingItem);
    handleDialogClose();
  };

  return (
    <div className="update-setting">
      <h2>Update Settings</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Business Name</TableCell>
              <TableCell>Mobile Number</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>GST Number</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {settings.map((setting) => (
              <TableRow key={setting.id}>
                <TableCell>{setting.businessName}</TableCell>
                <TableCell>{setting.businessMobile}</TableCell>
                <TableCell>{setting.businessEmail}</TableCell>
                <TableCell>{setting.businessAddress}</TableCell>
                <TableCell>{setting.businessGstNumber}</TableCell>
                <TableCell>
                  {setting.businessLogo && (
                    <img
                      src={URL.createObjectURL(setting.businessLogo)}
                      alt="Business Logo"
                      style={{ width: "50px", height: "50px" }}
                    />
                  )}
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(setting)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(setting.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Dialog */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Edit Setting</DialogTitle>
        <DialogContent>
          {editingItem && (
            <form>
              <TextField
                name="businessName"
                label="Business Name"
                value={editingItem.businessName}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                name="businessMobile"
                label="Mobile Number"
                value={editingItem.businessMobile}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                name="businessEmail"
                label="Email"
                value={editingItem.businessEmail}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                name="businessAddress"
                label="Address"
                value={editingItem.businessAddress}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                name="businessGstNumber"
                label="GST Number"
                value={editingItem.businessGstNumber}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <div className="dialog-actions">
                <Button
                  onClick={handleSave}
                  variant="contained"
                  color="primary"
                >
                  Save
                </Button>
                <Button
                  onClick={handleDialogClose}
                  variant="outlined"
                  color="secondary"
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateSetting;
