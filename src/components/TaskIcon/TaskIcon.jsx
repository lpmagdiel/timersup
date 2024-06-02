import { ClockFill } from "react-bootstrap-icons";
import { useState } from "react";
import { convertSecondsString } from "../../helpers";
import { updateTimer, getTimer } from "../../data/storage";
import './style.css';

export const TaskIcon = ({ title, time, id }) => {
    const [isActive, setIsActive] = useState(false);
    const [newTime, setNewTime] = useState(' + 0H 0M 0S');
    const [timer, setTimer] = useState();
    const [ sessionTime, setSessionTime ] = useState(time);
    const [ seconds, setSeconds ] = useState(0);
    const timerData = getTimer(id);


    const handleClick = () => {
        setIsActive(!isActive);
        changeStatusTimer();
    };
    const changeStatusTimer = () => {
        if (isActive) {
            window.clearInterval(timer);
            setSessionTime( sessionTime+seconds);
            timerData.time = sessionTime;
            updateTimer(timerData);
            console.log(timerData)
            setSeconds(0);
            setNewTime('+ ' + convertSecondsString(0));
        }
        else {
            let totalTime = seconds;
            const tm = window.setInterval(() => {
                totalTime++;
                setNewTime('+ ' + convertSecondsString(totalTime));
                setSeconds(totalTime);
            },1000);
            setTimer(tm);
        }
    }
        return (
            <div className="task-icon" onClick={handleClick}>
                <div className={`task-icon-icon ${isActive ? 'task-icon-active' : ''}`}>
                    <ClockFill color="#fff" size={22} />
                </div>
                <div className="task-icon-content">
                    <p><b>{title}</b></p>
                    <p><span className="tag-orange"> {convertSecondsString(sessionTime)}</span> <span className="color-orange">{newTime}</span></p>
                </div>
            </div >
        );
    }