// tasks is the class that stores all tasks, and acts as the intermediary between the frontend and each individual task.
// tasks has a primary dictionary of all tasks, indexed by id.  

let { Task } = require('./Task');
let dateHelper = require('./../utilities/dateHelper');

module.exports.Tasks = class Tasks {
    constructor() {
        this.list = {};
        this.nextId = 1; // this is 1-indexed because 0 evaluates to false and was causing a bug where the initial task couldnt be updated
        this.lastStatusUpdate = undefined;
    }

    addTask(_task) {
        let id = this.nextId; // using the length of the list would give us a unique id if tasks couldnt be removed.  Since they can, we need to do something else.
        _task.id = id;
        this.list[id] = _task;
        this.nextId++;
    }

    getTask(_id) {
        let task = this.list[_id];
        return task;
    }

    getTasks(_filterType, _today) {
        let result = {};
        let tasks = this.list;
        let tomorrow = dateHelper.getNextDay(_today);
        switch (_filterType) {
            // get tasks due today
            case 0:
                for (var key in tasks) {
                    var task = tasks[key];
                    if (task.due === _today) {
                        result[task.id] = task;
                    }
                }
                return result;
            // get tasks due tomorrow
            case 1:
                for (var key in tasks) {
                    var task = tasks[key];
                    if (task.due === tomorrow) {
                        result[task.id] = task;
                    }
                }
                return result;
            // get tasks due today and tomorrow
            case 2:
                for (var key in tasks) {
                    var task = tasks[key];
                    if (task.due === _today || task.due === tomorrow) {
                        result[task.id] = task;
                    }
                }
                return result;
            // get tasks that are overdue
            case 3:
                for (var key in tasks) {
                    var task = tasks[key];
                    if (dateHelper.isBefore(task.due, _today) && !task.completed) {
                        result[task.id] = task;
                    }
                }
                return result;
            // get tasks that are completed
            case 4:
                for (var key in tasks) {
                    var task = tasks[key];
                    if (task.completed) {
                        result[task.id] = task;
                    }
                }
                return result;
            default:
                return this.list;
        }
    }

    removeTask(_id) {
        if (this.list[_id]) {
            delete this.list[_id];
            return true;
        }

        return false;
    }

    // TODO: Make presorted buckets of tasks that match these parameters
    // so that the filtering is O(1) on the get
    updateAllStatuses(_today){
        for(var k in this.list){
            this.updateStatus(this.list[k], _today);
        }

        this.lastStatusUpdate = _today;
    }

    updateStatus(_task, _today){
        let tomorrow = dateHelper.getNextDay(_today);
        if(_task.completed){
            _task.status = 'completed';
            return;
        }
        else if(_task.due === _today || _task.due === tomorrow){
            _task.status = 'upcoming';
            return;
        }
        else if(dateHelper.isBefore(_task.due, _today)){
            _task.status = 'overdue';
            return;
        }
        else{
            _task.status = '';
            return;
        }
    }
}