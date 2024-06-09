import { getTimers } from "../data/storage";
import { convertSecondsString } from "../helpers";
export const TimePage = () => {
    const timers = getTimers();
    return (
        <div className="time-page page">
            {
                timers.map(timer => (
                    <p>{timer.name} : {convertSecondsString(timer.time)}</p>))
            }
        </div>
    );
}