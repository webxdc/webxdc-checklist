const kDefaultRoute = require('./ui-behaviour.js').OLSKControllerRoutes().shift();

describe('AppMain_Order', function () {
	
	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	const items = [
		Math.random().toString(),
		Math.random().toString(),
		Math.random().toString(),
	];
	const itemUpdate = Math.random().toString();

	context('create', function () {
		
		items.forEach(function (response) {

			before(function () {
				return browser.click(AppCreateButton);
			});

			before(function () {
				return browser.fill(AppCreateField, response);
			});
			
			before(function () {
				return browser.click(AppCreateButton);
			});

		});

		it('places recent at the top', function () {
			browser.assert.text(AppMessage, items.reverse().join(''));
		});
	
	});
	
});
