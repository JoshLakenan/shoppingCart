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

const App = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  // Get Products
  useEffect(() => {
    const productSource = axios.CancelToken.source();
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (e) {
        console.error(e);
      }
    };

    fetchProducts();

    return () => {
      productSource.cancel("Canceling for some reason");
    };
  }, [products.length]);

  // Get Cart Items
  useEffect(() => {
    const cartSource = axios.CancelToken.source();
    const fetchCartItems = async () => {
      try {
        const data = await getCartItems();
        setCartItems(data);
      } catch (e) {
        console.error(e);
      }
    };

    fetchCartItems();

    return () => {
      cartSource.cancel("Canceling for some reason");
    };
  }, [cartItems.length]);

  const handleAddProduct = async (newProduct, callback) => {
    try {
      const data = await createProduct(newProduct);

      setProducts(products.concat(data));

      if (callback) {
        callback();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      const data = await addToCart(productId);

      setCartItems(cartItems.concat(data));

      // update products quantity if adding to cart was successful - Pessemistic update
      setProducts(
        products.map((product) => {
          if (product._id === productId) {
            if (product.quantity > 0) product.quantity -= 1;
          }
          return product;
        }),
      );
    } catch (e) {
      console.error(e);
    }
  };

  const handleCheckout = async () => {
    try {
      await checkout();
      setCartItems([]);
    } catch (e) {
      console.error(e);
    }
  };

  const handleEdit = async (productId, productData, callback) => {
    try {
      await updateProduct(productId, productData);
    } catch (e) {
      console.error(e);
    }
    if (callback) {
      callback();
    }

    setProducts(
      products.map((product) => {
        if (product._id === productId) {
          return { ...product, ...productData };
        }
        return product;
      }),
    );
  };

  const handleDelete = async (productId) => {
    try {
      await deleteProduct(productId);
      setProducts(products.filter((product) => product._id !== productId));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div id="app">
      <Header cartItems={cartItems} onCheckout={handleCheckout} />
      <Main
        products={products}
        onAddProduct={handleAddProduct}
        onAddToCart={handleAddToCart}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
};

export default App;
