// this is the task object.  
// it stores the relevant properties for a task such as name, description, and due date.
// we currently store an id field so that we may eventually translate this to a longer-term storage system. 
// id is an integer
// name, description, and due are strings.  due will be of the format YYYY/MM/DD

module.exports.Task = class Task {
    constructor(_id, _name, _description, _due){
        this.id = _id;
        this.name = _name;
        this.description = _description;
        this.due = _due;
        this.created = new Date();
        this.modified = this.created;
        this.completed = false;
    };

    update(_name, _description, _due){
        if(this.name !== _name || this.description !== _description || this.due !== _due){
            this.name = _name;
            this.description = _description;
            this.due = _due;
    
            this.modified = new Date.now();
        }
    }
};