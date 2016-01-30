var projects = [];

function Project (opts) {
  this.title = opts.title;
  this.category = opts.category;
  this.body = opts.body;
  this.date = opts.date;
}

Project.prototype.toHtml = function() {
  var $newProject = $("article.template").clone();
  $newProject.removeClass("template");
  $newProject.attr("data-category", this.category);
  $newProject.data("title", this.title);
  $newProject.data("category", this.category);
  $newProject.data("body", this.body);
  $newProject.data("date", this.date);

  $newProject.find("h2").html(this.title);
  $newProject.find(".byline a").html(this.category);
  $newProject.find(".project-body").html(this.body);
  $newProject.find("time").html("about " + parseInt((new Date() - new Date(this.date))/60/60/24/1000) + " days ago");
  return $newProject;
};

rawData.sort(function(a,b) {
  return (new Date(b.date)) - (new Date(a.date));
});

rawData.forEach(function(ele) {
  projects.push(new Project(ele));
});

projects.forEach(function(a){
  $("#home").append(a.toHtml());
});
