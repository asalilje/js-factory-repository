var dom = require("./domManager");
var repos = require("./repositoryFactory");

repos.users.get(1, setUser);

function setUser(user) {
    if (user)
        dom(".userlist").addListItem(user.name, user.id);
}

