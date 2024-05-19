import { useEffect, useState } from 'react';
import "./style.css";

export const DateInformation = () => {
  const date = new Date();
  const actualMonth = date.getMonth() + 1;
  const [weather, setWeather] = useState("0°C");
  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  const successGeo = (position) => {
    const URL_WEATHER = `https://api.open-meteo.com/v1/forecast?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&current=temperature_2m`;
    setWeather("?°C");
    fetch(URL_WEATHER)
      .then(response => response.json())
      .then(data => {
        const temperature = data.current.temperature_2m+data.current_units.temperature_2m;
        setWeather(temperature);
      })
  }
  const errorGeo = () => {
    setWeather("No lo se 😅");
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(successGeo, errorGeo);
  }, [])
  return (
    <header className='date-information'>
      <div className="date-information-tag">Hoy</div>
      <h1>{date.getDate()}</h1><span> de {months[actualMonth]}, {date.getFullYear()}</span>
      <p>La temperatura es de: <b>{weather}</b></p>
    </header>
  );
};