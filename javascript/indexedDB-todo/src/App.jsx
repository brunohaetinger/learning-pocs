import { useState } from 'react'
import './App.css'

function App() {
  const [clicks, setClicks] = useState([])

  return (
    <>
      <h1>Clicked At list:</h1>
      <div className="card">
        <button onClick={() => setClicks((count) => [...clicks, `Clicked at ${new Date().toISOString()}`])} style={{ backgroundColor: "blue" }}>
          Add click to list
        </button>
        <button onClick={() => setCount(() => setClicks([]))} style={{ backgroundColor: "red" }}>
          Clear list
        </button>
      </div>
      <ol>
        {
          clicks.map(c => <li>{c}</li>)
        }
      </ol>
    </>
  )
}

export default App
