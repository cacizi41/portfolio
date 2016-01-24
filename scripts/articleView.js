(function(module){

  var articleView = {};

  articleView.populateFilters = function() {
    $('article').each(function() {
      if (!$(this).hasClass('template')) {
        val = $(this).attr('data-category');
        optionTag = '<option value="' + val + '">' + val + '</option>';
        if ($('#category-filter option[value="' + val + '"]').length === 0) {
          $('#category-filter').append(optionTag);
        }
      }
    });
  };

  articleView.watchNewForm = function() {
    $('#new-form').on('change', 'input, textarea', articleView.buildPreview);
  };


  articleView.buildPreview = function() {
    $('#home').empty();

    var project = articleView.buildArticle();
    $('#home').append(project.toHtml());

    articleView.exportJSON();
  };

  articleView.buildArticle = function() {
    return new Project({
      title: $('#project-title').val(),
      category: $('#project-category').val(),
      date: $('#project-date').val(),
      body: $('#project-body').val()
    });
  };

  articleView.handleCategoryFilter = function() {
    $('#category-filter').on('change', function() {
      if ($(this).val()) {
        $('article').hide();
        $('article[data-category="' + $(this).val() + '"]').fadeIn();
      } else {
        $('article').fadeIn();
        $('article.template').hide();
      }
      $('#author-filter').val('');
    });
  };

  articleView.handleMainNav = function() {
    $('.main-nav').on('click', '.tab', function(e) {
      $('.tab-content').hide();
      $('#' + $(this).data('content')).fadeIn();
    });

    $('.main-nav .tab:first').click();
  };

  articleView.setTeasers = function() {
    $('.project-body *:nth-of-type(n+2)').hide();

    $('#home').on('click', 'a.read-on', function(e) {
      e.preventDefault();
      $(this).parent().find('*').fadeIn();
      $(this).hide();
    });
  };

  articleView.exportJSON = function() {
    $('#export-field').show();
    $('#project-json').val(JSON.stringify(articleView.buildArticle()) + ',');
  };

  articleView.initIndexPage = function() {
    Project.all.forEach(function(a) {
      $('#home').append(a.toHtml());
    });
    articleView.populateFilters();
    articleView.handleCategoryFilter();
    articleView.handleMainNav();
    articleView.setTeasers();
  };

  articleView.initNewArticlePage = function() {
    articleView.watchNewForm();
  };

  module.articleView = articleView ;
})(window);
