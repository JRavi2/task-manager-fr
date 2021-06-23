import PropTypes from 'prop-types';
import Button from './Button';

const Header = ({ title, onAdd, showAdd, onLogout }) => {
  return (
    <header className='header'>
      <h1>{ title }</h1>
      <Button
	onClick={onAdd}
	color={showAdd ? 'red' : 'green'}
	text={showAdd ? 'Close' : 'Add'}
      />
      <Button
	onClick={onLogout}
	text='Logout'
      />
    </header>
  );
}

Header.defaultProps = {
  title: 'Task Manager'
}

Header.propTypes = {
  title: PropTypes.string
}

export default Header;
