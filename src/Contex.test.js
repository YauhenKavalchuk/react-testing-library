import React, { useState, useContext, createContext } from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, toggleLoginStatus] = useState(false);

  const toggleLogin = () => {
    toggleLoginStatus(!isLoggedIn);
  };

  return (
    <AuthContext.Provider value={{ toggleLogin, isLoggedIn }}>
      <div>Message: {children}</div>
    </AuthContext.Provider>
  );
};

const ConsumerComponent = () => {
  const { isLoggedIn, toggleLogin } = useContext(AuthContext);

  return (
    <>
      <input type="button" value="Login" onClick={toggleLogin} />
      {isLoggedIn ? "Welcome!" : "Please, log in"}
    </>
  );
};

describe("Context", () => {
  it("ConsumerComponent shows default value", () => {
    const { getByText } = render(
      <AuthProvider>
        <ConsumerComponent />
      </AuthProvider>
    );
    expect(getByText(/^Message:/)).toHaveTextContent("Message: Please, log in");
  });

  it("ConsumerComponent toggle value", () => {
    const { getByText, getByRole } = render(
      <AuthProvider>
        <ConsumerComponent />
      </AuthProvider>
    );
    expect(getByText(/^Message:/)).toHaveTextContent("Message: Please, log in");
    userEvent.click(getByRole("button"));
    expect(getByText(/^Message:/)).toHaveTextContent("Message: Welcome!");
    userEvent.click(getByRole("button"));
    expect(getByText(/^Message:/)).toHaveTextContent("Message: Please, log in");
  });
});
