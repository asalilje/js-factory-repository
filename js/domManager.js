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


