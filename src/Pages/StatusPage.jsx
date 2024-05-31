import { PieChart } from "../components";
import { testTasks } from "../data/test";
import { convertSecondsString } from "../helpers";

export const StatusPage = () => {
    return <div className="status-page page">
        <select>
            <option>Ultima semana</option>
            <option>Ultimo mes</option>
            <option>Ultimo año</option>
        </select>
        <PieChart chartData={testTasks}/>
        
        <table>
            <thead>
                <tr>
                    <th>Tarea</th>
                    <th>Tiempo</th>
                </tr>
            </thead>
            <tbody>
                {testTasks.map((task, index) => (
                    <tr key={`timetask${index}`}>
                        <td>{task.title}</td>
                        <td>{ convertSecondsString(task.time) }</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
}