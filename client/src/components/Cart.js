import CartRow from "./CartRow";

const Cart = ({ cartItems, onCheckout }) => {
  const cartTotal = cartItems.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  const handleCheckout = (e) => {
    e.preventDefault();
    onCheckout();
  };

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <table className="cart-items">
            <thead>
              <tr>
                <th scope="col">Item</th>
                <th scope="col">Quantity</th>
                <th scope="col">Price</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <CartRow
                  key={item._id}
                  title={item.title}
                  quantity={item.quantity}
                  price={item.price}
                />
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3" className="total">
                  Total: ${cartTotal ? cartTotal.toFixed(2) : "0.00"}
                </td>
              </tr>
            </tfoot>
          </table>
          <div className="checkout-button">
            <button className="checkout" onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
