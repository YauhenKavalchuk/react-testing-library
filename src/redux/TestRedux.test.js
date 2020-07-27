import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { reducer } from "./reducer";
import TestRedux from "./TestRedux";

const renderWithRedux = (
  component,
  { initialState, store = createStore(reducer, initialState) } = {}
) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
};

describe("Redux testing", () => {
  it("checks initial state is equal to 0", () => {
    const { getByRole } = renderWithRedux(<TestRedux />);
    expect(getByRole("heading")).toHaveTextContent("0");
  });

  it("increments the counter through redux", () => {
    const { getByRole, getByText } = renderWithRedux(<TestRedux />, {
      initialState: { count: 5 },
    });
    userEvent.click(getByText("+1"));
    expect(getByRole("heading")).toHaveTextContent("6");
  });

  it("decrements the counter through redux", () => {
    const { getByRole, getByText } = renderWithRedux(<TestRedux />, {
      initialState: { count: 100 },
    });
    userEvent.click(getByText("-1"));
    expect(getByRole("heading")).toHaveTextContent("99");
  });
});
