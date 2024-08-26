// import React, { useState, useEffect } from 'react';
// import { Button, Modal, TextField, Box, Typography } from '@mui/material';
// import { PhotoCamera } from '@mui/icons-material';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const AddCategoryModal = ({ open, handleClose, reloadCategories, editCategory }) => {
//   const [categoryName, setCategoryName] = useState('');
//   const [image, setImage] = useState(null);

//   useEffect(() => {
//     if (editCategory) {
//       setCategoryName(editCategory.categoryname);
//     } else {
//       setCategoryName('');
//     }
//   }, [editCategory]);

//   const handleImageChange = (e) => {
//     setImage(e.target.files[0]);
//   };

//   const handleSubmit = async () => {
//     const formData = new FormData();
//     formData.append('categoryname', categoryName);
//     if (image) {
//       formData.append('image', image);
//     }

//     console.log(formData);
    

//     try {
//       if (editCategory) {
//         await axios.put(`http://localhost:8080/GoMart/category/updateCategory/${editCategory.categoryid}`, formData);
//         toast.success('Category edited successfully!', { autoClose: 1000 });
//       } else {
//         await axios.post('http://localhost:8080/GoMart/category/addCategory', formData);
//         toast.success('Category added successfully!', { autoClose: 1000 });
//       }
//       handleClose();
//       reloadCategories(); // Reload categories to reflect changes
//     } catch (error) {
//       console.error('Error saving category:', error);
//       toast.error('Failed to save category!');
//     }
//   };

//   return (
//     <Modal open={open} onClose={handleClose}>
//       <Box sx={{ width: 400, padding: 2, margin: 'auto', marginTop: '10%', bgcolor: 'background.paper', borderRadius: 1 }}>
//         <Typography variant="h6" component="h2">
//           {editCategory ? 'Edit Category' : 'Add New Category'}
//         </Typography>
//         <TextField
//           label="Category Name"
//           fullWidth
//           margin="normal"
//           value={categoryName}
//           onChange={(e) => setCategoryName(e.target.value)}
//         />
//         <Button
//           variant="contained"
//           component="label"
//           startIcon={<PhotoCamera />}
//           fullWidth
//           margin="normal"
//         >
//           Choose Image
//           <input
//             type="file"
//             accept="image/*"
//             hidden
//             onChange={handleImageChange}
//           />
//         </Button>
//         <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
//           <Button variant="contained" color="primary" onClick={handleSubmit}>
//             Save
//           </Button>
//         </Box>
//       </Box>
//     </Modal>
//   );
// };

// export default AddCategoryModal;



import React, { useState, useEffect } from 'react';
import { Button, Modal, TextField, Box, Typography, Avatar } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddCategoryModal = ({ open, handleClose, reloadCategories, editCategory }) => {
  const [categoryName, setCategoryName] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (editCategory) {
      setCategoryName(editCategory.categoryname);
      setImage(null); // Reset the image when editing
      setImagePreview(null); // Reset the image preview when editing
    } else {
      setCategoryName('');
      setImage(null);
      setImagePreview(null);
    }
  }, [editCategory]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file)); // Create a URL for the image preview
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('categoryname', categoryName);
    if (image) {
      formData.append('image', image);
    }

    try {
      if (editCategory) {
        await axios.put(`http://localhost:8080/GoMart/category/updateCategory/${editCategory.categoryid}`, formData);
        toast.success('Category edited successfully!', { autoClose: 1000 });
      } else {
        await axios.post('http://localhost:8080/GoMart/category/addCategory', formData);
        toast.success('Category added successfully!', { autoClose: 1000 });
      }
      handleClose();
      reloadCategories(); // Reload categories to reflect changes
    } catch (error) {
      console.error('Error saving category:', error);
      toast.error('Failed to save category!');
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ width: 400, padding: 2, margin: 'auto', marginTop: '10%', bgcolor: 'background.paper', borderRadius: 1 }}>
        <Typography variant="h6" component="h2">
          {editCategory ? 'Edit Category' : 'Add New Category'}
        </Typography>
        <TextField
          label="Category Name"
          fullWidth
          margin="normal"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <Button
          variant="contained"
          component="label"
          startIcon={<PhotoCamera />}
          fullWidth
          margin="normal"
        >
          Choose Image
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleImageChange}
          />
        </Button>
        {imagePreview && (
          <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
            <Avatar
              src={imagePreview}
              alt="Category Image"
              sx={{ width: 56, height: 56, marginRight: 2 }}
            />
            <Typography>{image?.name}</Typography>
          </Box>
        )}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddCategoryModal;
