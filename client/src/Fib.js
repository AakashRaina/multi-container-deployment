import React, { useState, useEffect } from "react";
import axios from "axios";

const Fib = () => {
  const [values, setvalues] = useState({});
  const [index, setindex] = useState("");
  const [seenIndexes, setseenIndexes] = useState([]);

  const fetchValues = async () => {
    const values = await axios.get("/api/values/current");
    setvalues(values.data);
  };

  const fetchIndexes = async () => {
    const seenIndexes = await axios.get("/api/values/all");
    setseenIndexes(seenIndexes.data);
  };

  useEffect(() => {
    fetchValues();
    fetchIndexes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/api/values", {
      index: index,
    });
    setindex("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter your index</label>
        <input value={index} onChange={(e) => setindex(e.target.value)} />
        <button>Submit</button>
      </form>

      <h3>Indexes I have seen</h3>
      {seenIndexes
        .map(({ number }) => {
          return number;
        })
        .join(", ")}

      <h3>Calculated Values:</h3>
      {Object.keys(values).map((key) => {
        return (
          <div key={key}>
            For index {key} I calculated {values[key]}{" "}
          </div>
        );
      })}
    </div>
  );
};

export default Fib;
