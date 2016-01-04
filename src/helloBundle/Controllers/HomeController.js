var HomeController = Backbone.View.extend({
	initialize: function(){
		this.render();
	},
	render: function(){
		var template = Handlebars.compile(_TEMPLATES['helloBundle::main.html']);
		this.$el.html( template );
	}
});