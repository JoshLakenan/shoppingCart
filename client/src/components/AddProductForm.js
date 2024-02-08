import { useState } from "react";

const AddProductForm = ({ onAddProduct }) => {
  const [formVisible, setFormVisible] = useState(false);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQty] = useState("");

  const handleFormVisibleClick = () => {
    setFormVisible((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = { title, price, quantity };
    onAddProduct(newProduct, resetForm);
  };

  const resetForm = () => {
    setTitle("");
    setPrice("");
    setQty("");
    setFormVisible((prev) => !prev);
  };

  return (
    <div className="add-form">
      <p>
        <button onClick={handleFormVisibleClick} className="add-product-button">
          Add a Product
        </button>
      </p>
      {formVisible && (
        <>
          <h3>Add Product</h3>
          <form>
            <div className="input-group">
              <label htmlFor="product-name">Product Name:</label>
              <input
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                id="product-name"
                name="product-name"
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="product-price">Price:</label>
              <input
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                id="product-price"
                name="product-price"
                min="0"
                step="0.01"
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="product-quantity">Quantity:</label>
              <input
                onChange={(e) => setQty(e.target.value)}
                type="number"
                id="product-quantity"
                name="product-quantity"
                min="0"
                required
              />
            </div>
            <div className="actions form-actions">
              <button onClick={handleSubmit} type="submit">
                Add
              </button>
              <button onClick={handleFormVisibleClick} type="button">
                Cancel
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default AddProductForm;
