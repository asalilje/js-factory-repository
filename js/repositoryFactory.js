
var repositoryFactory = function() {

    var repos = this;
    var repositories = [
        {name: "users", source: require("./userRepository")},
        {name: "cats", source: require("./catRepository")},
        {name: "colours", source: require("./colourRepository")}
    ];


    repositories.forEach(function(repo) {
       repos[repo.name] = repo.source();
    });

};

module.exports = new repositoryFactory();
