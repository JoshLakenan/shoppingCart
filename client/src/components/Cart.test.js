/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import { getCartItems } from "../services/cart";
import userEvent from "@testing-library/user-event";
import App from "./App";

jest.mock("../services/cart.js");

afterEach(() => {
  jest.resetAllMocks();
});

const mockCart = [
  {
    _id: "545454f72092473d55a809e1",
    title: "Kindle",
    price: 50,
    quantity: 1,
    productId: "61d754d72092473d55a809e1",
    createdAt: "2020-10-04T05:57:02.777Z",
    updatedAt: "2020-10-04T05:57:02.777Z",
    _v: 0,
  },
  {
    _id: "545454f72092473d55a809e2",
    title: "Axel",
    price: 20.99,
    quantity: 1,
    productId: "61d754d72092473d55a809e2",
    createdAt: "2020-10-04T05:57:02.777Z",
    updatedAt: "2020-10-04T05:57:02.777Z",
    _v: 0,
  },
];

test("Screen shows cart items", async () => {
  // getProducts.mockResolvedValue(mockProducts);
  getCartItems.mockResolvedValue(mockCart);
  render(<App />);

  const cartItemTitle = await screen.findByRole("cell", {
    name: /kindle/i,
  });

  expect(cartItemTitle).toBeInTheDocument();
});
