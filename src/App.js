import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

const getUser = () => Promise.resolve({ id: 1, name: "Yauhen" });

const Search = ({ value, onChange, children }) => (
  <div>
    <label htmlFor="search">{children}</label>
    <input
      placeholder="search text..."
      id="search"
      type="text"
      value={value}
      onChange={onChange}
      // required
    />
  </div>
);

const App = () => {
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const user = await getUser();
      setUser(user);
    };

    loadUser();
  }, []);

  const handleChange = ({ target }) => {
    setSearch(target.value);
  };

  return (
    <div>
      {user && <h2>Logged in as {user.name}</h2>}
      <img className="image" src="" alt="search image" />
      <Search value={search} onChange={handleChange}>
        SEARCH:
      </Search>
      <p>Searches for {search ? search : "..."}</p>
    </div>
  );
};

export default App;
