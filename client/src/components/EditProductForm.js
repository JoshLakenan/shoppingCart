import React, { useState } from "react";
import { validForm } from "../utils/validators";

const EditProductForm = ({
  id,
  currentTitle,
  currentPrice,
  currentQuantity,
  onEdit,
  closeForm,
}) => {
  const [title, setTitle] = useState(currentTitle);
  const [price, setPrice] = useState(currentPrice);
  const [quantity, setQty] = useState(currentQuantity);

  const resetForm = () => {
    setTitle("");
    setPrice("");
    setQty("");

    closeForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validForm(title, price, quantity)) return;

    const editedProduct = { title, price, quantity };
    await onEdit(id, editedProduct, resetForm);
  };

  return (
    <div className="edit-form">
      <h3>Edit Product</h3>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="product-name">Product Name</label>
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            id="product-name"
            value={title}
            aria-label="Product Name"
          />
        </div>

        <div className="input-group">
          <label htmlFor="product-price">Price</label>
          <input
            onChange={(e) => setPrice(e.target.value)}
            type="text"
            id="product-price"
            value={price}
            aria-label="Product Price"
          />
        </div>

        <div className="input-group">
          <label htmlFor="product-quantity">Quantity</label>
          <input
            onChange={(e) => setQty(e.target.value)}
            type="number"
            id="product-quantity"
            value={quantity}
            aria-label="Product Quantity"
          />
        </div>

        <div className="actions form-actions">
          <button type="submit">Update</button>
          <button type="button" onClick={resetForm}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProductForm;
