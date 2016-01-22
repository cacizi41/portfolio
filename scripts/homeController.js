(function(module) {
  var homeController = {};

  homeController.index = function() {
    $('#home').show().siblings().hide();

    // DONE: Call a function to load all the data.
    // Pass a view function as a callback, so the view will render after the data is loaded.
    repos.requestRepos(repoView.index);
  };

  module.homeController = homeController;
})(window);
