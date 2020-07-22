import React, { useState } from "react";
import axios from "axios";

const URL = "http://hn.algolia.com/api/v1/search";

const App = () => {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);

  const handleFetch = async () => {
    try {
      const result = await axios.get(`${URL}?query=React`);
      setNews(result.data.hits);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div>
      <button type="button" onClick={handleFetch}>
        Fetch News
      </button>

      {error && <span>Something went wrong ...</span>}

      <ul>
        {news.map(({ objectID, url, title }) => (
          <li key={objectID}>
            <a href={url}>{title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
