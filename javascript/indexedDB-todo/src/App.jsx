import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
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
