import { TaskIcon } from '../TaskIcon';
import { testTasks } from '../../data/test';
import './style.css';

export const TaskList = () => {
  return (
    <div className='task-list'>
      {
        testTasks.map((e, i) => {
          return <TaskIcon title={e.title} time={e.time} key={i} />
        }
        )
      }
    </div>
  );
};