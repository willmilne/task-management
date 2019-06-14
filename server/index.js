const { Tasks } = require('./models/Tasks');
var cors = require('cors');

var express = require('express');
var app = express();
app.use(cors());
var bodyParser = require('body-parser');
var port = process.env.PORT || 8080;

//app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
let tasks = new Tasks();

app.use(bodyParser.urlencoded({
    extended: true
}));

require('./routes.js')(app, tasks);

app.listen(port);

module.exports = app;