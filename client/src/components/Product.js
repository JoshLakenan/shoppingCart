const Product = ({
  id,
  title,
  price,
  quantity,
  onAddToCart,
  onDelete,
  onEdit,
}) => {
  const handleAddToCart = async () => {
    await onAddToCart(id);
  };

  const handleEdit = async () => {
    console.log("Edit clicked");
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
          <button className="edit" onClick={handleEdit}>
            Edit
          </button>
        </div>
        <button className="delete-button" onClick={handleDelete}>
          <span>X</span>
        </button>
      </div>
    </li>
  );
};

export default Product;
