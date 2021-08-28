import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import Dashboard from "../index";

const component = <Dashboard />;

test("to check if it matches snapshot", () => {
  const { asFragment } = render(component);
  expect(asFragment(component)).toMatchSnapshot();
});

test("to check if items get loaded", async () => {
  render(component);
  await waitFor(() =>
    expect(screen.getByTestId("itemsTable")).toBeInTheDocument()
  );
});

test("to check if modal closes", async () => {
  render(component);

  fireEvent.click(await screen.findByTestId("addItemBtn"));
  const modal = await screen.findByTestId("modal");
  await waitFor(() => {
    expect(modal).toBeInTheDocument();
    expect(screen.getByTestId("cancelBtn")).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("cancelBtn"));
  });

  await waitFor(() => {
    expect(modal).not.toBeInTheDocument();
  });
});

test("to check if item can be added", async () => {
  render(component);
  fireEvent.click(await screen.findByTestId("addItemBtn"));

  await waitFor(() => {
    expect(screen.getByTestId("modal")).toBeInTheDocument();

    const itemIDInput = screen.getByTestId("itemID");
    fireEvent.change(itemIDInput, { target: { value: "100" } });
    expect(itemIDInput.value).toBe("100");

    const itemNameInput = screen.getByTestId("itemName");
    fireEvent.change(itemNameInput, { target: { value: "Name" } });
    expect(itemNameInput.value).toBe("Name");

    const itemDescInput = screen.getByTestId("itemDesc");
    fireEvent.change(itemDescInput, { target: { value: "Desc" } });
    expect(itemDescInput.value).toBe("Desc");

    const itemPriceInput = screen.getByTestId("itemPrice");
    fireEvent.change(itemPriceInput, { target: { value: "12" } });
    expect(itemPriceInput.value).toBe("12");

    const itemQuantityInput = screen.getByTestId("itemQuantity");
    fireEvent.change(itemQuantityInput, { target: { value: "100" } });
    expect(itemQuantityInput.value).toBe("100");

    fireEvent.click(screen.getByTestId("applyBtn"));
  });
});

test("to check if item can be updated", async () => {
  render(component);

  const element = await screen.findByTestId("updateBtn_100");
  expect(element).toBeInTheDocument();
  fireEvent.click(element);

  await waitFor(() => {
    expect(screen.getByTestId("modal")).toBeInTheDocument();

    const itemQuantityInput = screen.getByTestId("itemQuantity");
    fireEvent.change(itemQuantityInput, { target: { value: "200" } });
    expect(itemQuantityInput.value).toBe("200");

    fireEvent.click(screen.getByTestId("applyBtn"));
  });

  await waitFor(() => {
    const updatedElement = screen.getByTestId("quantity_100");
    expect(updatedElement.innerHTML).toBe("200");
  });
});

test("to check if item can be deleted", async () => {
  render(component);

  const element = await screen.findByTestId("deleteBtn_100");
  expect(element).toBeInTheDocument();
  fireEvent.click(element);
  await waitFor(() => {
    expect(element).not.toBeInTheDocument();
  });
});
