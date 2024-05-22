import { ClockFill } from "react-bootstrap-icons";
import { useState } from "react";
import './style.css';

export const TaskIcon = ({ title, date, time }) => {
    const [isActive, setIsActive] = useState(false);


    const handleClick = () => {
        setIsActive(!isActive);
    };

    return (
        <div className="task-icon" onClick={handleClick}>
            <div className={`task-icon-icon ${isActive ? 'task-icon-active' : ''}`}>
                <ClockFill color="#fff" size={22} />
            </div>
            <div className="task-icon-content">
                <p><b>{title} <span className="color-orange"> {time}</span></b></p>
                <p>{date}</p>
            </div>
        </div >
    );
}