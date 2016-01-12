var porjects = [];

function Project (opts) {
  this.title = opts.title;
  this.category = opts.category;
  this.body = opts.body;
  this.date = opts.date;
}

Project.prototype.toHtml = function() {
  // TODO: Use handlebars to render your articles.
  //       - Get your template from the DOM.
  //       - Now "compile" your template with Handlebars.
  var appTemplate = $('#project-template').html();
  var compiledTemplate = Handlebars.compile(appTemplate);

  // TODO: Use the function that Handlebars gave you to return your filled-in html template for THIS article.
  return compiledTemplate(this);
};

rawData.sort(function(a,b) {
  return (new Date(b.date)) - (new Date(a.date));
});

rawData.forEach(function(ele) {
  porjects.push(new Project(ele));
})

porjects.forEach(function(a){
  $('#projects').append(a.toHtml())
});