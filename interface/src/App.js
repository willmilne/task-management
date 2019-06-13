import React from 'react';
import logo from './logo.svg';
import './App.css';
import TaskPage from './components/TaskPage'
import TaskListPage from './components/TaskListPage'

function App() {
  let tempTask = {
    title: 'name!',
    description: 'description!',
    due: '6/13/2019'
  }

  let tasks = {
    0: tempTask,
    1: {
      title: 'name2', 
      description: 'another name',
      due: '7/7/2019'
    }
  }
  return (
    <div className="Task-Manager">
      <TaskListPage taskList={tasks}></TaskListPage>
      <TaskPage task={tempTask}></TaskPage>
    </div>
  );
}

export default App;
