import { ClockFill } from "react-bootstrap-icons";
import { useState } from "react";
import { updateTimer, getTimer } from "../../data/storage";
import { getNow } from "../../helpers";
import './style.css';

export const TaskIcon = ({ id }) => {
    const [isActive, setIsActive] = useState(false);
    const [sessionTime, setSessionTime] = useState("Inactivo");
    const timerData = getTimer(id);

    const handleClick = () => {
        if (isActive) {
            const {startTime, time} = getTimer(id);
            const nt = getNow() - startTime;
            updateTimer({...timerData, time:nt+time});
            setSessionTime("inactivo");
            setIsActive(false);
        }
        else {
            const nt = { ...timerData, startTime: getNow() };
            setSessionTime("Activo");
            updateTimer(nt);
            setIsActive(true);
        }
    };

    return (
        <div className="task-icon" onClick={handleClick}>
            <div className="task-icon-activity">
                <div className={`task-icon-icon ${isActive ? 'task-icon-active' : ''}`}>
                    <ClockFill color="#fff" size={22} />
                </div>
                <p><span className={`${isActive ? "tag-orange transition-effect" : "transition-effect"}`}> {sessionTime}</span></p>
            </div>
            <div className="task-icon-content">
                <p><b>{timerData.name}</b></p>
                <p><small>{timerData.description}</small></p>

            </div>
        </div >
    );
}