/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { act } from "react-dom/test-utils"; // Import act from test-utils

import { render, screen } from "@testing-library/react";
import { getProducts } from "../services/product";
import { getCartItems } from "../services/cart";
import userEvent from "@testing-library/user-event";
import App from "./App";

jest.mock("../services/product.js");
jest.mock("../services/cart.js");

const mockProducts = [
  {
    _id: "61d754d72092473d55a809e1",
    title: "Kindle",
    price: 50,
    quantity: 2,
    createdAt: "2020-10-04T05:57:02.777Z",
    updatedAt: "2020-10-04T05:57:02.777Z",
    _v: 0,
  },
  {
    _id: "51d754d72092473333a809e1",
    title: "Mac Mini",
    price: 850,
    quantity: 7,
    createdAt: "2020-10-04T05:57:02.777Z",
    updatedAt: "2020-10-04T05:57:02.777Z",
    _v: 0,
  },
];

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

beforeEach(() => {
  getProducts.mockResolvedValue(mockProducts);
  getCartItems.mockResolvedValue(mockCart);
});

afterEach(() => {
  jest.resetAllMocks();
});

test("Screen shows the products", async () => {
  await act(async () => {
    render(<App />);
  });

  const productTitle = await screen.findByRole("heading", {
    level: 3,
    name: "Kindle",
  });

  expect(productTitle).toBeInTheDocument();
});

test("Screen shows the cart items", async () => {
  await act(async () => {
    render(<App />);
  });

  const productTitle = await screen.findByRole("heading", {
    level: 3,
    name: "Kindle",
  });

  expect(productTitle).toBeInTheDocument();
});

test("Add Product Form appears when 'Add Product' button is clicked", async () => {
  const user = userEvent.setup();

  await act(async () => {
    render(<App />);
  });

  const addProductButton = screen.getByRole("button", {
    name: "Add a Product",
  });

  await user.click(addProductButton);

  const addProductForm = await screen.findByRole("heading", {
    level: 3,
    name: "Add Product",
  });

  expect(addProductForm).toBeInTheDocument();
});
