import React from 'react';
import logo from './logo.svg';
import './App.css';
import TaskPage from './components/TaskPage'
import TaskListPage from './components/TaskListPage'
import { get, put, post, del } from './scripts/serverLibrary';

function App() {

  return (
    <div className="Task-Manager">
      {/*<TaskListPage taskList={tasks}></TaskListPage>*/}
      {/*<TaskPage task={tempTask}></TaskPage>*/}
    </div>
  );
}

export default App;
