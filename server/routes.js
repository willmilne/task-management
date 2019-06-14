// routes.js contains all of the REST routes required for the application.
// as this begins to grow beyond tasks, it could be separated out to taskRoutes and workerRoutes, etc.

const { Task } = require('./models/Task');
const moment = require('moment');

module.exports = (app, tasks) => {
    app.get('/tasks', (req, res) => {
        let today = moment(new Date()).format('M/D/YYYY');
        if(today!=tasks.lastStatusUpdate){
            // this ensures that the appropriate statuses are being returned
            // without needlessly calling this function every time there is a 
            // get.
            tasks.updateAllStatuses(today);
        }
        let filter = parseInt(req.query.filter);
        let tasksToSend;
        if(filter !== -1){
            tasksToSend = tasks.getTasks(filter, today);
        } else {
            tasksToSend = tasks.getTasks();
        }
        res.json(tasksToSend);
    });

    app.post('/tasks', (req, res) => {
        let today = moment(new Date()).format('M/D/YYYY');
        let task = new Task(req.body.name, req.body.description, moment(req.body.due, 'M/D/YYYY').format('M/D/YYYY'));
        let result = tasks.addTask(task);
        tasks.updateStatus(task, today);
        res.json(tasks.list);
    });

    app.put('/tasks/:id', (_req, _res) => {
        var id = _req.body.id;
        let today = moment(new Date()).format('M/D/YYYY');

        let toUpdate = tasks.getTask(id);
        if(toUpdate){
            toUpdate.update(_req.body.name, _req.body.description, moment(_req.body.due, 'M/D/YYYY').format('M/D/YYYY'), _req.body.completed === 'true');
            tasks.updateStatus(toUpdate, today);
            
            _res.json(tasks.list);
        }
        else{
            _res.json({error: 'Failed to update id ' + id});
        }
    });

    app.delete('/tasks/:id', (_req, _res) => {
        let today = moment(new Date()).format('M/D/YYYY');
        if(today!=tasks.lastStatusUpdate){
            tasks.updateAllStatuses(today);
        }
        var id = _req.body.id;
        tasks.removeTask(id);
        _res.json(tasks.list);
    })
}