import Cart from "./Cart";

const Header = ({ cartItems, onCheckout }) => {
  return (
    <header>
      <h1>The Shop!</h1>
      <Cart cartItems={cartItems} onCheckout={onCheckout} />
    </header>
  );
};

export default Header;
