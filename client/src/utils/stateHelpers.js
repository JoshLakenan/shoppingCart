export const getNewCart = (cartItems, productId, cartItemData) => {
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

export const decrementProductQty = (products, productId) => {
  return products.map((product) => {
    if (product._id === productId) {
      if (product.quantity > 0) product.quantity -= 1;
    }
    return product;
  });
};

export const getNewProductDetails = (products, productId, productData) => {
  return products.map((product) => {
    if (product._id === productId) {
      return { ...product, ...productData };
    }
    return product;
  });
};
