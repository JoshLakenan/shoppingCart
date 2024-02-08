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

  const handleAddProduct = async (newProduct, callback) => {
    try {
      const data = await createProduct(newProduct);

      setProducts(products.concat(data));

      if (callback) {
        callback();
      }
    } catch (e) {
      setError(true);
      console.error(e);
    }
  };

  const handleAddToCart = async (productId) => {
    const updateCartItems = (cartItems, productId, cartItemData) => {
      if (cartItems.find((item) => item.productId === productId)) {
        return cartItems.map((item) => {
          if (item.productId === productId) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
      }

      return cartItems.concat(cartItemData);
    };

    try {
      const { item } = await addToCart(productId);

      const newCart = updateCartItems(cartItems, productId, item);
      setCartItems(newCart);

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

  const handleEdit = async (productId, productData, callback) => {
    try {
      await updateProduct(productId, productData);
    } catch (e) {
      setError(true);
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
      setError(true);
      console.error(e);
    }
  };

  if (error) {
    return <div>Something went wrong</div>;
  }

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
