// routes.js contains all of the REST routes required for the application.
// as this begins to grow beyond tasks, it could be separated out to taskRoutes and workerRoutes, etc.

module.exports = (app, tasks) => {
    app.get('/tasks', (req, res) => {
        console.log('getting tasks');
        res.json(tasks.list);
    });

    app.get('/tasks/:task_id', (req, res) => {
        console.log('returning specific task');

    });

    app.post('/tasks', (req, res) => {
        console.log('app.post');
        console.log(req.body);
        tasks.addTask(req.body.name, req.body.description, Date.parse(req.body.due));
        res.json(tasks);
    });
}