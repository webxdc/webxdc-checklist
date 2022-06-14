const kDefaultRoute = require('./ui-behaviour.js').OLSKControllerRoutes().shift();

describe('AppMain_Misc', function () {
	
	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('sets lang', function() {
		browser.assert.attribute('html', 'lang', 'en');
	});

	it('sets title', function() {
		browser.assert.text('title', 'webxdc-checklist');
	});

	it('sets encoding', function () {
		browser.assert.attribute('meta[http-equiv="Content-Type"]', 'content', 'text/html; charset=utf-8');
	});

	it('sets viewport', function () {
		browser.assert.attribute('meta[name="viewport"]', 'content', 'width=device-width');
	});

	describe('AppHeading', function test_AppHeading () {
		
		it('sets text', function () {
			browser.assert.text(AppHeading, 'webxdc-checklist');
		});
		
	});

	describe('AppCreate', function test_AppCreate () {
		
		it('classes AppListItemForm', function () {
			browser.assert.hasClass(AppCreate, 'AppListItemForm');
		});
		
	});

	describe('AppCreateField', function test_AppCreateField () {
		
		it('sets type', function () {
			browser.assert.attribute(AppCreateField, 'type', 'text');
		});
		
		it('sets placeholder', function () {
			browser.assert.attribute(AppCreateField, 'placeholder', 'Description');
		});
		
		it('sets autofocus', function () {
			browser.assert.attribute(AppCreateField, 'autofocus', '');
		});
		
		it('sets required', function () {
			browser.assert.attribute(AppCreateField, 'required', '');
		});

		it('classes AppListItemField', function () {
			browser.assert.hasClass(AppCreateField, 'AppListItemField');
		});
		
	});

	describe('AppCreateButton', function test_AppCreateButton () {
		
		it('sets type', function () {
			browser.assert.attribute(AppCreateButton, 'type', 'submit');
		});
		
		it('sets value', function () {
			browser.assert.attribute(AppCreateButton, 'value', 'Create');
		});

		it('classes AppListItemButton', function () {
			browser.assert.hasClass(AppCreateButton, 'AppListItemButton');
		});
		
	});

	describe('AppListItemName', function test_AppListItemName () {

		const item = Math.random().toString();
		
		before(function () {
			return browser.fill(AppCreateField, item);
		});
		
		before(function () {
			return browser.click(AppCreateButton);
		});
		
		it('sets text', function () {
			browser.assert.text(AppListItemName, item);
		});

		context('click', function () {

			const item = Math.random().toString();

			before(function () {
				return browser.click(AppListItemName);
			});
			
			before(function () {
				return browser.fill(AppListItemUpdateField, item);
			});
			
			before(function () {
				return browser.click(AppListItemUpdateButton);
			});

			it('sets text', function () {
				browser.assert.text(AppListItemName, item);
			});
		
		});
		
	});

	describe('AppListItemToggle', function test_AppListItemToggle () {
		
		it('sets type', function () {
			browser.assert.attribute(AppListItemToggle, 'type', 'checkbox');
		});

		context('check', function () {
			
			before(function () {
				return browser.check(AppListItemToggle);
			});
			
			it('classes AppListItemDone', function () {
				browser.assert.hasClass(AppListItem, 'AppListItemDone');
			});
		
		});

		context('uncheck', function () {
			
			before(function () {
				return browser.uncheck(AppListItemToggle);
			});
			
			it('classes AppListItemDone', function () {
				browser.assert.hasNoClass(AppListItem, 'AppListItemDone');
			});
		
		});
		
	});

	context('edit', function () {
		
		let item;

		before(function () {
			item = browser.query(AppListItemName).textContent;
		});
		
		before(function () {
			return browser.click(AppListItemName);
		});
		
		describe('AppListItemUpdateField', function test_AppListItemUpdateField () {
			
			it('sets type', function () {
				browser.assert.attribute(AppListItemUpdateField, 'type', 'text');
			});
			
			it('sets value', function () {
				browser.assert.attribute(AppListItemUpdateField, 'value', item);
			});
			
			it('sets autofocus', function () {
				browser.assert.attribute(AppListItemUpdateField, 'autofocus', '');
			});

			it('classes AppListItemField', function () {
				browser.assert.hasClass(AppListItemUpdateField, 'AppListItemField');
			});
			
		});

		describe('AppListItemUpdateButton', function test_AppListItemUpdateButton () {
			
			it('sets type', function () {
				browser.assert.attribute(AppListItemUpdateButton, 'type', 'submit');
			});
			
			it('sets value', function () {
				browser.assert.attribute(AppListItemUpdateButton, 'value', 'Update');
			});

			it('classes AppListItemButton', function () {
				browser.assert.hasClass(AppListItemUpdateButton, 'AppListItemButton');
			});
			
		});
	
	});

	after(function () {
		return browser.evaluate('window.clearXdcStorage()');
	});
	
});
