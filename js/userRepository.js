var ajax = require("./ajax");

var userRepository = function() {

    var get = function(id, callback) {
        ajax.makeRequest('GET', 'users.json')
            .then(function (data) {
                var users = JSON.parse(data);
                var user = users.filter(function(user) {
                    return user.id === id;
                });
                if (user.length > 0)
                    user = user[0];
                callback(user);
            })
            .catch(function (err) {
                console.error('Ouch, there was an error!', err.statusText);
            });
    };

    var list = function(callback) {
        ajax.makeRequest('GET', 'users.json')
            .then(function (data) {
                var users = JSON.parse(data);
                callback(users);
            })
            .catch(function (err) {
                console.error('Ouch, there was an error!', err.statusText);
            });
    };

    var save = function(user, callback) {
        ajax.makeRequest('POST', 'users.json', {'id': user.id, 'name': user.name})
            .then(function (data) {
                callback("saving user id " + user.id);
            })
            .catch(function (err) {
                console.error('Ouch, there was an error!', err.statusText);
            });
    };

    return {
        get: get,
        list: list,
        save: save
    };
};

module.exports = userRepository();
