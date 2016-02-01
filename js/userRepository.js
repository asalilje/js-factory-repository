var ajax = require("./ajax");

var userRepository = function() {

    var get = function(id, callback) {
        ajax.makeRequest('GET', 'users.json')
            .then(function (data) {
                console.log(data);
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

    var save = function(user) {
        console.log("saving user id " + user.id);
    };

    return {
        get: get,
        save: save
    };
};

module.exports = userRepository;
