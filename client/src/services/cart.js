import axios from "axios";

// Function to add a product to the cart
export const addToCart = async (productId) => {
  const response = await axios.post("/api/add-to-cart", { productId });
  return response.data;
};

// Function to fetch all cart items
export const getCartItems = async () => {
  const response = await axios.get("/api/cart");
  return response.data;
};

// Function to checkout
export const checkout = async () => {
  await axios.post("/api/checkout");
};
