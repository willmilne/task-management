import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap'
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

class TaskPage extends React.Component {
    constructor(props) {
        super(props);
        let dueDate;
        if(this.props.task && this.props.task.due){
            dueDate = this.props.task.due;
            dueDate = new Date(dueDate);
        }
        this.state = {
            startDate: dueDate || new Date()
        };
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    handleDateChange(date) {
        console.log(date);
        this.setState({
            startDate: date
        });
    }

    render() {
        const task = this.props.task;
        const title = (task && task.title) || 'Enter Title';
        const description = (task && task.description) || 'Enter Description';
        const due = (task && task.due) || 'No due date selected';
        return (
            <div>
                <Form>
                    <Form.Group controlId="formTitle">
                        <Form.Label>Task Name</Form.Label>
                        <Form.Control type="text" placeholder={title} />
                    </Form.Group>
                    <Form.Group controlId="formDescription">
                        <Form.Label>Task Description</Form.Label>
                        <Form.Control type="text" placeholder={description} />
                    </Form.Group>
                </Form>
                <b>
                    Select or Update Due Date
                </b>
                <DatePicker
                    selected={this.state.startDate}
                    onChange={this.handleDateChange}
                />
                <Button></Button>
            </div>
        );
    }
}

export default TaskPage;