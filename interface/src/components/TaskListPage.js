import React, { Component } from 'react';
import { Button } from 'react-bootstrap'
import moment from 'moment';

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
        const title = task.name;
        const description = task.description;
        if(description.length > 70){
            description = description.substring(0, 70) + '...';
        }
        const due = task.due;

        return <Container>
            <Row>
                <Col>{/*This is where the completed or remove buttons go*/}</Col>
                <Col>{title}</Col>
                <Col>{description}</Col>
                <Col>{due}</Col>
                <Col>
                    <TaskStatus due={due}/>
                </Col>
            </Row>
        </Container>
    }
}

class TaskStatus extends React.Component {
    render() {
        const due = this.props.due;
        
        let d1 = moment();
        let d2 = moment(due).format('M/D/YYYY');

        let overdue = moment(d2).isBefore(d1);
        let dueSoon = moment(d2).equals(d1) || moment(d1.add(1, 'day')).equals(d2);

        let ret = '';
        if(overdue){
            ret = 'OVERDUE';
        }
        else if (dueSoon){
            ret = 'DUE SOON';
        }
        else{
            // TODO: Add a 'Due in X Days' display???
            ret = '';
        }

        return <b>{ret}</b>
    }
}

export default TaskListPage;