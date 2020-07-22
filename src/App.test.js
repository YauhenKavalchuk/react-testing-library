import React from "react";
import axios from "axios";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

jest.mock("axios");
const hits = [
  { objectID: "1", title: "Angular" },
  { objectID: "2", title: "React" },
];

describe("App", () => {
  it("fetches news from an API", async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: { hits } }));
    render(<App />);
    userEvent.click(screen.getByRole("button"));
    const items = await screen.findAllByRole("listitem");
    expect(items).toHaveLength(2);
    // Additional
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      "http://hn.algolia.com/api/v1/search?query=React"
    );
  });

  it("fetches news from an API and reject", async () => {
    axios.get.mockImplementationOnce(() => Promise.reject(new Error()));
    render(<App />);
    userEvent.click(screen.getByRole("button"));
    const message = await screen.findByText(/Something went wrong/);
    expect(message).toBeInTheDocument();
  });

  it("fetches news from an API (alternative)", async () => {
    const promise = Promise.resolve({ data: { hits } });
    axios.get.mockImplementationOnce(() => promise);
    render(<App />);
    userEvent.click(screen.getByRole('button'));
    await act(() => promise);
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });
});
