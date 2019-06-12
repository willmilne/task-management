// tasks is the class that stores all tasks, and acts as the intermediary between the frontend and each individual task.
// tasks has a primary dictionary of all tasks, indexed by id.  

let { Task } = require('./Task');

module.exports.Tasks = class Tasks {
    constructor(){
        this.list = {};
    }

    addTask(_name, _description, _due){
        let id = Object.keys(this.list).length;
        this.list[id] = new Task(_name, _description, _due);
    }

    editTask(_id, _name, _description, _due){
        let task = this.list[_id];
        task.update(_name, _description, _due);
    }

    setTaskCompleted(_id, _value){
        let task = this.list[_id];
        task.completed = _value;
    }

    removeTask(_id){
        delete this.list[_id];
    }
}