import React from 'react';
import { Button } from 'react-bootstrap'

import 'react-tabulator/lib/styles.css';
import 'react-tabulator/lib/css/tabulator.min.css';
import { ReactTabulator } from 'react-tabulator';

import { get, post, put, del } from './../scripts/serverLibrary';

class FilterButtons extends React.Component {
    constructor(props){
        super(props);

        this.changeFilters = this.changeFilters.bind(this);
    }

    changeFilters(filterId){
        this.props.changeFilter(filterId);
    }

    render(){
        return <div>
            <Button changeFilters={this.changeFilters} onClick={() => {this.props.changeFilters(-1)}}>All</Button>            
            <Button changeFilters={this.changeFilters} onClick={() => {this.props.changeFilters(0)}}>Today</Button>
            <Button changeFilters={this.changeFilters} onClick={() => {this.props.changeFilters(1)}}>Tomorrow</Button>
            <Button changeFilters={this.changeFilters} onClick={() => {this.props.changeFilters(2)}}>Upcoming</Button>
            <Button changeFilters={this.changeFilters} onClick={() => {this.props.changeFilters(3)}}>Overdue</Button>
            <Button changeFilters={this.changeFilters} onClick={() => {this.props.changeFilters(4)}}>Completed</Button>
        </div>
    }
}

class TaskListPage extends React.Component {
    constructor(props) {
        super(props);

        this.setFilters = this.setFilters.bind(this);
    }

    state = {
        filter: -1,
        filterDisplay: false
    }

    setFilters(filterId){
        get.filteredTasks(filterId, {}, {
            success: (_res) => {
                this.props.updatedTasks(_res);
            },
            failure: (_res) => {

            }
        })
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
                <FilterButtons changeFilters={this.setFilters}></FilterButtons>
                <ReactTabulator columns={this.createColumns()} data={taskArray} options={[]} rowClick={this.props.taskSelected} />
            </div>
        );
    }
}


export default TaskListPage;