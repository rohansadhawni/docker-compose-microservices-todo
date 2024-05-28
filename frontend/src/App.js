import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoList from './components/TodoList';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/todos')
      .then(response => setTodos(response.data))
      .catch(error => console.error('Error fetching todos:', error));
  }, []);

  const addTodo = () => {
    axios.post('http://localhost:5000/todos', { text: newTodo })
      .then(response => setTodos([...todos, response.data]))
      .catch(error => console.error('Error adding todo:', error));
    setNewTodo('');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Todo List</h1>
        <input
          type="text"
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
          placeholder="New todo"
        />
        <button onClick={addTodo}>Add Todo</button>
        <TodoList todos={todos} />
      </header>
    </div>
  );
}

export default App;
