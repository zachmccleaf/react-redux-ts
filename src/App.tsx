import './App.css';
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
