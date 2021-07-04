import { useState, useEffect } from 'react';
import { BsFillCaretLeftFill } from 'react-icons/bs';
import { useHistory } from 'react-router-dom';
import defaultAvatar from '../assets/default-avatar.jpg';

const Profile = ({ token }) => {
  const [user, setUser] = useState({});
  const [hasAvatar, setHasAvatar] = useState(false);

  const history = useHistory();

  useEffect(() => {
    const getUserData = async () => {
      const userObj = await fetchUser();
      setUser(userObj);
    }

    getUserData();
  }, []);

  const fetchUser = async () => {
    const res = await fetch('http://localhost:8000/users/me',{
      headers: {
	'Authorization': `Bearer ${token}`
      }
    });
    const data = await res.json();
    const res_avatar = await fetch(`http://localhost:8000/users/${data._id}/avatar`);
    if (res_avatar.status === 200) {
      setHasAvatar(true);
    }

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
      { hasAvatar ?
	<img src={`http://localhost:8000/users/${user.id}/avatar`} alt='profile avatar' />
	: <img src={defaultAvatar} alt='profile avatar' />
      }
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Age: {user.age}</p>
    </>
  );
}

export default Profile;
