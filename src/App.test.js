import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

/*
Search variants:

  getBy:                    queryby:                    findBy:

- getByText               - queryByText               - findByText
- getByRole               - queryByRole               - findByRole
- getByLabelText          - queryByLabelText          - findByLabelText
- getByPlaceholderText    - queryByPlaceholderText    - findByPlaceholderText
- getByAltText            - queryByAltText            - findByAltText
- getByDisplayValue       - queryByDisplayValue       - findByDisplayValue
- getAllBy                - queryAllBy                - findAllBy
*/

/*
Assertive Functions:

- toBeDisabled            - toBeEnabled               - toBeEmpty
- toBeEmptyDOMElement     - toBeInTheDocument         - toBeInvalid
- toBeRequired            - toBeValid                 - toBeVisible
- toContainElement        - toContainHTML             - toHaveAttribute
- toHaveClass             - toHaveFocus               - toHaveFormValues
- toHaveStyle             - toHaveTextContent         - toHaveValue
- toHaveDisplayValue      - toBeChecked               - toBePartiallyChecked
- toHaveDescription
*/

describe("App", () => {
  it("renders App component", async () => {
    render(<App />);
    // expect(screen.queryByText(/Searches for JavaScript/)).toBeNull();
    expect(screen.queryByText(/Logged in as/)).toBeNull();
    screen.debug();
    expect(await screen.findByText(/Logged in as/)).toBeInTheDocument();
    screen.debug();
    // Assertive Functions Examples:
    expect(screen.getByAltText(/search image/)).toHaveClass("image");
    expect(screen.getByLabelText(/search/i)).not.toBeRequired();
    expect(screen.getByLabelText(/search/i)).toBeEmpty();
    expect(screen.getByLabelText(/search/i)).toHaveAttribute("id");
  });
});
