// tasks is the class that stores all tasks, and acts as the intermediary between the frontend and each individual task.
// tasks has a primary dictionary of all tasks, indexed by id.  

let { Task } = require('./Task');
let dateHelper = require('./../utilities/dateHelper');

module.exports.Tasks = class Tasks {
    constructor(){
        this.list = {};
    }

    addTask(_task){
        let id = Object.keys(this.list).length; // using the length of the list would give us a unique id if tasks couldnt be removed.  Since they can, we need to do something else.
        _task.id = id;
        this.list[id] = _task;
    }

    getTask(_id){
        let task = this.list[_id];
        return task;
    }

    getTasks(_filterType, _today){
        let result = {};
        let tasks = this.list;
        switch(_filterType){
            // get tasks due today
            case 0:
                for(var task in tasks){
                    if(task.due === _today){
                        result[task.id] = task;
                    }
                }
                return result;
            // get tasks due tomorrow
            case 1:
                
                for(var task in tasks){

                }
            // get tasks due today and tomorrow
            case 2:
                break;
            // get tasks that are overdue
            case 3: 
                break;
            // get tasks that are completed
            case 4:
                break;
            default:
                return this.list;
        }
    }

    removeTask(_id){
        if(this.list[_id]){
            delete this.list[_id];
            return true;
        }

        return false;
    }
}