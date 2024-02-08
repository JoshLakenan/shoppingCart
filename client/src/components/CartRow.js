const CartRow = ({ title, price, quantity }) => {
  return (
    <tr>
      <td>{title}</td>
      <td>{quantity}</td>
      <td>${price}</td>
    </tr>
  );
};

export default CartRow;
