import { useState } from 'react'
import './App.css'
import DateInformation from './components'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <h1>TimersUp</h1>
    <DateInformation/>
    </>
  )
}

export default App
