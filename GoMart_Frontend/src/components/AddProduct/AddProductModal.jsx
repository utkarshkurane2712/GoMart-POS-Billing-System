// import React, { useState, useEffect } from 'react';
// import { Button, Modal, TextField, Box, Typography, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
// import { PhotoCamera } from '@mui/icons-material';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const AddProductModal = ({ open, handleClose, reloadProducts, editProduct, categories }) => {
//   const [productName, setProductName] = useState('');
//   const [categoryId, setCategoryId] = useState('');
//   const [productPrice, setProductPrice] = useState('');
//   const [image, setImage] = useState(null);

//   useEffect(() => {
//     if (editProduct) {
//       setProductName(editProduct.productname);
//       setCategoryId(editProduct.categoryid);
//       setProductPrice(editProduct.product_price);
//       setImage(null); // Reset the image to null when editing
//     } else {
//       setProductName('');
//       setCategoryId('');
//       setProductPrice('');
//       setImage(null);
//     }
//   }, [editProduct]);

//   const handleImageChange = (e) => {
//     setImage(e.target.files[0]);
//   };

//   const handleSubmit = async () => {
//     const formData = new FormData();
//     formData.append('productname', productName);
//     formData.append('categoryid', categoryId);
//     formData.append('product_price', productPrice);
//     if (image) {
//       formData.append('productimage', image);
//     }

//     try {
//       if (editProduct) {
//         await axios.put(`http://localhost:8080/GoMart/product/updateProduct/${editProduct.productid}`, formData);
//         toast.success('Product edited successfully!', { autoClose: 1000 });
//       } else {
//         await axios.post('http://localhost:8080/GoMart/product/addProduct', formData);
//         toast.success('Product added successfully!', { autoClose: 1000 });
//       }
//       handleClose();
//       reloadProducts(); // Reload products to reflect changes
//     } catch (error) {
//       console.error('Error saving product:', error);
//       toast.error('Failed to save product!');
//     }
//   };

//   return (
//     <Modal open={open} onClose={handleClose}>
//       <Box sx={{ width: 400, padding: 2, margin: 'auto', marginTop: '10%', bgcolor: 'background.paper', borderRadius: 1 }}>
//         <Typography variant="h6" component="h2">
//           {editProduct ? 'Edit Product' : 'Add New Product'}
//         </Typography>
//         <TextField
//           label="Product Name"
//           fullWidth
//           margin="normal"
//           value={productName}
//           onChange={(e) => setProductName(e.target.value)}
//         />
//         <FormControl fullWidth margin="normal">
//           <InputLabel>Category</InputLabel>
//           <Select
//             value={categoryId}
//             onChange={(e) => setCategoryId(e.target.value)}
//             label="Category"
//           >
//             {categories.map((category) => (
//               <MenuItem key={category.categoryid} value={category.categoryid}>
//                 {category.categoryname}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//         <TextField
//           label="Product Price"
//           fullWidth
//           margin="normal"
//           value={productPrice}
//           onChange={(e) => setProductPrice(e.target.value)}
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

// export default AddProductModal;

// import React, { useState, useEffect } from 'react';
// import { Button, Modal, TextField, Box, Typography, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
// import { PhotoCamera } from '@mui/icons-material';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const AddProductModal = ({ open, handleClose, reloadProducts, editProduct, categories }) => {
//   const [productName, setProductName] = useState('');
//   const [categoryId, setCategoryId] = useState('');
//   const [productPrice, setProductPrice] = useState('');
//   const [productImage, setProductImage] = useState(null);

//   useEffect(() => {
//     if (editProduct) {
//       setProductName(editProduct.productname);
//       setCategoryId(editProduct.categoryid);
//       setProductPrice(editProduct.product_price);
//       setProductImage(null); // Reset the image to null when editing
//     } else {
//       setProductName('');
//       setCategoryId('');
//       setProductPrice('');
//       setProductImage(null);
//     }
//   }, [editProduct]);

//   const handleImageChange = (e) => {
//     setProductImage(e.target.files[0]);
//   };

//   const handleSubmit = async () => {
//     const formData = new FormData();
//     formData.append('productname', productName);
//     formData.append('categoryid', categoryId);
//     formData.append('product_price', productPrice);
//     if (productImage) {
//       formData.append('productimage', productImage);
//     }

//     try {
//       if (editProduct) {
//         await axios.put(`http://localhost:8080/GoMart/product/updateProduct/${editProduct.productid}`, formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         });
//         toast.success('Product edited successfully!', { autoClose: 1000 });
//       } else {
//         await axios.post('http://localhost:8080/GoMart/product/addProduct', formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         });
//         toast.success('Product added successfully!', { autoClose: 1000 });
//       }
//       handleClose();
//       reloadProducts(); // Reload products to reflect changes
//     } catch (error) {
//       console.error('Error saving product:', error);
//       toast.error('Failed to save product!');
//     }
//   };

//   return (
//     <Modal open={open} onClose={handleClose}>
//       <Box sx={{ width: 400, padding: 3, margin: 'auto', marginTop: '10%', bgcolor: 'background.paper', borderRadius: 1 }}>
//         <Typography variant="h6" component="h2" gutterBottom>
//           {editProduct ? 'Edit Product' : 'Add New Product'}
//         </Typography>
//         <TextField
//           label="Product Name"
//           fullWidth
//           margin="normal"
//           value={productName}
//           onChange={(e) => setProductName(e.target.value)}
//         />
//         <FormControl fullWidth margin="normal">
//           <InputLabel>Category</InputLabel>
//           <Select
//             value={categoryId}
//             onChange={(e) => setCategoryId(e.target.value)}
//             label="Category"
//           >
//             {categories.map((category) => (
//               <MenuItem key={category.categoryid} value={category.categoryid}>
//                 {category.categoryname}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//         <TextField
//           label="Product Price"
//           fullWidth
//           margin="normal"
//           type="number"
//           value={productPrice}
//           onChange={(e) => setProductPrice(e.target.value)}
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

// export default AddProductModal;



import React, { useState, useEffect } from 'react';
import { Button, Modal, TextField, Box, Typography, Select, MenuItem, InputLabel, FormControl, Avatar } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddProductModal = ({ open, handleClose, reloadProducts, editProduct, categories }) => {
  const [productName, setProductName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (editProduct) {
      setProductName(editProduct.productname);
      setCategoryId(editProduct.categoryid);
      setProductPrice(editProduct.product_price);
      setProductImage(null); // Reset the image to null when editing
      setImagePreview(null); // Reset the image preview
    } else {
      setProductName('');
      setCategoryId('');
      setProductPrice('');
      setProductImage(null);
      setImagePreview(null);
    }
  }, [editProduct]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProductImage(file);
    setImagePreview(URL.createObjectURL(file)); // Create a URL for the image preview
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('productname', productName);
    formData.append('categoryid', categoryId);
    formData.append('product_price', productPrice);
    if (productImage) {
      formData.append('productimage', productImage);
    }

    try {
      if (editProduct) {
        await axios.put(`http://localhost:8080/GoMart/product/updateProduct/${editProduct.productid}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        toast.success('Product edited successfully!', { autoClose: 1000 });
      } else {
        await axios.post('http://localhost:8080/GoMart/product/addProduct', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        toast.success('Product added successfully!', { autoClose: 1000 });
      }
      handleClose();
      reloadProducts(); // Reload products to reflect changes
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error('Failed to save product!');
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ width: 400, padding: 3, margin: 'auto', marginTop: '10%', bgcolor: 'background.paper', borderRadius: 1 }}>
        <Typography variant="h6" component="h2" gutterBottom>
          {editProduct ? 'Edit Product' : 'Add New Product'}
        </Typography>
        <TextField
          label="Product Name"
          fullWidth
          margin="normal"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Category</InputLabel>
          <Select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            label="Category"
          >
            {categories.map((category) => (
              <MenuItem key={category.categoryid} value={category.categoryid}>
                {category.categoryname}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Product Price"
          fullWidth
          margin="normal"
          type="number"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
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
              alt="Product Image"
              sx={{ width: 56, height: 56, marginRight: 2 }}
            />
            <Typography>{productImage?.name}</Typography>
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

export default AddProductModal;



