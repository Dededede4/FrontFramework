_ROUTES.push({
	path: '*notFound',
	name: 'notFound',
	callback: function() {
	    new E404Controller({
	    	el: $('body')
	    });
	}
});
