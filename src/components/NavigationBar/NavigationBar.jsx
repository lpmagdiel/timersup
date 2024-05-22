import React from 'react';
import { GridFill , PlusSquareFill, PieChartFill, CalculatorFill, HourglassSplit} from 'react-bootstrap-icons';

import './style.css';

export const NavigationBar = () => {
  return (
    <nav className='navigation-bar'>
      <button>
        <GridFill color="#f0f0f0" size={28} />
      </button>
      <button>
        <PlusSquareFill color="#f0f0f0" size={28} />
      </button>
      <button>
        <PieChartFill color="#f0f0f0" size={28} />
      </button>
      <button>
        <CalculatorFill color="#f0f0f0" size={28} />
      </button>
      <button>
        <HourglassSplit color="#f0f0f0" size={28} />
      </button>
    </nav>
  );
};
