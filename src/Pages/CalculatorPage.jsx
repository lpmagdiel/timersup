import { useState, useEffect } from 'react';
import { ButtonNumber } from '../components';
import { getTimers } from '../data/storage';
import { convertSeconds } from '../helpers';

export const CalculatorPage = () => {
  const [ hourPrice, setHourPrice ] = useState(10);
  const [ days, setDays ] = useState(8);
  const [ hours, setHours ] = useState(0);
  const [ totals, setTotals ] = useState(0);
  const timers = getTimers();

  useEffect(()=>{
    const totaltime = timers.map( t => t.time).reduce((t,c)=> t+c, 0);
    const time =  convertSeconds(totaltime);
    const minutesPercent = (time.minutes/60).toFixed(2);
    setHours(time.hours + minutesPercent);
    setTotals( (hours * hourPrice).toFixed(2) );
  },[days,hourPrice]);
  return (
    <div className='calculator-page page'>
      <div className="grid-2cols">
        <div className="flex-start">
          <h3>Precio por hora:</h3>
        </div>
        <div className="flex-end">
          <ButtonNumber defaultValue={hourPrice} onChange={value => setHourPrice(value)}/>
        </div>
      </div>
      <div className="space"></div>
      <div className="grid-2cols">
        <div className="flex-start">
          <h3>Últimos días</h3>
        </div>
        <div className="flex-end">
        <ButtonNumber defaultValue={days} onChange={value => setDays(value)} />
        </div>
      </div>
      <div className="space"></div>
      <div className="grid-2cols tag-orange">
        <h3 className="color-white">Horas: {hours}</h3>
        <h3 className='color-white flex-end'>Total: {totals} €</h3>
      </div>
    </div>
  );
};
