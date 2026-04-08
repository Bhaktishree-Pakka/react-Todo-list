import { useState } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [fruits, setFruits] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [filter, setFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(false);

  function addItems() {
    if (text.trim() === "") return;
    setFruits([...fruits, { text: text, completed: false }]);
    setText("");
  }

  function deleteItem(deleteIndex) {
    setFruits(fruits.filter((_, index) => index !== deleteIndex));
  }

  function toggleCompleted(index) {
    const updated = fruits.map((fruit, i) =>
      i === index ? { ...fruit, completed: !fruit.completed } : fruit
    );
    setFruits(updated);
  }

  const filteredFruits = fruits.filter((fruit) => {
    if (filter === "completed") return fruit.completed;
    if (filter === "pending") return !fruit.completed;
    return true;
  });

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <div className="container">
        
        <div className="top-bar">
          <h2>Smart Task Manager</h2>
          <button
  className="theme-toggle"
  onClick={() => setDarkMode(!darkMode)}
>
  {darkMode ? "Light Mode" : "Dark Mode"}
</button>
        </div>

        <div className="input-box">
          <input
            onChange={(e) => setText(e.target.value)}
            value={text}
            placeholder="Enter Item..."
          />
          <button onClick={addItems}>Add</button>
        </div>

        <div className="filter-buttons">
          <button onClick={() => setFilter("all")}>All</button>
          <button onClick={() => setFilter("completed")}>Completed</button>
          <button onClick={() => setFilter("pending")}>Pending</button>
        </div>

        <ul>
          {filteredFruits.map((fruit, index) => (
            <li key={index}>
              {index === editIndex ? (
                <>
                  <input
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                  />
                  <button
                    onClick={() => {
                      const updated = fruits.map((item, i) =>
                        i === editIndex ? { ...item, text: editValue } : item
                      );
                      setFruits(updated);
                      setEditIndex(null);
                    }}
                  >
                    Save
                  </button>
                  <button onClick={() => setEditIndex(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <span
                    onClick={() => toggleCompleted(index)}
                    className={fruit.completed ? "completed" : ""}
                  >
                    {fruit.text}
                  </span>

                  <div className="actions">
                    <button
                      className="edit"
                      onClick={() => {
                        setEditIndex(index);
                        setEditValue(fruit.text);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="delete"
                      onClick={() => deleteItem(index)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;