Handlebars.registerHelper('include', function(name, json) {
	var template = Handlebars.compile(_TEMPLATES[name]);
	var html = template(json);
	return new Handlebars.SafeString(html);
});