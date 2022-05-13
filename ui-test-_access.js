const kDefaultRoute = require('./ui-behaviour.js').OLSKControllerRoutes().shift();

Object.entries({
	AppHeading: '.AppHeading',
	AppCreate: '.AppCreate',
	AppCreateField: '#AppCreateField',
	AppCreateButton: '.AppCreateButton',
	AppList: '#AppList',
	AppListItem: '.AppListItem',
	AppListItemName: '.AppListItemName',
	AppListItemUpdateField: '.AppListItemUpdateField',
	AppListItemUpdateButton: '.AppListItemUpdateButton',
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

	it('shows AppList', function () {
		browser.assert.elements(AppList, 1);
	});

	it('hides AppListItem', function () {
		browser.assert.elements(AppListItem, 0);
	});

	it('hides AppListItemName', function () {
		browser.assert.elements(AppListItemName, 0);
	});

	it('hides AppListItemUpdateField', function() {
		browser.assert.elements(AppListItemUpdateField, 0);
	});

	it('hides AppListItemUpdateButton', function () {
		browser.assert.elements(AppListItemUpdateButton, 0);
	});

	context('submit empty', function () {

		before(function () {
			return browser.click(AppCreateButton);
		});

		it('hides AppListItem', function () {
			browser.assert.elements(AppListItem, 0);
		});

		it('hides AppListItemName', function () {
			browser.assert.elements(AppListItemName, 0);
		});

		it('hides AppListItemUpdateField', function() {
			browser.assert.elements(AppListItemUpdateField, 0);
		});

		it('hides AppListItemUpdateButton', function () {
			browser.assert.elements(AppListItemUpdateButton, 0);
		});
	
	});

	context('submit filled', function () {

		before(function () {
			return browser.fill(AppCreateField, Math.random().toString());
		});
		
		before(function () {
			return browser.click(AppCreateButton);
		});

		it('shows AppListItem', function () {
			browser.assert.elements(AppListItem, 1);
		});

		it('shows AppListItemName', function () {
			browser.assert.elements(AppListItemName, 1);
		});

		it('hides AppListItemUpdateField', function() {
			browser.assert.elements(AppListItemUpdateField, 0);
		});

		it('hides AppListItemUpdateButton', function () {
			browser.assert.elements(AppListItemUpdateButton, 0);
		});
	
	});

	context('edit', function () {

		before(function () {
			return browser.click(AppListItemName);
		});
		
		it('shows AppListItem', function () {
			browser.assert.elements(AppListItem, 1);
		});

		it('hides AppListItemName', function () {
			browser.assert.elements(AppListItemName, 0);
		});

		it('shows AppListItemUpdateField', function() {
			browser.assert.elements(AppListItemUpdateField, 1);
		});

		it('shows AppListItemUpdateButton', function () {
			browser.assert.elements(AppListItemUpdateButton, 1);
		});
	
	});

	context('edit empty', function () {

		before(function () {
			return browser.fill(AppListItemUpdateField, '');
		});
		
		before(function () {
			return browser.click(AppListItemUpdateButton);
		});

		it('hides AppListItem', function () {
			browser.assert.elements(AppListItem, 0);
		});

		it('hides AppListItemUpdateField', function() {
			browser.assert.elements(AppListItemUpdateField, 0);
		});

		it('hides AppListItemUpdateButton', function () {
			browser.assert.elements(AppListItemUpdateButton, 0);
		});
	
	});

	after(function () {
		return browser.evaluate('window.clearXdcStorage()');
	});
	
});
