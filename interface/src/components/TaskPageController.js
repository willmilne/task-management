import React, { Component } from 'react';

import TaskListPage from './TaskListPage';
import TaskPage from './TaskPage';

import { get, post, put, del } from './../scripts/serverLibrary';
//This class manages the state of the application.
// if there is a selected task, it displays the task page of that task.
// if there is no selected task, it shows the list of tasks.  
// It allows the user to pass the filter up from the child component
// which then calls the GET function again.

// the tasklistpage needs to be able to change the selectedTask to something
// and the taskpage needs to be able to remove the selected tasks.
// the tasklistpage also should be able to pass the filter parameter up to here 
// so that it can re-request the tasks
class TaskPageController extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            tasks: {},
            selectedTask: false, 
            filter: -1,
            error: false
        }
    }

    componentDidMount(){
        get.tasks({}, {
            success: (_res) => {
                console.log(_res);
                this.setState({tasks: _res});
            },
            failure: (_err) => {
                this.setState({
                    error: _err
                });
            }
        });
    }

    render(){
        return(
            <div>
                {this.state.selectedTask && <TaskPage task={this.state.selectedTask} />}
                {!this.state.selectedTask && <TaskListPage taskList={this.state.tasks}/>}
            </div>
        )
    }
}

export default TaskPageController