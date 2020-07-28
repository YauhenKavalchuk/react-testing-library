import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  test("renders App component", async () => {
    render(<App />);
    await screen.findByText(/Logged in as/);
    expect(screen.queryByText(/Searches for JavaScript/)).toBeNull();
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "React" },
    });
    expect(screen.getByText(/Searches for React/)).toBeInTheDocument();
  });
});

describe("events", () => {
  it("checkbox click", () => {
    const handleChange = jest.fn();
    const { container } = render(
      <input type="checkbox" onChange={handleChange} />
    );
    const checkbox = container.firstChild;
    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(checkbox).toBeChecked();
  });

  it("input focus", () => {
    const { getByTestId } = render(
      <input data-testid="simple-input" type="text" />
    );
    const input = getByTestId("simple-input");
    expect(input).not.toHaveFocus();
    input.focus();
    expect(input).toHaveFocus();
  });
});
