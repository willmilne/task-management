const $ = require('jquery');

// TODO: Make this configurable
let serverUrl = 'http://localhost:/4000/;'

const handleResponse = (_error, _callbacks) => {
    if (_error && _callbacks && _callbacks.failure) {
        _callbacks.failure(_res.message);
    }
    else {
        if (_callbacks && _callbacks.success) {
            _callbacks.success(_res);
        }
    }
};

const postRequest = (_postType, _data, _callbacks) => {
    $.ajax({
        type: 'POST',
        url: serverUrl + _postType,
        data: 'data=' + JSON.stringify(_data),
        success: (_res) => {
            handleResponse(_res.error, _callbacks);
        }, 
        error: (_err) => { 
            if(_callbacks && _callbacks.failure) {
                _callbacks.failure(_err);
            }
        }
    });
};

const getRequest = (_getType, _data, _callbacks) => {
    $.get(serverUrl + _getType, _data, (_res) => {
        handleResponse(_res.error, _callbacks);
    });
};

const putRequest = (_putType, _data, _callbacks) => {
    $.ajax({
        type: 'PUT',
        url: serverUrl + _putType,
        data: data,
        success: (_res) => {
            handleResponse(_res.error, _callbacks);
        }, 
        error: (_err) => { 
            if(_callbacks && _callbacks.failure) {
                _callbacks.failure(_err);
            }
        }
    });
}

const deleteRequest = (_deleteType, _data, _callbacks) => {
    $.ajax({
        type: 'DELETE',
        url: serverUrl + _deleteType,
        data: data,
        success: (_res) => {
            handleResponse(_res.error, _callbacks);
        }, 
        error: (_err) => { 
            if(_callbacks && _callbacks.failure) {
                _callbacks.failure(_err);
            }
        }
    });
}

module.exports = {
    postRequest,
    getRequest, 
    putRequest,
    deleteRequest
}