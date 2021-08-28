import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "../index";

const component = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

test("to check if it matches snapshot", () => {
  const { asFragment } = render(component);
  expect(asFragment(component)).toMatchSnapshot();
});

test("to check if admin console renders", () => {
  render(component);
  fireEvent.click(screen.getByTestId("adminLink"));
  expect(screen.getByText("Inventory")).toBeInTheDocument();
});

test("to check if home screen renders", () => {
  render(component);
  fireEvent.click(screen.getByTestId("adminLink"));
  fireEvent.click(screen.getByTestId("homeLink"));

  expect(screen.getByText("Welcome to")).toBeInTheDocument();
  expect(screen.getAllByText("ShopBridge")[0]).toBeInTheDocument();
  expect(screen.getAllByText("ShopBridge")[1]).toBeInTheDocument();
});
