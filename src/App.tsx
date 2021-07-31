import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import { MyCounter } from './features/my-counter/MyCouter';
import { LogIn } from './features/log-in/LogIn';
import Todo from './features/todo/Todo';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Todo List</h1>
      </header>
      <div className="App-content">
        <Todo />
      </div>
    </div>
  );
}

export default App;
