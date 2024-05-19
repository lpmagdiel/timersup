import React from 'react';
import "./style.css";

export const DateInformation = () => {
    const date = new Date();
  return (
    <header className='date-information'>
      <h1>{date.getDate()}</h1>
    </header>
  );
};