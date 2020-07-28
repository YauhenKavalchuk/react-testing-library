import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("App", () => {
  test("renders App component", async () => {
    render(<App />);
    await screen.findByText(/Logged in as/);
    expect(screen.queryByText(/Searches for JavaScript/)).toBeNull();
    // fireEvent.change(screen.getByRole("textbox"), {
    //   target: { value: "React" },
    // });
    userEvent.type(screen.getByRole("textbox"), "React");
    expect(screen.getByText(/Searches for React/)).toBeInTheDocument();
  });
});

describe("events", () => {
  it("checkbox click", () => {
    const { container } = render(<input type="checkbox" />);
    const checkbox = container.firstChild;
    expect(checkbox).not.toBeChecked();
    // fireEvent.click(checkbox);
    userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it("double click", () => {
    const onChange = jest.fn();
    const { container } = render(<input type="checkbox" onChange={onChange} />);
    const checkbox = container.firstChild;
    userEvent.dblClick(checkbox);
    expect(onChange).toHaveBeenCalledTimes(2);
  });

  it("tab", () => {
    const { getAllByTestId } = render(
      <div>
        <input data-testid="element" type="checkbox" />
        <input data-testid="element" type="radio" />
        <input data-testid="element" type="number" />
      </div>
    );
    const [checkbox, radio, number] = getAllByTestId("element");
    userEvent.tab();
    expect(checkbox).toHaveFocus();
    userEvent.tab();
    expect(radio).toHaveFocus();
    userEvent.tab();
    expect(number).toHaveFocus();
  });

  it("select", () => {
    const { selectOptions, getByRole, getByText } = render(
      <select>
        <option value="1">A</option>
        <option value="2">B</option>
        <option value="3">C</option>
      </select>
    );

    userEvent.selectOptions(getByRole("combobox"), "1");
    expect(getByText("A").selected).toBeTruthy();
    userEvent.selectOptions(getByRole("combobox"), "2");
    expect(getByText("B").selected).toBeTruthy();
    expect(getByText("A").selected).toBeFalsy();
  });
});
