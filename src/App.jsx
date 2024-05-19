import { useState } from 'react'
import './App.css'
import { DateInformation, NavigationBar } from './components'

const App = () => {
  const windowHeight = window.innerHeight;
  return (
    <div className="App" style={{ height: windowHeight }}>
      <h1 className='title-app'>TimersUp</h1>
      <DateInformation />
      <NavigationBar/>
    </div>
  )
}
export default App;