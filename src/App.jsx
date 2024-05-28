import { useState } from 'react';
import { Route, Switch } from "wouter";
import './App.css';
import { DateInformation, NavigationBar } from './components';
import { ResumePage, AddPage, StatusPage, CalculatorPage, TimePage } from './Pages';

const App = () => {
  const windowHeight = window.innerHeight;
  return (
    <div className="App" style={{ height: windowHeight }}>
      <h1 className='title-app'>Timers<span className='color-orange'>Up</span></h1>
      <NavigationBar />
      <Switch>
        <Route path="/" component={ResumePage}/>
        <Route path="/create" component={AddPage}/>
        <Route path="/status" component={StatusPage}/>
        <Route path="/calculator" component={CalculatorPage}/>
        <Route path="/time" component={TimePage}/>
      </Switch>
    </div>
  )
}
export default App;