import Header from "./Header";
import Main from "./Main";
import { useState, useEffect } from "react";
import axios from "axios";
import { addToCart } from "../services/products";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const productSource = axios.CancelToken.source();
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("http://localhost:5001/api/products", {
          cancelToken: productSource.token,
        });
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

  useEffect(() => {
    const cartSource = axios.CancelToken.source();
    const fetchCart = async () => {
      try {
        const { data } = await axios.get("http://localhost:5001/api/cart", {
          cancelToken: cartSource.token,
        });
        setCartItems(data);
      } catch (e) {
        console.error(e);
      }
    };

    fetchCart();

    return () => {
      cartSource.cancel("Canceling for some reason");
    };
  }, [cartItems.length]);

  const handleAddProduct = async (newProduct, callback) => {
    try {
      const { data } = await axios.post("http://localhost:5001/api/products", {
        ...newProduct,
      });
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
      const data = addToCart(productId);

      setCartItems(cartItems.concat(data));
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
      await axios.post("http://localhost:5001/api/checkout");
      setCartItems([]);
    } catch (e) {
      console.error(e);
    }
  };

  const handleEdit = async () => {};

  const handleDelete = async (productId) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:5001/api/products/${productId}`,
      );
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
