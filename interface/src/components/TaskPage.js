import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap'
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Modal from 'react-modal'

import { get, post, put, del } from './../scripts/serverLibrary';

import 'react-datepicker/dist/react-datepicker.css';

class TaskPage extends React.Component {
    constructor(props) {
        super(props);
        let dueDate;
        if (this.props.task && this.props.task.due) {
            dueDate = this.props.task.due;
            dueDate = new Date(dueDate);
        }
        this.state = {
            selectedDate: dueDate || new Date(),
            id: this.props.task && this.props.task.id || -1,
            completed: this.props.task.completed || false,
            name: this.props.task.name,
            description: this.props.task.description,
            deleteModalIsOpen: false
        };

        if (this.state.id === -1 || this.state.completed !== false) {
            this.state.completedButtonDisabled = true;
        }
        else {
            this.state.completedButtonDisabled = false;
        }

        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.saveTask = this.saveTask.bind(this);
        this.completed = this.completed.bind(this);
        this.openDeleteModal = this.openDeleteModal.bind(this);
        this.closeDeleteModal = this.closeDeleteModal.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
    }

    saveTask() {
        let task = {
            id: this.state.id,
            name: this.state.name,
            description: this.state.description,
            due: moment(this.state.selectedDate).format('M/D/YYYY'),
            completed: this.state.completed
        };
        if (this.state.id === -1) {
            // we are saving a new task, not updating an old one
            post.task(task, {
                success: (_res) => {
                    this.props.savedNewTask(_res);
                },
                failure: (_err) => {

                }
            });
        } else {
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

    completed() {
        this.setState({
            completed: true
        }, () => {
            this.saveTask();
        });
        //this.saveTask());
    }

    handleNameChange(event) {
        this.setState({
            name: event.target.value
        });
    }

    handleDescriptionChange(event) {
        this.setState({
            description: event.target.value
        });
    }

    handleDateChange(date) {
        this.setState({
            selectedDate: date
        });
    }

    openDeleteModal() {
        this.setState({ deleteModalIsOpen: true });
    }

    deleteTask(){
        console.log('heyhey', this.state.id);
        if (this.state.id !== -1) {
            console.log('deleting', this.state.id);
            del.task(this.state.id, {
                id: this.state.id
            }, {
                success: (_res) => {
                    this.props.savedNewTask(_res);
                },
                failure: (_res) => {

                }
            });
        }
    }

    closeDeleteModal() {
        this.setState({ deleteModalIsOpen: false });
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
                        <Form.Control type="text" placeholder={title} onChange={this.handleNameChange} />
                    </Form.Group>
                    <Form.Group controlId="formDescription">
                        <Form.Label>Task Description</Form.Label>
                        <Form.Control type="text" placeholder={description} onChange={this.handleDescriptionChange} />
                    </Form.Group>
                </Form>
                Set Due Date
                <DatePicker id="taskDue"
                    selected={this.state.selectedDate}
                    onChange={this.handleDateChange}
                />
                <br></br>
                {this.state.completed && <b>Great job finishing this task!<br></br></b>}
                <Button onClick={this.completed} disabled={this.state.completedButtonDisabled}>Task Completed!</Button>
                <Button onClick={this.openDeleteModal} disabled={this.state.id === -1}>Delete Task</Button>
                <br></br>
                <Button onClick={this.props.backToTasks}>Back to tasks</Button>
                <Button onClick={this.saveTask}>Save Changes</Button>
                <Modal isOpen={this.state.deleteModalIsOpen} onRequestClose={this.closeDeleteModal} contentLabel={"Delete this task?"}>
                    <div>
                        <h2>Are you sure you want to delete this task?  It cannot be recovered.</h2>
                        <Button onClick={this.closeDeleteModal}>No</Button>
                        <Button onClick={this.deleteTask}>Yes</Button>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default TaskPage;