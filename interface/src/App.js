import React from 'react';
import logo from './logo.svg';
import './App.css';
import TaskPage from './components/TaskPage'

function App() {
  let tempTask = {
    title: 'name!',
    description: 'description!',
    due: '6/13/2019'
  }
  return (
    <div className="Task-Manager">
      <TaskPage task={tempTask}></TaskPage>
    </div>
  );
}

export default App;
