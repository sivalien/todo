import React, { useState, useCallback, useEffect, useContext } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import './TodoList.css';


function TodoList() {
  const [data, setData] = useState([]);
  const { id } = useContext(AuthContext);

  const refreshTodo = useCallback(async () => {
    try {
      await axios.get('http://localhost:5050/',
      {
        headers: {"Content-Type": "application/json"},
        params: {id}
      })
      .then(response => {
        console.log(response);
        setData(response.data)
      })
    } catch(error) {
      console.log(error);
    }
  }, [id]);

  const removeTodo = useCallback(async (todoId) => {
    try {
      await axios.delete('/delete/' + todoId, 
      {
        headers: {"Content-Type": "application/json"},
        params: {ownerId: id}
      })
      .then(response => console.log(response))
      .then(() => refreshTodo())
    } catch(error) {
      console.log(error);
    }
  }, [id, refreshTodo]);

  const completeTodo = useCallback(async (todoId, todoDone) => {
    console.log(!todoDone);
    try {
      await axios.patch('/done/' + todoId, {id: id, done: !(todoDone)}, {
        headers: {"Content-Type": "application/json"},
      })
      .then(response => console.log(response))
      .then(() => refreshTodo())
    } catch(error) {
      console.log(error)
    }
  }, [id, refreshTodo]);

  useEffect(() => {
    return () => {
      refreshTodo()
    };
  }, [refreshTodo])

  return (
    <div className='todo-app'>
      <h1>What's the Plan for Today?</h1>
      <TodoForm onSubmit={refreshTodo}/>
      <Todo
        todos={data}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        refreshTodo={refreshTodo}
      />
    </div>
  );
}

export default TodoList;