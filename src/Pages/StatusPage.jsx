import { PieChart } from "../components";
import { getTimers } from "../data/storage";
import { convertSecondsString } from "../helpers";

export const StatusPage = () => {
    const timers = getTimers();
    return <div className="status-page page">
        <select>
            <option>Ultima semana</option>
            <option>Ultimo mes</option>
            <option>Ultimo año</option>
        </select>
        <PieChart chartData={timers}/>
        
        <table>
            <thead>
                <tr>
                    <th>Tarea</th>
                    <th>Tiempo</th>
                </tr>
            </thead>
            <tbody>
                {timers.map((task, index) => (
                    <tr key={`timetask${index}`}>
                        <td>{task.name}</td>
                        <td>{ convertSecondsString(task.time) }</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
}