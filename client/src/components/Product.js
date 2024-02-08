import { useState } from "react";
import EditProductForm from "./EditProductForm";

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

  const handleFormVisibleClick = () => {
    setFormVisible((prev) => !prev);
  };

  const handleAddToCart = async () => {
    await onAddToCart(id);
  };

  const handleDelete = async () => {
    await onDelete(id);
  };

  return (
    <li className="product">
      <div className="product-details">
        <h3>{title}</h3>
        <p className="price">${price}</p>
        <p className="quantity">{quantity} left in stock</p>
        <div className="actions product-actions">
          <button className="add-to-cart" onClick={handleAddToCart}>
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
