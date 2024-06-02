import { useState } from "react";
import { Calendar2WeekFill, ChatSquareTextFill, GeoAltFill } from "react-bootstrap-icons";
import "../styles/addPage.css";
import { InputText, BasicButton, TransparentButton } from "../components";
import { TimerStructure } from "../data/structure";
import { getRandomChars } from "../helpers/random";
import { addTimer } from "../data/storage";

export const TaskPage = () => {
}

export const AddPage = () => {
  const [activeBtn, setActiveBtn] = useState(0);
// Suggested code may be subject to a license. Learn more: ~LicenseLog:3780142136.
  const [ UbicationText, setUbicationText ] = useState('Ubicación');
  const [ taskTitle, setTaskTitle ] = useState('');
  const [ taskDescription, setTaskDescription ] = useState('');
  const [ taskDate, setTaskDate ] = useState('');
  const [ taskTime, setTaskTime ] = useState('');
  const [ taskLocation, setTaskLocation ] = useState('');
  const infoTask = ['Tareas del dia a dia que contienen la misma información básica, solo necesitas crearla una vez.', 'Tareas que se realizan una vez o son mas detalladas.'];
  const handleActiveBtn = (index) => {
    setActiveBtn(index);
  }
  const createTask = () => {
    const task = TimerStructure;
    task.id = `${getRandomChars(4)}${Date.now()}`;
    task.type = activeBtn === 0 ? 'recurring' : 'unique';
    if(task.name.length < 3) {
      return alert('El nombre de la tarea es muy corto');
    }
    task.name = taskTitle;
    task.description = taskDescription;
    if (activeBtn === 1) {
      task.date = taskDate;
      task.time = taskTime;
      task.location = taskLocation;
    }
    console.log(task);
    addTimer(task);
  }
  const getLocation = () => {
    setUbicationText('Obteniendo ubicación...');
    navigator.geolocation.getCurrentPosition(function(position) {
      setUbicationText('Listo!');
      setTaskLocation(`${position.coords.latitude},${position.coords.longitude}`);
    });
  }
  return <div className="page">
    <div className="grid-2cols">
      <div className={`task-box-btn ${activeBtn === 0 ? 'active-btn' : ''}`} onClick={e => handleActiveBtn(0)}>
        <Calendar2WeekFill size={32} fill={`${activeBtn === 0 ? '#ff4500' : '#CCCCCC'}`} />
        <small><b>Tarea recurrente</b></small>
      </div>
      <div className={`task-box-btn ${activeBtn === 1 ? 'active-btn' : ''}`} onClick={e => handleActiveBtn(1)}>
        <ChatSquareTextFill size={32} fill={`${activeBtn === 1 ? '#ff4500' : '#CCCCCC'}`} />
        <small><b>Tarea única</b></small>
      </div>
    </div>
    <div className="space"></div>
    <p><small><i>* {activeBtn === 0 ? infoTask[0] : infoTask[1]}</i></small></p>
    <div className="space"></div>
    <InputText placeHolder="Tarea" onChange={e => setTaskTitle(e.target.value)}/>
    <div className="space"></div>
    <InputText placeHolder="Descripción (opcional)" onChange={e => setTaskDescription(e.target.value)}/>
    <div className="space"></div>
    {
      activeBtn === 1 && (
        <>
          <div className="grid-2cols">
            <InputText placeHolder="Hora de inicio" />
            <InputText placeHolder="Hora de finalización" />
          </div>
          <div className="space"></div>
          <div className="grid-2cols">
            <InputText placeHolder="Fecha" />
            <TransparentButton onClick={getLocation}>
              <>
              <GeoAltFill fill="#ff4500" />&nbsp;
                {UbicationText}
              </>
            </TransparentButton>
          </div>
        </>
      )
    }
    <div className="space"></div>
    <div className="center">
      <BasicButton onClick={createTask}>
      CREAR TAREA
      </BasicButton>
    </div>
  </div>;
};