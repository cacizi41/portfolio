(function(module){
  function Project (opts) {
    this.title = opts.title;
    this.category = opts.category;
    this.body = opts.body;
    this.date = opts.date;
  }

  Project.all = [];

  Project.prototype.toHtml = function() {
    var template = Handlebars.compile($('#project-template').text());
    this.daysAgo = parseInt((new Date() - new Date(this.date))/60/60/24/1000);
    this.body = marked(this.body);

    return template(this);
  };
  // var $newProject = $('article.template').clone();
  // $newProject.removeClass('template');
  // $newProject.attr('data-category', this.category);
  // $newProject.data('title', this.title);
  // $newProject.data('category', this.category);
  // $newProject.data('body', this.body);
  // $newProject.data('date', this.date);
  //
  // $newProject.find('h2').html(this.title);
  // $newProject.find('.byline a').html(this.category);
  // $newProject.find('.project-body').html(this.body);
  // $newProject.find('time').html('about ' + parseInt((new Date() - new Date(this.date))/60/60/24/1000) + ' days ago');
  // return $newProject;

  Project.loadAll = function(rawData){
    rawData.sort(function(a,b) {
      return (new Date(b.date)) - (new Date(a.date));
    });
    Project.all = rawData.map(function(ele){
      return new Project(ele);
    });
  };

  Project.fetchAll = function(){
    if(localStorage.rawData) {
      Project.loadAll(JSON.parse(localStorage.rawData));
    } else {
      $.getJSON('/scripts/projectData.json', function(rawData) {
        Project.loadAll(rawData);
        localStorage.rawData = JSON.stringify(rawData);
      });
    }
    articleView.initIndexPage();
  };

  module.Project = Project;
})(window);
