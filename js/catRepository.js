var ajax = require("./ajax");

var catRepository = function() {

    var get = function(id, callback) {
        ajax.makeRequest('GET', 'cats.json')
            .then(function (data) {
                var cats = JSON.parse(data);
                var cat = cats.filter(function(cat) {
                    return cat.id === id;
                });
                if (cat.length > 0)
                    cat = cat[0];
                callback(cat);
            })
            .catch(function (err) {
                console.error('Ouch, there was an error!', err.statusText);
            });
    };

    var list = function(callback) {
        ajax.makeRequest('GET', 'cats.json')
            .then(function (data) {
                var cats = JSON.parse(data);
                callback(cats);
            })
            .catch(function (err) {
                console.error('Ouch, there was an error!', err.statusText);
            });
    };

    var save = function(cat, callback) {
        ajax.makeRequest('POST', 'cats.json', {'id': cat.id, 'name': cat.name, 'image': cat.image})
            .then(function (data) {
                callback("saving cat id " + cat.id);
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

module.exports = catRepository;
