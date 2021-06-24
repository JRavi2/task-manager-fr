import { useState, useEffect } from 'react';
import { BsFillCaretLeftFill } from 'react-icons/bs';
import { useHistory } from 'react-router-dom';

const Profile = ({ token }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');

  const history = useHistory();

  useEffect(() => {
    const getUserData = async () => {
      const { name: userName, email: userEmail, age: userAge } = await fetchUser();
      setName(userName);
      setEmail(userEmail);
      setAge(userAge);
    }

    getUserData();
  });

  const fetchUser = async () => {
    const res = await fetch('http://localhost:8000/users/me',{
      headers: {
	'Authorization': `Bearer ${token}`
      }
    });
    const data = await res.json();

    return data
  }

  return (
    <>
      <header className='header'>
	<BsFillCaretLeftFill
	  style={{cursor: 'pointer'}}
	  onClick={() => history.push('/')}
	/>
	<h1 style={{ flush: 'left' }}>Profile</h1>
      </header>
      <p>Name: {name}</p>
      <p>Email: {email}</p>
      <p>Age: {age}</p>
    </>
  );
}

export default Profile;
