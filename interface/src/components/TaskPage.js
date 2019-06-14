import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap'
import DatePicker from 'react-datepicker';
import moment from 'moment';

import { get, post, put, del } from './../scripts/serverLibrary';

import 'react-datepicker/dist/react-datepicker.css';

class TaskPage extends React.Component {
    constructor(props) {
        super(props);
        let dueDate;
        console.log('TASK ID', this.props.task.id);
        if(this.props.task && this.props.task.due){
            dueDate = this.props.task.due;
            dueDate = new Date(dueDate);
        }
        this.state = {
            selectedDate: dueDate || new Date(),
            id: this.props.task && this.props.task.id || -1
        };
        console.log('STATE ID', this.state.id);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.saveTask = this.saveTask.bind(this);
    }

    saveTask(){
        let task = {
            id: this.state.id,
            name: this.state.name,
            description: this.state.description,
            due: moment(this.state.selectedDate).format('M/D/YYYY')
        };
        if(this.state.id === -1){
            // we are saving a new task, not updating an old one
            post.task(task, {
                success: (_res) => {
                    console.log('save success');
                    this.props.savedNewTask(_res);
                },
                failure: (_err) => {

                }
            });
        } else {
            console.log('UPDATING ' + this.state.id);
            // we are updating an old task
            put.task(this.state.id, task, {
                success: (_res) => {
                    this.props.savedNewTask(_res); //TODO: Rename to updatedTaskList
                },
                failure: (_err) => {

                }
            })
        }

    }

    handleNameChange(event){
        this.setState({
            name: event.target.value
        });
    }

    handleDescriptionChange(event){
        this.setState({
            description: event.target.value
        });
    }

    handleDateChange(date) {
        this.setState({
            selectedDate: date
        });
    }

    render() {
        //todo: move this up into the state initialization
        const task = this.props.task;
        const title = (task && task.name) || 'Enter Title';
        const description = (task && task.description) || 'Enter Description';
        const due = (task && task.due) || 'No due date selected';
        return (
            <div>
                <Form>
                    <Form.Group controlId="formTitle">
                        <Form.Label>Task Name</Form.Label>
                        <Form.Control id="taskTitle" type="text" placeholder={title} onChange={this.handleNameChange}/>
                    </Form.Group>
                    <Form.Group controlId="formDescription">
                        <Form.Label>Task Description</Form.Label>
                        <Form.Control id="taskDescription" type="text" placeholder={description} onChange={this.handleDescriptionChange}/>
                    </Form.Group>
                </Form>
                Set Due Date
                <DatePicker id="taskDue"
                    selected={this.state.selectedDate}
                    onChange={this.handleDateChange}
                />
                <br></br>
                <Button>Task Completed!</Button>
                <Button>Delete Task</Button>
                <br></br>
                <Button onClick={this.props.backToTasks}>Back to tasks</Button>
                <Button onClick={this.saveTask}>Save Changes</Button>
            </div>
        );
    }
}

export default TaskPage;