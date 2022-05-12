const kDefaultRoute = require('./ui-behaviour.js').OLSKControllerRoutes().shift();

Object.entries({
	AppHeading: '.AppHeading',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('AppMain_Access', function () {
	
	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('shows AppHeading', function () {
		browser.assert.elements(AppHeading, 1);
	});

	
	});

	after(function () {
		return browser.evaluate('window.clearXdcStorage()');
	});
	
});
