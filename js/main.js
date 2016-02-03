var dom = require("./domManager");
var repos = require("./repositoryFactory");

repos.users.list(listUsers);
repos.cats.list(listCats);
repos.colours.list(listColours);
repos.colours.get("magenta", showColour);


function listUsers(users) {
    users.forEach(function(user) {
        dom(".userList").addListItem(user.name, user.id);
    });
}

function listCats(cats) {
    var catsWithImages = cats.filter(function(cat) {
        return "image" in cat;
    });

    catsWithImages.forEach(function(cat) {
        dom(".catList").addHtml('<div><img src="' + cat.image + '"></div>');
    });
}

function listColours(colours) {
    for (var colour in colours) {
        dom(".colourList").addHtml('<div><b style="color: ' + colours[colour] + '">' + colour + '</b></div>');
    }
}

function showColour(hexColour) {
    dom(".bestColour").element.style.backgroundColor = hexColour;
}
