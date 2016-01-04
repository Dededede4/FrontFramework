Handlebars.registerHelper('is_page_active', function(path, options) {
	if (path == Backbone.history.getFragment())
	{
		return options.fn(this);
	}
});