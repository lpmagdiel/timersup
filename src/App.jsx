import { useState } from 'react'
import './App.css'
import { DateInformation, NavigationBar } from './components'

const App = () => {

  return (
    <>
      <h1>TimersUp</h1>
      <DateInformation />
      <NavigationBar/>
    </>
  )
}
export default App;