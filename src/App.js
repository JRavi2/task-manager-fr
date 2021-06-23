import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';

function App() {
  const [tasks, setTasks] = useState([]);
  const [token, setToken] = useState();
  const [showAddTask, setShowAddTask] = useState(false);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    }

    const authToken = localStorage.getItem('auth');
    if (authToken) {
      setToken(authToken);
      getTasks();
    }

  }, []);

  // Logout
  const logout = () => {
    fetch('http://localhost:8000', {
      method: 'POST',
      headers: {
	'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
	localStorage.clear();
	setToken();
      });
  }

  // Fetch Tasks from Server
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:8000/tasks',{
      headers: {
	'Authorization': `Bearer ${localStorage.getItem('auth')}`
      }
    });
    const data = await res.json();
    console.log(data);

    return data
  }

  // Fetch Single Task from Server
  const fetchTask = async id => {
    const res = await fetch(`http://localhost:8000/tasks/${id}`, {
      headers: {
	'Authorization': `Bearer ${localStorage.getItem('auth')}`
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

  // Check if the User is Logged In
  if (!token) {
    return (
      <div className='container'>
	<Login setToken={setToken} />
      </div>
    );
  }

  return (
    <div className='container'>
      <Header
	onAdd={toggleShowAddTask}
	showAdd={showAddTask}
	onLogout={logout}
      />
      { showAddTask && <AddTask onAdd={addTask} /> }
      <Tasks
	tasks={tasks}
	onDelete={deleteTask}
	onToggle={toggleCompleted}
      />
    </div>
  );
}

export default App;
