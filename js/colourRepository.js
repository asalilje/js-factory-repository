var ajax = require("./ajax");

var colourRepository = function () {

    var colours = {
        magenta: "#FF00FF",
        maroon: "#B03060",
        mediumturquoise: "#48D1CC",
        palegreen: "#98FB98",
        cadetblue: "#5F9EA0",
        chocolate: "#D2691E",
        darkorchid: "#9932CC",
        darkslategray: "#2F4F4F",
        firebrick: "#B22222"
    };

    var get = function (colourName, callback) {
        for (var colour in colours) {
            if (colour === colourName) {
                callback(colours[colour]);
            }
        }
    };

    var list = function (callback) {
        callback(colours);
    };

    return {
        get: get,
        list: list
    };
};

module.exports = colourRepository;
