import React, { useState } from "react";
import "./App.css";

import { useQuery, gql } from "@apollo/client";
const COUNTRY = gql`
  query Country($code: ID!) {
    country(code: $code) {
      name
      emoji
      nameWithEmoji @client
      languages {
        name
        rtl
      }
    }
  }
`;

function App() {
  const [code, setCode] = useState("");
  const { data, loading, error } = useQuery(COUNTRY, {
    variables: { code },
    skip: code.length !== 2,
  });
  console.log(data);

  const handleChange = (e) => {
    setCode(e.target.value);
  };

  return (
    <div className="App">
      {error && <h1>{`YOU BROKE IT  ${error.message}`}</h1>}
      {!data || loading ? (
        <h1>Loading...</h1>
      ) : (
        <h1>
          {/* {data.country?.name}
          {data.country?.emoji} */}
          {data.country?.nameWithEmoji}
          {data.country?.languages.map((e) => e.name)}
        </h1>
      )}

      <input type="text" value={code} onChange={handleChange}></input>
    </div>
  );
}

export default App;
