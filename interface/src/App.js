import React from 'react';
import logo from './logo.svg';
import './App.css';
import TaskPage from './components/TaskPage'
import TaskListPage from './components/TaskListPage'
import { get, put, post, del } from './scripts/serverLibrary';
import TaskPageController from './components/TaskPageController';

function App() {

  let tasks = {
    0: {
      "id": 0,
      "name":"Task name!!",
      "due": "6/11/2019",
      "description": "Short task description.",
      "completed" : false
    },
    1: {
      "id": 1,
      "name":"Task name!!",
      "due": "6/14/2019",
      "description": "This is a description of the task.  It is a pretty cool task, and has lots of words explaining how to do it, wow.  Very cool friend.",
      "completed" : true
    },
    2: {
      "id": 2,
      "name":"Another task name",
      "due": "6/14/2019",
      "description": "This is a description of the task.  It is a pretty cool task, and has lots of words explaining how to do it, wow.  Very cool friend.",
      "completed" : false
    }
  }

  return (
    <div className="Task-Manager">
      <TaskPageController></TaskPageController>
      {/*<TaskListPage taskList={tasks}></TaskListPage>
      <TaskPage task={tempTask}></TaskPage>*/}
    </div>
  );
}

export default App;
