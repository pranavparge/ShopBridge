import { render } from "@testing-library/react";
import Brand from "../index";

test("to check if it matches the snapshot", () => {
  const { asFragment } = render(<Brand />);
  expect(asFragment(<Brand />)).toMatchSnapshot();
});
