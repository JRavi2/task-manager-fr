import { useState } from 'react';

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    const loginInfo = { email, password };
    fetch('http://localhost:8000/users/login', {
	method: 'POST',
	headers: {
	  'Content-type': 'application/json'
	},
	body: JSON.stringify(loginInfo)
      })
	.then(res => res.json())
	.then(data => {
	  localStorage.setItem('auth', data.token);
	  setToken(data.token);
	});
  }

  return (
    <>
      <h1>Login</h1>
      <form className='add-form' onSubmit={onSubmit}>
	<div className='form-control'>
	  <label>Username</label>
	  <input
	    type='text'
	    placeholder='Email'
	    value={email}
	    onChange={e => setEmail(e.target.value)}
	  />
	  <label>Password</label>
	  <input
	    type='password'
	    placeholder='password'
	    value={password}
	    onChange={e => setPassword(e.target.value)}
	  />
	  <input
	    type='submit'
	    value='Login'
	    className='btn btn-block'
	  />
	</div>
      </form>
    </>
  );
}


export default Login;
