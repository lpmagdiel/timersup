import { useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const PieChart = ({ chartData }) => {
    const colors = chartData.map(item => "#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0") );
    const [data, setData] = useState({
        labels: chartData.map(item => item.title),
        datasets: [
          {
            label: 'Segundos..',
            data: chartData.map( item => item.time ),
            backgroundColor: colors,
            borderWidth: 0
          },
        ],
  });
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Tiempo realizando tareas</h2>
      <Pie
        data={data}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Tiempo realizando tareas"
            }
          }
        }}
      />
    </div>
  );
}