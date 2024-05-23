import { TaskIcon } from '../TaskIcon';
import './style.css';

export const TaskList = () => {
  const arrt = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
  return (
    <div className='task-list'>
      {
        arrt.map((e, i) => {
          return <TaskIcon title="Limpieza narita" date="2024-05-22" time="06:20" key={i} />
        }
        )
      }
    </div>
  );
};