import Header from "./Header";
import Main from "./Main";
import { useState, useEffect } from "react";
import axios from "axios";

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/products";

import { getCartItems, addToCart, checkout } from "../services/cartItems";

import {
  getNewCart,
  decrementProductQty,
  getNewProductDetails,
} from "../utils/stateHelpers";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState(false);

  // Get Products
  useEffect(() => {
    const productSource = axios.CancelToken.source();
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (e) {
        setError(true);
        console.error(e);
      }
    };

    fetchProducts();

    return () => {
      productSource.cancel("Canceling for some reason");
    };
  }, []);

  // Get Cart Items
  useEffect(() => {
    const cartSource = axios.CancelToken.source();
    const fetchCartItems = async () => {
      try {
        const data = await getCartItems();
        setCartItems(data);
      } catch (e) {
        setError(true);
        console.error(e);
      }
    };

    fetchCartItems();

    return () => {
      cartSource.cancel("Canceling for some reason");
    };
  }, []);

  const handleNewProduct = async (newProduct, callback) => {
    try {
      const data = await createProduct(newProduct);

      setProducts(products.concat(data));

      if (callback) callback();
    } catch (e) {
      setError(true);
      console.error(e);
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      const { item } = await addToCart(productId);

      setCartItems(getNewCart(cartItems, productId, item));

      // update products quantity if adding to cart was successful - Pessemistic update
      setProducts(decrementProductQty(products, productId));
    } catch (e) {
      setError(true);
      console.error(e);
    }
  };

  const handleCheckout = async () => {
    try {
      await checkout();
      setCartItems([]);
    } catch (e) {
      setError(true);
      console.error(e);
    }
  };

  const handleEditProduct = async (productId, productData, callback) => {
    try {
      await updateProduct(productId, productData);
    } catch (e) {
      setError(true);
      console.error(e);
    }
    if (callback) callback();

    setProducts(getNewProductDetails(products, productId, productData));
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await deleteProduct(productId);
      setProducts(products.filter((product) => product._id !== productId));
    } catch (e) {
      setError(true);
      console.error(e);
    }
  };

  if (error) return <div>Something went wrong</div>;

  return (
    <div id="app">
      <Header cartItems={cartItems} onCheckout={handleCheckout} />
      <Main
        products={products}
        onAddProduct={handleNewProduct}
        onAddToCart={handleAddToCart}
        onDelete={handleDeleteProduct}
        onEdit={handleEditProduct}
      />
    </div>
  );
};

export default App;
