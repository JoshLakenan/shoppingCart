import { useState } from "react";
import EditProductForm from "./EditProductForm";
import ProductDetails from "./ProductDetails";

const Product = ({
  id,
  title,
  price,
  quantity,
  onAddToCart,
  onDelete,
  onEdit,
}) => {
  const [formVisible, setFormVisible] = useState(false);

  const handleFormVisibleClick = () => setFormVisible((prev) => !prev);

  const handleAddToCart = () => onAddToCart(id);

  const handleDelete = () => onDelete(id);

  return (
    <li className="product">
      <div className="product-details">
        <ProductDetails title={title} price={price} quantity={quantity} />
        <div className="actions product-actions">
          <button
            className="add-to-cart"
            onClick={handleAddToCart}
            disabled={quantity === 0}
          >
            Add to Cart
          </button>
          <button className="edit" onClick={handleFormVisibleClick}>
            Edit
          </button>
          {formVisible && (
            <EditProductForm
              id={id}
              currentTitle={title}
              currentPrice={price}
              currentQuantity={quantity}
              onEdit={onEdit}
              closeForm={handleFormVisibleClick}
            />
          )}
        </div>
        <button className="delete-button" onClick={handleDelete}>
          <span>X</span>
        </button>
      </div>
    </li>
  );
};

export default Product;
