_ROUTES = [];

$(document).ready(function(){

	var extended = {
		routes : {}
	};

	var routes = {};
	for (var i = 0; i < _ROUTES.length; i++) {
		var path = _ROUTES[i].path;
		var name = _ROUTES[i].name;
		var callback = _ROUTES[i].callback;

		if (path[0] === '*')
			continue;
		extended.routes[path] = name;
		extended[name] = callback;
	}
	for (var i = 0; i < _ROUTES.length; i++) {
		var path = _ROUTES[i].path;
		var name = _ROUTES[i].name;
		var callback = _ROUTES[i].callback;

		if (path[0] !== '*')
			continue;
		extended.routes[path] = name;
		extended[name] = callback;
	}

	var AppRouter = Backbone.Router.extend(extended);

	new AppRouter;

	Backbone.history.start();
});