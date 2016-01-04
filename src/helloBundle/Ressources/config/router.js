_ROUTES.push({
	path: '',
	name: 'home',
	callback: function() {
	    new HomeController({
	    	el: $('body')
	    });
	}
});

_ROUTES.push({
	path: 'demo/page:letter',
	name: 'demopage',
	callback: function(letter) {
	    new PageController({
	    	el: $('body'),
	    	letter: letter
	    });
	}
});
