const { Tasks } = require('./models/Tasks');
var cors = require('cors');

var express = require('express');
var app = express();
app.use(cors());
var bodyParser = require('body-parser');
var port = process.env.PORT || 8080;

//app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
console.log('creating tasks');
let tasks = new Tasks();

tasks.list = {
    0: {
        "id": 0,
        "name": "Task name!!",
        "due": "6/11/2019",
        "description": "Short task description.",
        "completed": false
    },
    1: {
        "id": 1,
        "name": "Task name!!",
        "due": "6/14/2019",
        "description": "This is a description of the task.  It is a pretty cool task, and has lots of words explaining how to do it, wow.  Very cool friend.",
        "completed": true
    },
    2: {
        "id": 2,
        "name": "Another task name",
        "due": "6/14/2019",
        "description": "This is a description of the task.  It is a pretty cool task, and has lots of words explaining how to do it, wow.  Very cool friend.",
        "completed": false
    }
}

app.use(bodyParser.urlencoded({
    extended: true
}));

require('./routes.js')(app, tasks);

app.listen(port);
console.log('App listening on port ' + port);

module.exports = app;