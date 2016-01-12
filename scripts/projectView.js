var projectView = {};

projectView.populateFilters = function() {
  $('project').each(function() {
    if (!$(this).hasClass('template')) {
      var val = $(this).attr('data-category');
      optionTag = '<option value="' + val + '">' + val + '</option>';
      if ($('#category-filter option[value="' + val + '"]').length === 0) {
        $('#category-filter').append(optionTag);
      }
    }
  });
};

projectView.handleCategoryFilter = function() {
  $('#category-filter').on('change', function() {
    if ($(this).val()) {
      $('project').hide();
      $('project[data-category="' + $(this).val() + '"]').fadeIn();
    } else {
      $('project').fadeIn();
      $('project.template').hide();
    }
  });
};

projectView.handleMainNav = function() {
  $('.main-nav').on('click', '.tab', function(e) {
    $('.tab-content').hide();
    $('#' + $(this).data('content')).fadeIn();
  });

  $('.main-nav .tab:first').click(); // Let's now trigger a click on the first .tab element, to set up the page.
};

projectView.setTeasers = function() {
  $('.project-body *:nth-of-type(n+2)').hide(); // Hide elements beyond the first 2 in any artcile body.

  $('#projects').on('click', 'a.read-on', function(e) {
    e.preventDefault();
    $(this).parent().find('*').fadeIn();
    $(this).hide();
  });
};

projectView.watchNewForm = function() {
  $('#new-form').on('change', 'input, textarea', projectView.buildPreview);
};


projectView.buildPreview = function() {
  $('#projects').empty();

  var project = projectView.buildArticle();
  $('#projects').append(project.toHtml());

  projectView.exportJSON();
};

projectView.buildArticle = function() {
  return new Project({
    title: $('#project-title').val(),
    category: $('#project-category').val(),
    body: $('#project-body').val(),
    date: $('#project-date').val()
  });
};

projectView.exportJSON = function() {
  $('#export-field').show();
  $('#project-json').val(JSON.stringify(projectView.buildArticle()) + ',');
};

$(document).ready(function() {
  projectView.populateFilters();
  projectView.handleCategoryFilter();
  projectView.handleMainNav();
  projectView.setTeasers();
projectView.watchNewForm();
})