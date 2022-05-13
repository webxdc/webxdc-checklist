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
			browser.assert.text(AppMessageName, items.reverse().join(''));
		});
	
	});

	context('update', function () {

		before(function () {
			return browser.click(`${ AppMessageName }:nth-of-type(1)`);
		});
		
		before(function () {
			return browser.fill(AppMessageUpdateField, itemUpdate);
		});
		
		before(function () {
			return browser.click(AppMessageUpdateButton);
		});
		
		it('maintains order', function () {
			browser.assert.text(AppMessageName, [itemUpdate, items[1], items[2]].join(''));
		});
	
	});

	context.skip('alternate board update', function () {

		const item = Math.random().toString();
		
		before(function() {
			return browser.OLSKVisit(require('./ui-behaviour.js').OLSKControllerRoutes().pop());
		});

		before(function () {
			return browser.fill(AppCreateField, item);
		});
		
		before(function () {
			return browser.click(AppCreateButton);
		});

		it('maintains order', function () {
			browser.assert.text(AppMessageName, [item, itemUpdate].join
				(''));
		});
	
	});
	
});
