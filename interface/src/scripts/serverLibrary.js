const { getRequest, postRequest, putRequest, deleteRequest } = require('./RESTFunctions');

const get = {
    tasks: (_data, _callbacks) => { 
        getRequest('tasks', _data, _callbacks); 
    },
    task: (_id, _data, _callbacks) => {
        getRequest('tasks/' + _id, _data, _callbacks);
    },
    filteredTasks: (_filter, _data, _callbacks) => {
        getRequest('tasks?filter=' + _filter, _data, _callbacks);
    }
}

const post = {
    task: (_data, _callbacks) => {
        postRequest('tasks', _data, _callbacks);
    }
}

const put = {
    task: (_id, _data, _callbacks) => {
        putRequest('tasks/' + _id, _data, _callbacks);
    }
}

const del = {
    task: (_id, _data, _callbacks) => {
        deleteRequest('tasks/' + _id, _data, _callbacks);
    }
}

module.exports = {
    get,
    post,
    put,
    del
}