import React, { useState } from 'react';
import TodoForm from './TodoForm';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';

const Todo = ({ todos, completeTodo, removeTodo, refreshTodo }) => {
  const [edit, setEdit] = useState({
    id: null,
    value: ''
  });


  const submitUpdate = async () => {
    await refreshTodo();
    setEdit({
      id: null,
      value: ''
    });
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  return todos.map((todo, index) => (
    <div
      className={todo.done ? 'todo-row complete' : 'todo-row'}
      key={index}
    >
      <div className='todo-text' key={index} onClick={() => completeTodo(todo._id)}>
        {todo.text}
      </div>
      <div className='icons'>
        <RiCloseCircleLine
          onClick={(e) => {e.preventDefault(); removeTodo(todo._id)}}
          className='delete-icon'
        />
        <TiEdit
          onClick={() => setEdit({ id: todo._id, value: todo.text })}
          className='edit-icon'
        />
      </div>
    </div>
  ));
};

export default Todo;