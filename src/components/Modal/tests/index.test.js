import { render } from "@testing-library/react";
import Modal from "../index";

jest.mock("react-router-dom", () => ({
  useLocation: () => ({
    pathname: "/admin",
  }),
}));

const props = {
  show: true,
  handleClose: jest.fn(),
  handleAdd: jest.fn(),
  handleUpdate: jest.fn(),
  modalType: "add",
  itemToUpdate: null,
};

test("to check if it matches the snapshot", () => {
  const { asFragment } = render(<Modal {...props} />);
  expect(asFragment(<Modal {...props} />)).toMatchSnapshot();
});
