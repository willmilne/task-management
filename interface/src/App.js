import React from 'react';
import logo from './logo.svg';
import './App.css';
import TaskPage from './components/TaskPage'
import TaskListPage from './components/TaskListPage'

// decided to hardcode the server address for now
// in future iterations I would put it in 

function App() {
  
  return (
    <div className="Task-Manager">
      <TaskListPage taskList={tasks}></TaskListPage>
      {/*<TaskPage task={tempTask}></TaskPage>*/}
    </div>
  );
}

export default App;
