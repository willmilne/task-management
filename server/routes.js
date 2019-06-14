// routes.js contains all of the REST routes required for the application.
// as this begins to grow beyond tasks, it could be separated out to taskRoutes and workerRoutes, etc.

const { Task } = require('./models/Task');
const moment = require('moment');

module.exports = (app, tasks) => {
    app.get('/tasks', (req, res) => {
        console.log('getting tasks');
        res.json(tasks.list);
    });

    app.get('/tasks/:task_id', (req, res) => {
        console.log('returning specific task');

    });

    app.post('/tasks', (req, res) => {
        let task = new Task(req.body.name, req.body.description, moment(req.body.due, 'M/D/YYYY').format('M/D/YYYY'));
        let result = tasks.addTask(task);
        res.json(tasks.list);
    });
}