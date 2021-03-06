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
            { 
                title: 'Status', 
                field: 'status', 
                width: 150, 
                formatter: (cell, formatterParams) => {
                    let cellValue = cell.getValue();
                    if(cellValue === 'overdue'){
                        cell.getRow().getElement().style.backgroundColor = "#ff9999";
                        
                        return cellValue;
                    }
                    else if(cellValue === 'completed'){
                        cell.getRow().getElement().style.backgroundColor = "#66cccc";
                        return cellValue;
                    }
                    else if(cellValue === 'upcoming'){
                        cell.getRow().getElement().style.backgroundColor = "#ffffcc";
                        return cellValue;
                    }
                    return cellValue;
                }
            }
        ];

        return columns;
    }

    render() {
        const taskList = this.props.taskList;

        // Todo: the server should probably just return an array instead of a dictionary.  This probably isn't helping performance.  
        let taskArray = [];
        for (var k in taskList) {
            taskArray.push(taskList[k]);
        }

        return (
            <div>
                <h1>Task List</h1>
                <Button onClick={this.props.newTask}>Add Task</Button>
                <FilterButtons changeFilters={this.setFilters}></FilterButtons>
                <ReactTabulator columns={this.createColumns()} data={taskArray} options={[]} rowClick={this.props.taskSelected} />
            </div>
        );
    }
}


export default TaskListPage;