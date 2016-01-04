var PageController = Backbone.View.extend({
	initialize: function(options){
		this.render(options.letter);
	},
	render: function(letter){
		var template = Handlebars.compile(_TEMPLATES['helloBundle::page.html']);
		this.$el.html( template({letter: letter}) );
	}
});