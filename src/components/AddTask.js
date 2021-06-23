import { useState } from 'react';

const AddTask = ({ onAdd }) => {
  const [text, setText] = useState('');

  const onSubmit = e => {
    e.preventDefault();

    if (!text) {
      alert('Please add a text');
      return;
    }

    onAdd(text);
    setText('');
  }

  return (
    <form className='add-form' onSubmit={onSubmit}>
      <div className='form-control'>
	<label>Description</label>
	<input
	  type='text'
	  placeholder='Add Task'
	  value={text}
	  onChange={e => setText(e.target.value)}
	/>
	<input
	  type='submit'
	  value='save-task'
	  className='btn btn-block'
	/>
      </div>
    </form>
  );
}

export default AddTask;
