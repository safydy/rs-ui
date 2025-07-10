import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Card} from "./components/Card/Card";
import {Badge} from "./components/Badge/Badge";
import {Button} from "./components/Button/Button";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
            <span className="text-3xl text-red-50">count is {count}</span>
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
          <Card
              imgSrc="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1099&q=80"
              imgAlt="Smart watch"
              interactive
              bordered
              shadow="md"
          >
              <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-medium">Smart Watch</h3>
                  <Badge variant="primary" pill>New</Badge>
              </div>
              <p className="text-gray-500 mb-4">Advanced health monitoring and notifications</p>
              <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">$199.99</span>
                  <Button size="sm" variant="primary">Add to cart</Button>
              </div>
          </Card>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
