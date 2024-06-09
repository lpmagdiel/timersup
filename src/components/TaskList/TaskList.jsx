import { TaskIcon } from '../TaskIcon';
import { getTimers } from '../../data/storage';
import './style.css';

export const TaskList = () => {
  const tasks = getTimers().filter(t => t.type === 'recurring');
  return (
    <div className='task-list'>
      {
        tasks.map( ({id}) => {
          return <TaskIcon key={id} id={id} />
        }
        )
      }
    </div>
  );
};