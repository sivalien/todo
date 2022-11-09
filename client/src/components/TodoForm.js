import React, { useState, useEffect, useRef, useCallback, useContext } from 'react';
import axios from 'axios';
import {AuthContext} from '../context/AuthContext';

function TodoForm(props) {

  const inputRef = useRef(null);

  const [input, setInput] = useState(props.edit ? props.edit.value : '');

  const { id } = useContext(AuthContext);

  const handleChange = e => {
    setInput(e.target.value);
  };

  const handleSubmit = useCallback(async e => {
    e.preventDefault();
    if (!input) return null;
    try {
      console.log(id);
      await axios.post('/', {text: input, id: id}, 
      {headers: {
        "Content-Type": "application/json",
      }})
      .then(response => console.log(response))
      .then(() => props.onSubmit())
    } catch(error) {
      console.log(error);
    }
    setInput('');
  }, [input, props, id]);

  const handleUpdate = useCallback(async e => {
    e.preventDefault();
    try {
      await axios.patch('https://your-web-todo-list.herokuapp.com/update/' + props.edit.id, {value: input, id: id}, 
      {headers: {
        "Content-Type": "application/json"
      }})
      .then(res => console.log(res))
      .then(() => props.onSubmit())
    } catch(error) {
      console.log(error)
    }
    setInput('');
  }, [id, input, props])

  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <form className='todo-form'>
      {props.edit ? (
        <>
          <input
            placeholder='Update your item'
            value={input}
            name='text'
            ref={inputRef}
            onChange={handleChange}
            className='todo-input edit'
          />
          <button className='todo-button edit' onClick={handleUpdate}>
            Update
          </button>
        </>
      ) : (
        <>
          <input
            placeholder='Add a todo'
            value={input}
            name='text'
            className='todo-input'
            onChange={handleChange}
            ref={inputRef}
          />
          <button className='todo-button' onClick={handleSubmit}>
            Add todo
          </button>
        </>
      )}
    </form>
  );
}

export default TodoForm;