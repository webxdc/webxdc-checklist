const kDefaultRoute = require('./ui-behaviour.js').OLSKControllerRoutes().shift();

Object.entries({
	AppHeading: '.AppHeading',
	AppCreate: '.AppCreate',
	AppCreateField: '#AppCreateField',
	AppCreateButton: '.AppCreateButton',
	AppItems: '#AppItems',
	AppMessage: '.AppMessage',
	AppMessageName: '.AppMessageName',
	AppMessageUpdateField: '.AppMessageUpdateField',
	AppMessageUpdateButton: '.AppMessageUpdateButton',
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

	it('shows AppCreateField', function() {
		browser.assert.elements(AppCreateField, 1);
	});

	it('shows AppCreateButton', function () {
		browser.assert.elements(AppCreateButton, 1);
	});

	it('shows AppItems', function () {
		browser.assert.elements(AppItems, 1);
	});

	it('hides AppMessage', function () {
		browser.assert.elements(AppMessage, 0);
	});

	it('hides AppMessageName', function () {
		browser.assert.elements(AppMessageName, 0);
	});

	it('hides AppMessageUpdateField', function() {
		browser.assert.elements(AppMessageUpdateField, 0);
	});

	it('hides AppMessageUpdateButton', function () {
		browser.assert.elements(AppMessageUpdateButton, 0);
	});

	context('submit empty', function () {

		before(function () {
			return browser.click(AppCreateButton);
		});

		it('hides AppMessage', function () {
			browser.assert.elements(AppMessage, 0);
		});

		it('hides AppMessageName', function () {
			browser.assert.elements(AppMessageName, 0);
		});

		it('hides AppMessageUpdateField', function() {
			browser.assert.elements(AppMessageUpdateField, 0);
		});

		it('hides AppMessageUpdateButton', function () {
			browser.assert.elements(AppMessageUpdateButton, 0);
		});
	
	});

	context('submit filled', function () {

		before(function () {
			return browser.fill(AppCreateField, Math.random().toString());
		});
		
		before(function () {
			return browser.click(AppCreateButton);
		});

		it('shows AppMessage', function () {
			browser.assert.elements(AppMessage, 1);
		});

		it('shows AppMessageName', function () {
			browser.assert.elements(AppMessageName, 1);
		});

		it('hides AppMessageUpdateField', function() {
			browser.assert.elements(AppMessageUpdateField, 0);
		});

		it('hides AppMessageUpdateButton', function () {
			browser.assert.elements(AppMessageUpdateButton, 0);
		});
	
	});

	context('edit', function () {

		before(function () {
			return browser.click(AppMessageName);
		});
		
		it('shows AppMessage', function () {
			browser.assert.elements(AppMessage, 1);
		});

		it('hides AppMessageName', function () {
			browser.assert.elements(AppMessageName, 0);
		});

		it('shows AppMessageUpdateField', function() {
			browser.assert.elements(AppMessageUpdateField, 1);
		});

		it('shows AppMessageUpdateButton', function () {
			browser.assert.elements(AppMessageUpdateButton, 1);
		});
	
	});

	context('edit empty', function () {

		before(function () {
			return browser.fill(AppMessageUpdateField, '');
		});
		
		before(function () {
			return browser.click(AppMessageUpdateButton);
		});

		it('hides AppMessage', function () {
			browser.assert.elements(AppMessage, 0);
		});

		it('hides AppMessageUpdateField', function() {
			browser.assert.elements(AppMessageUpdateField, 0);
		});

		it('hides AppMessageUpdateButton', function () {
			browser.assert.elements(AppMessageUpdateButton, 0);
		});
	
	});

	after(function () {
		return browser.evaluate('window.clearXdcStorage()');
	});
	
});
