import { FaTimes } from 'react-icons/fa'

const Task = ({ task, onDelete, onToggle }) => {
  return (
    <div
      className={`task ${task.completed ? 'reminder' : ''}`}
      onDoubleClick={() => onToggle(task._id)}>
      <h3>
	{ task.description }
	<FaTimes
	  style={{ color: 'red', cursor: 'pointer' }}
	  onClick={() => onDelete(task._id)}
	/>
      </h3>
    </div>
  );
}

export default Task
