import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
 import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
         <div  className="bg-amber-400 shadow rounded-xl p-8 space-y-4 border">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold underline">Group: test</h2>
            <h2 className="text-xl font-semibold underline">Group: test</h2>
          </div>
          </div>
    </>
  )
}

export default App
