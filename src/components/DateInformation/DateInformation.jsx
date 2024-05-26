import { useEffect, useState } from 'react';
import "./style.css";

export const DateInformation = () => {
  const date = new Date();
  const actualMonth = date.getMonth() + 1;
  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  return (
    <header className='date-information'>
      <div className="date-information-tag">Hoy</div>
      <h1>{date.getDate()}</h1><span> de {months[actualMonth]}, {date.getFullYear()}</span>
    </header>
  );
};