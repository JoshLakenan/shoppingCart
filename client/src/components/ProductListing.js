import Product from "./Product";

const ProductListing = ({ products, onAddToCart, onDelete, onEdit }) => {
  return (
    <div className="product-listing">
      <h2>Products</h2>
      <ul className="product-list">
        {products.map((product) => (
          <Product
            key={product._id}
            title={product.title}
            price={product.price}
            quantity={product.quantity}
            onAddToCart={onAddToCart}
            id={product._id}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </ul>
    </div>
  );
};

export default ProductListing;
