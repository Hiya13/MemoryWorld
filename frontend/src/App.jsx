import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [text, setText] = useState("");
  const [entries, setEntries] = useState([]);

  const fetchEntries = async () => {
    const res = await axios.get("http://localhost:5000/diary");
    setEntries(res.data);
  };

  const handleSubmit = async () => {
    if (!text) return;

    await axios.post("http://localhost:5000/diary", { text });

    setText("");
    fetchEntries();
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Memory World</h1>

      <textarea
        placeholder="Write your memory..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ width: "300px", height: "100px" }}
      />

      <br />
      <button onClick={handleSubmit}>Save Memory</button>

      <h2>Memories</h2>

      {entries.map((entry) => (
        <div key={entry._id} style={{ marginBottom: "20px" }}>
          <p><b>Text:</b> {entry.text}</p>
          <p><b>Scene:</b> {JSON.stringify(entry.scene)}</p>
        </div>
      ))}
    </div>
  );
}

export default App;