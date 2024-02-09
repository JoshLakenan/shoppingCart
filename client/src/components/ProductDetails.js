const ProductDetails = ({ title, price, quantity }) => {
  return (
    <>
      <h3>{title}</h3>
      <p className="price">${price}</p>
      <p className="quantity">{quantity} left in stock</p>
    </>
  );
};

export default ProductDetails;
