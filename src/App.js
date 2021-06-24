import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './components/Login';
import TasksPanel from './components/TasksPanel';
import Profile from './components/Profile';

function App() {
  const [token, setToken] = useState();

  useEffect(() => {
    const authToken = localStorage.getItem('auth');
    if (authToken) {
      setToken(authToken);
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

  // Check if the User is Logged In
  if (!token) {
    return (
      <div className='container'>
	<Login setToken={setToken} />
      </div>
    );
  }

  // If the user is Logged in Go to the standard pages
  return (
    <Router>
      <div className='container'>
	<Route path='/' exact>
	  <TasksPanel token={token} onLogout={logout} />
	</Route>
	<Route path='/profile'>
	  <Profile token={token} />
	</Route>
      </div>
    </Router>
  );
}

export default App;
