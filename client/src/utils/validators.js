export const validForm = (title, price, quantity) => {
  if (title.trim() === "") {
    alert("Please enter a title");
    return;
  }

  if (!/^\d+(\.\d{1,2})?$/.test(price)) {
    alert("Please enter a valid price format (e.g. 10.99)");
    return;
  }

  if (!Number.isInteger(Number(quantity)) || Number(quantity) <= 0) {
    alert("Please enter a positive integer for quantity");
    return;
  }

  return true;
};
