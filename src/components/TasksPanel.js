import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from './Header';
import Tasks from './Tasks';
import AddTask from './AddTask';

const TasksPanel = ({ token, onLogout }) => {
  const [tasks, setTasks] = useState([]);
  const [showAddTask, setShowAddTask] = useState(false);

  const history = useHistory();

  // Fetch the tasks initially
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    }

    getTasks();
  });

  // Fetch Tasks from Server
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:8000/tasks',{
      headers: {
	'Authorization': `Bearer ${token}`
      }
    });
    const data = await res.json();

    return data
  }

  // Fetch Single Task from Server
  const fetchTask = async id => {
    const res = await fetch(`http://localhost:8000/tasks/${id}`, {
      headers: {
	'Authorization': `Bearer ${token}`
      }
    });
    const data = await res.json();

    return data
  }

  // Toggle the Add Button
  const toggleShowAddTask = () => setShowAddTask(!showAddTask);

  // Add Task
  const addTask = async description => {
    const res = await fetch('http://localhost:8000/tasks',
      {
	method: 'POST',
	headers: {
	  'Content-type': 'application/json',
	  'Authorization': `Bearer ${token}`
	},
	body: JSON.stringify({ description, completed: false })
      }
    );

    const data = await res.json();
    setTasks([...tasks, data]);
  }

  // Delete Task
  const deleteTask = async id => {
    const res = await fetch(`http://localhost:8000/tasks/${id}`, {
      method: 'DELETE',
      headers: {
	'Authorization': `Bearer ${token}`
      }
    });
    const data = await res.json();
    console.log(data);

    setTasks(tasks.filter(task => task._id !== id));
  }

  // Toggle Completed
  const toggleCompleted = async id => {
    const taskToToggle = await fetchTask(id);

    const res = await fetch(`http://localhost:8000/tasks/${id}`,
      {
	method: 'PATCH',
	headers: {
	  'Content-type': 'application/json',
	  'Authorization': `Bearer ${token}`
	},
	body: JSON.stringify({ completed: !taskToToggle.completed })
      }
    );

    const data = await res.json();

    setTasks(tasks.map(task => task._id === id ? {...task, completed: data.completed} : task));
  }

  return (
    <>
      <Header
	title='Tasks'
	onAdd={toggleShowAddTask}
	showAdd={showAddTask}
	onLogout={onLogout}
	onProfile={() => history.push('/profile')}
      />
      { showAddTask && <AddTask onAdd={addTask} /> }
      <Tasks
	tasks={tasks}
	onDelete={deleteTask}
	onToggle={toggleCompleted}
      />
    </>
  );
}

export default TasksPanel;
