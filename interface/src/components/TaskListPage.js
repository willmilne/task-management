import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap'
import moment from 'moment';

import 'react-tabulator/lib/styles.css';
import 'react-tabulator/lib/css/tabulator.min.css';
import { ReactTabulator } from 'react-tabulator';

class TaskListPage extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        data: []
    }

    createColumns() {
        let columns = [
            { title: 'ID', field: 'id', width: 100 },
            { title: 'Title', field: 'name', width: 150 },
            { title: 'Description', field: 'description' },
            { title: 'Due', field: 'due', width: 150 },
            //{ title: 'Completed?', field: 'completed', width: 100},
        ]

        return columns;
    }

    render() {
        const taskList = this.props.taskList;

        let taskArray = [];
        for (var k in taskList) {
            taskArray.push(taskList[k]);
        }

        return (
            <div>
                Task List
                <Button onClick={this.props.newTask}>Add Task</Button>
                <Button>Filter Tasks</Button>
                <ReactTabulator columns={this.createColumns()} data={taskArray} options={[]} rowClick={this.props.taskSelected} />
            </div>
        );
    }
}


export default TaskListPage;