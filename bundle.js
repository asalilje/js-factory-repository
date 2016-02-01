(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var ajax = function() {

    var makeRequest = function (method, url) {
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open(method, url);
            xhr.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    resolve(xhr.response);
                }
                else {
                    reject({
                        status: this.status,
                        statusText: xhr.statusText
                    })
                }
            };
            xhr.onerror = function () {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            };
            xhr.send();
        });
    };

    return {
        makeRequest: makeRequest
    }
};

module.exports = ajax();

},{}],2:[function(require,module,exports){
var DomManager = function(selector) {
    this.element = document.querySelector(selector);
};

DomManager.prototype.addListItem = function(text, value) {
    var li = document.createElement("li");
    li.setAttribute("value", value);
    var text = document.createTextNode(text);
    li.appendChild(text);
    this.element.appendChild(li);
};

module.exports = function(selector) {
    return new DomManager(selector);
};



},{}],3:[function(require,module,exports){
var dom = require("./domManager");
var repos = require("./repositoryFactory");

repos.users.get(1, setUser);

function setUser(user) {
    if (user)
        dom(".userlist").addListItem(user.name, user.id);
}



},{"./domManager":2,"./repositoryFactory":4}],4:[function(require,module,exports){

var repositoryFactory = function() {

    var repos = this;
    var repositories = [
        {name: "users", source: require("./userRepository")}
    ];

    var user = require("./userRepository");
    repositories.forEach(function(repo) {
       repos[repo.name] = repo.source();
    });

};

module.exports = new repositoryFactory();

},{"./userRepository":5}],5:[function(require,module,exports){
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
                console.error('Augh, there was an error!', err.statusText);
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

},{"./ajax":1}]},{},[1,2,3,4,5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9hamF4LmpzIiwianMvZG9tTWFuYWdlci5qcyIsImpzL21haW4uanMiLCJqcy9yZXBvc2l0b3J5RmFjdG9yeS5qcyIsImpzL3VzZXJSZXBvc2l0b3J5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgYWpheCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyIG1ha2VSZXF1ZXN0ID0gZnVuY3Rpb24gKG1ldGhvZCwgdXJsKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgICAgICB4aHIub3BlbihtZXRob2QsIHVybCk7XG4gICAgICAgICAgICB4aHIub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXR1cyA+PSAyMDAgJiYgdGhpcy5zdGF0dXMgPCAzMDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh4aHIucmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogdGhpcy5zdGF0dXMsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXNUZXh0OiB4aHIuc3RhdHVzVGV4dFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB4aHIub25lcnJvciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHRoaXMuc3RhdHVzLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXNUZXh0OiB4aHIuc3RhdHVzVGV4dFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHhoci5zZW5kKCk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBtYWtlUmVxdWVzdDogbWFrZVJlcXVlc3RcbiAgICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGFqYXgoKTtcbiIsInZhciBEb21NYW5hZ2VyID0gZnVuY3Rpb24oc2VsZWN0b3IpIHtcbiAgICB0aGlzLmVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbn07XG5cbkRvbU1hbmFnZXIucHJvdG90eXBlLmFkZExpc3RJdGVtID0gZnVuY3Rpb24odGV4dCwgdmFsdWUpIHtcbiAgICB2YXIgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG4gICAgbGkuc2V0QXR0cmlidXRlKFwidmFsdWVcIiwgdmFsdWUpO1xuICAgIHZhciB0ZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGV4dCk7XG4gICAgbGkuYXBwZW5kQ2hpbGQodGV4dCk7XG4gICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKGxpKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oc2VsZWN0b3IpIHtcbiAgICByZXR1cm4gbmV3IERvbU1hbmFnZXIoc2VsZWN0b3IpO1xufTtcblxuXG4iLCJ2YXIgZG9tID0gcmVxdWlyZShcIi4vZG9tTWFuYWdlclwiKTtcbnZhciByZXBvcyA9IHJlcXVpcmUoXCIuL3JlcG9zaXRvcnlGYWN0b3J5XCIpO1xuXG5yZXBvcy51c2Vycy5nZXQoMSwgc2V0VXNlcik7XG5cbmZ1bmN0aW9uIHNldFVzZXIodXNlcikge1xuICAgIGlmICh1c2VyKVxuICAgICAgICBkb20oXCIudXNlcmxpc3RcIikuYWRkTGlzdEl0ZW0odXNlci5uYW1lLCB1c2VyLmlkKTtcbn1cblxuXG4iLCJcbnZhciByZXBvc2l0b3J5RmFjdG9yeSA9IGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyIHJlcG9zID0gdGhpcztcbiAgICB2YXIgcmVwb3NpdG9yaWVzID0gW1xuICAgICAgICB7bmFtZTogXCJ1c2Vyc1wiLCBzb3VyY2U6IHJlcXVpcmUoXCIuL3VzZXJSZXBvc2l0b3J5XCIpfVxuICAgIF07XG5cbiAgICB2YXIgdXNlciA9IHJlcXVpcmUoXCIuL3VzZXJSZXBvc2l0b3J5XCIpO1xuICAgIHJlcG9zaXRvcmllcy5mb3JFYWNoKGZ1bmN0aW9uKHJlcG8pIHtcbiAgICAgICByZXBvc1tyZXBvLm5hbWVdID0gcmVwby5zb3VyY2UoKTtcbiAgICB9KTtcblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgcmVwb3NpdG9yeUZhY3RvcnkoKTtcbiIsInZhciBhamF4ID0gcmVxdWlyZShcIi4vYWpheFwiKTtcblxudmFyIHVzZXJSZXBvc2l0b3J5ID0gZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIgZ2V0ID0gZnVuY3Rpb24oaWQsIGNhbGxiYWNrKSB7XG4gICAgICAgIGFqYXgubWFrZVJlcXVlc3QoJ0dFVCcsICd1c2Vycy5qc29uJylcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICAgICAgdmFyIHVzZXJzID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICAgICAgICAgICAgICB2YXIgdXNlciA9IHVzZXJzLmZpbHRlcihmdW5jdGlvbih1c2VyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1c2VyLmlkID09PSBpZDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAodXNlci5sZW5ndGggPiAwKVxuICAgICAgICAgICAgICAgICAgICB1c2VyID0gdXNlclswXTtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayh1c2VyKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0F1Z2gsIHRoZXJlIHdhcyBhbiBlcnJvciEnLCBlcnIuc3RhdHVzVGV4dCk7XG4gICAgICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgdmFyIHNhdmUgPSBmdW5jdGlvbih1c2VyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwic2F2aW5nIHVzZXIgaWQgXCIgKyB1c2VyLmlkKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0OiBnZXQsXG4gICAgICAgIHNhdmU6IHNhdmVcbiAgICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB1c2VyUmVwb3NpdG9yeTtcbiJdfQ==
