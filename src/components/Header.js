import PropTypes from 'prop-types';
import Button from './Button';

const Header = ({ title, onAdd, showAdd, onLogout, onProfile }) => {
  return (
    <header className='header'>
      <h1>{ title }</h1>
      <div className='header-btns'>
	<Button
	  onClick={onAdd}
	  color={showAdd ? 'red' : 'green'}
	  text={showAdd ? 'Close' : 'Add'}
	/>
	<Button
	  onClick={onLogout}
	  text='Logout'
	/>
	<Button
	  onClick={onProfile}
	  text='Profile'
	/>
      </div>
    </header>
  );
}

Header.defaultProps = {
  title: 'Task Manager'
}

Header.propTypes = {
  title: PropTypes.string,
  onAdd: PropTypes.func,
  showAdd: PropTypes.func,
  onLogout: PropTypes.func,
  onProfile: PropTypes.func
}

export default Header;
