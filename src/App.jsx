import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';

function App() {
  let [points, setPoints] = useState([]);
  let [lastDeleted, setLastDeleted] = useState([]);
  function addPoint(e) {
    e.preventDefault();
    setPoints([
      ...points,
      {
        x: e.clientX,
        y: e.clientY,
      },
    ]);
    setLastDeleted([]);
  }
  function undo(e) {
    e.stopPropagation();
    let newPoint = points.pop();

    setPoints([...points]);
    setLastDeleted((prev) => {
      return [...prev, newPoint];
    });
  }
  function redo(e) {
    e.stopPropagation();
    let newPoint = lastDeleted.pop();

    setPoints([...points, newPoint]);
    setLastDeleted([...lastDeleted]);
  }
  function clear(e) {
    e.stopPropagation();
    setPoints([]);
    setLastDeleted([]);
  }
  return (
    <div className="App" onClick={addPoint}>
      <button disabled={points.length == 0} className="btn" onClick={undo}>
        Undo
      </button>
      <button disabled={lastDeleted.length == 0} className="btn" onClick={redo}>
        Redo
      </button>
      <button onClick={clear}>Clear</button>
      {points.map((point, i) => (
        <div className="point" style={{ top: point.y, left: point.x }} />
      ))}
    </div>
  );
}

export default App;
