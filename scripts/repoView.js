(function(module) {
  var repoView = {};

  // DONE: Private methods declared here live only within the scope of the wrapping IIFE.
  var ui = function() {
    var $home = $("#home"); // Best practice: Cache the DOM query if it's used more than once.

    $home.find("ul").empty();
    $home.show().siblings().hide();
  };

  // DONE: How do you want to render a single repo as html? Return your filled in HTML template.
  var render = function(repo) {
    console.log("hello");
    return repo.html_url ;
  };

  // DONE: If all the data is loaded, we can prep the UI and render the repos.
  repoView.index = function() {
    ui();
    // The jQuery `append` method lets us append an entire array of HTML elements at once,
    // So we can use a little FP to transform our data-set into DOM nodes:
    $("#home ul").append(
      repos.with("full_name").map(render)
    );
  };

  module.repoView = repoView;
})(window);
