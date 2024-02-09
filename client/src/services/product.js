import axios from "axios";

// Function to fetch all products
export const getProducts = async () => {
  const response = await axios.get("/api/products");
  return response.data;
};

// Function to create a new product
export const createProduct = async (productData) => {
  const response = await axios.post("/api/products", productData);
  return response.data;
};

// Function to update a product
export const updateProduct = async (productId, productData) => {
  const response = await axios.put(`/api/products/${productId}`, productData);
  return response.data;
};

// Function to delete a product
export const deleteProduct = async (productId) => {
  const response = await axios.delete(`/api/products/${productId}`);
  return response.data;
};
