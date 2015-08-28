require('jquery');

jQuery(document).ready(execute());

function execute() {
    jQuery("body").append("<div class='hello'>Hello World!</div>");
    alert("Hello World!");
}