import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap'
import moment from 'moment';

class TaskListPage extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        const taskList = this.props.taskList;

        return(
            <div>
                Task List
                <Button>Add Task</Button>
                <Button>Filter Tasks</Button>
                {
                    Object.keys(taskList).map((key) => (
                        <TaskListView onClick={() => this.props.clickedTask(key)} key={key} task={this.props.taskList[key]}></TaskListView>
                    ))
                }
            </div>
        );
    }
}

const containerStyle = {
    display: 'flex',
    outline: 'solid',
    margin: '0 auto',
    width: '100%'
};

class TaskListView extends React.Component {
    render(){
        const task = this.props.task;
        const title = task.name;
        let description = task.description;
        if(description.length > 150){
            description = description.substring(0, 150) + '...';
        }
        const due = task.due;
        const completed = task.completed;

        return <Container style={containerStyle}>
            <Row>
                {/*<Col><TaskStatusButtons completed={completed}></TaskStatusButtons></Col>
                */}
                <Col>{title}</Col>
                <Col xs='6'>{description}</Col>
                <Col>{due}</Col>
                <Col>
                    <TaskStatus completed={completed} due={due}/>
                </Col>
                {/*<Col>
                    <Button>Remove</Button>
                </Col>*/}
            </Row>
        </Container>
    }
}

class TaskStatusButtons extends React.Component {
    render() {
        const completed = this.props.completed;

        return <div>
                <Button>Complete</Button>
            </div>
    }
}

class TaskStatus extends React.Component {
    render() {
        const completed = this.props.completed;
        const due = this.props.due;
        
        let d1 = moment('M/D/YYYY');
        let d2 = moment(due).format('M/D/YYYY');

        let overdue = moment(d2).isBefore(d1);
        let dueSoon = moment(d2) === d1 || moment(d1.add(1, 'day')) === d2;

        let ret = '';
        if(overdue){
            ret = 'OVERDUE';
        }
        else if (dueSoon){
            ret = 'DUE SOON';
        }
        else{
            // TODO: Add a 'Due in X Days' display??? always just get how many days are left, if it's negative, overdue, if it's 0 or 1, due soon, else show how many days.
            ret = '';
        }

        if(completed){
            ret = 'Done!'
        }

        return <b>{ret}</b>
    }
}

export default TaskListPage;