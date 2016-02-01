
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
