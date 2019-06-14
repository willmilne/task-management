// this is the task object.  
// it stores the relevant properties for a task such as name, description, and due date.
// we currently store an id field so that we may eventually translate this to a longer-term storage system. 
// id is an integer
// name, description, and due are strings.  due will be of the format YYYY-MM-DD

module.exports.Task = class Task {
    constructor(_name, _description, _due){
        this.id = -1; // initializes to -1 so we know if something is wrong.
        this.name = _name;
        this.description = _description;
        this.due = _due;
        this.completed = false;
        this.status = undefined;
    };

    update(_name, _description, _due, _completed){
        this.name = _name;
        this.description = _description;
        this.due = _due;
        this.completed = _completed;
    }
};