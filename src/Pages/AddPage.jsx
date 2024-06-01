import { useState } from "react";
import { Calendar2WeekFill, ChatSquareTextFill, GeoAltFill } from "react-bootstrap-icons";
import "../styles/addPage.css";
import { InputText, BasicButton, TransparentButton } from "../components";

export const AddPage = () => {
  const [activeBtn, setActiveBtn] = useState(0);
  const infoTask = ['Tareas del dia a dia que contienen la misma información básica, solo necesitas crearla una vez.', 'Tareas que se realizan una vez o son mas detalladas.'];
  const handleActiveBtn = (index) => {
    setActiveBtn(index);
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
    <InputText placeHolder="Tarea" />
    <div className="space"></div>
    <InputText placeHolder="Descripción (opcional)" />
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
            <TransparentButton>
              <>
              <GeoAltFill fill="#ff4500" />&nbsp;
                Ubicación
              </>
            </TransparentButton>
          </div>
        </>
      )
    }
    <div className="space"></div>
    <div className="center">
      <BasicButton>
      CREAR TAREA
      </BasicButton>
    </div>
  </div>;
};