import ProductListing from "./ProductListing";
import AddProductForm from "./AddProductForm";

const Main = ({ products, onAddProduct, onAddToCart, onDelete, onEdit }) => {
  return (
    <main>
      <ProductListing
        products={products}
        onAddToCart={onAddToCart}
        onDelete={onDelete}
        onEdit={onEdit}
      />
      <AddProductForm onAddProduct={onAddProduct} />
    </main>
  );
};

export default Main;
