import React, { Component } from 'react';
import { Button } from 'react-bootstrap'

class TaskListPage extends React.Component {
    render() {
        const taskList = this.props.taskList;

        return(
            <div>
                Task List
                <Button>Add Task</Button>
                <Button>Filter Tasks</Button>
                {
                    Object.keys(taskList).map((key, index) => (
                        <TaskListView task={taskList[key]}></TaskListView>
                    ))
                }
            </div>
        );
    }
}

class TaskListView extends React.Component {
    render(){
        const task = this.props.task;

        return <b>{task.title} {task.description} {task.due}</b>
    }
}

export default TaskListPage;