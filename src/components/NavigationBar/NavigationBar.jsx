import React from 'react';
import { Grid } from 'react-bootstrap-icons';

import './style.css';

export const NavigationBar = () => {
  return (
    <nav className='navigation-bar'>
      <button>
      <Grid color="black" size={30} />
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
