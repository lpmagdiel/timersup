import { useState } from 'react'
import './App.css'
import { DateInformation, NavigationBar, TaskList } from './components'

const App = () => {
  const windowHeight = window.innerHeight;
  return (
    <div className="App" style={{ height: windowHeight }}>
      <h1 className='title-app'>Timers<span className='color-orange'>Up</span></h1>
      <DateInformation />
      <NavigationBar/>
      <TaskList/>
    </div>
  )
}
export default App;