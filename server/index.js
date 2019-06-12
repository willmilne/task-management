const {Tasks} = require('./models/Tasks');

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = process.env.PORT || 8080;

//app.use(bodyParser.urlencoded({'extended':'true'}));
//app.use(bodyParser.json());
console.log('creating tasks');
let tasks = new Tasks();

require('./routes.js')(app, tasks);

app.listen(port);
console.log('App listening on port ' + port);

module.exports = app;