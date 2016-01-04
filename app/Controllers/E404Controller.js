var E404Controller = Backbone.View.extend({
	initialize: function(){
		this.render();
	},
	render: function(){
		var template = Handlebars.compile(_TEMPLATES['::404.html']);
		this.$el.html( template );
	}
});