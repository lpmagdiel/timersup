import { useState } from 'react';
import { GridFill , PlusSquareFill, PieChartFill, CalculatorFill, HourglassSplit} from 'react-bootstrap-icons';

import './style.css';

export const NavigationBar = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <nav className='navigation-bar'>
      <button onClick={() => handleTabClick(0)}>
        <GridFill color={`${activeTab === 0 ? '#ff4500' : '#f0f0f0'}`} size={28} />
      </button>
      <button onClick={() => handleTabClick(1)}>
        <PlusSquareFill color={`${activeTab === 1 ? '#ff4500' : '#f0f0f0'}`} size={28} />
      </button>
      <button onClick={() => handleTabClick(2)}>
        <PieChartFill color={`${activeTab === 2 ? '#ff4500' : '#f0f0f0'}`} size={28} />
      </button>
      <button onClick={() => handleTabClick(3)}>
        <CalculatorFill color={`${activeTab === 3 ? '#ff4500' : '#f0f0f0'}`} size={28} />
      </button>
      <button onClick={() => handleTabClick(4)}>
        <HourglassSplit color={`${activeTab === 4 ? '#ff4500' : '#f0f0f0'}`} size={28} />
      </button>
    </nav>
  );
};
