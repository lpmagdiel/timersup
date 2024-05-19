import React from 'react';

import './style.css';

export const NavigationBar = () => {
  return (
    <nav className='navigation-bar'>
      <button>
        <img src="./apps.png" alt="Lista de tareas" />
      </button>
      <button>
        <img src="./more.png" alt="Agregar tarea" />
      </button>
      <button>
        <img src="./stats.png" alt="Lista de tareas" />
      </button>
    </nav>
  );
};
