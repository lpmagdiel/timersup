import React from 'react';
import { ButtonNumber } from '../components';

export const CalculatorPage = () => {
  return (
    <div className='calculator-page page'>
      <div className="grid-2cols">
        <div className="center">
          <h3>Precio por hora:</h3>
        </div>
        <div className="center">
          <ButtonNumber defaultValue={10} />
        </div>
      </div>
    </div>
  );
};
