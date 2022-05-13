const Automerge = (typeof window === 'undefined' ? {} : window).Automerge || {
	init () {
		return {};
	},
	change (doc, callback) {
		callback(doc);
		return Object.assign({}, doc);
	},
	getLastLocalChange () {},
};

const mod = {

	OLSKControllerRoutes () {
		return [{
			OLSKRoutePath: '/#name=MainDevice&addr=MainDevice@local.host',
			OLSKRouteMethod: 'get',
			OLSKRouteSignature: 'AppMainRoute',
			OLSKRouteFunction (req, res, next) {
				return res.render(require('path').join(__dirname, 'index.html'));
			},
		}, {
			OLSKRoutePath: '/#name=PeerDevice&addr=PeerDevice@local.host',
			OLSKRouteMethod: 'get',
			OLSKRouteSignature: 'AppPeerRoute',
			OLSKRouteFunction (req, res, next) {
				return res.render(require('path').join(__dirname, 'index.html'));
			},
		}];
	},

	// VALUE

	_ValueDocument: Automerge.init(),
	_ValueJournaledChanges: [],

	// CONTROL

	ControlCreate (inputData) {
		if (!inputData.trim().length) {
			return;
		}

		const created = Date.now();

		mod._StoreChange(Automerge.change(mod._ValueDocument, function (doc) {
			if (!doc.items) {
		  	doc.items = [];
		  }

		  doc.items.unshift({
				guid: created.toString(36),
				text: inputData,
				done: false,
				created,
				creator: window.webxdc.selfAddr,
				editor: window.webxdc.selfAddr,
			})
		}));

		window.AppCreateField.value = '';
	},


	// MESSAGE

	async MessageDidArrive (inputData) {
		mod.ReactDocument(Automerge.applyChanges(mod._ValueDocument, await Promise.all(inputData.payload.changes.map(toByteArray)))[0]);
	},

	// REACT

	async ReactDocument (doc) {
		mod._ValueDocument = doc;

		let list = document.querySelector('#AppItems');
		list.innerHTML = '';
		doc.items && doc.items.forEach((item, index) => {
		  let element = document.createElement('div')
		  element.innerHTML = item.text;
		  element.classList.add('AppMessage');
		  element.style = item.done ? 'text-decoration: line-through' : ''
		  list.appendChild(element)

		  element.onclick = function () {
		  	mod.ControlToggle(index);
		  };
		})
	},

	// SETUP

	_SetupMethods () {
		return Object.keys(mod).filter(function (e) {
			return e.match(/^Setup/);
		});
	},

	SetupListener () {
		window.webxdc.setUpdateListener(mod.MessageDidArrive);
	},

	// LIFECYCLE

	LifecyclePageDidLoad () {
		return mod._SetupMethods().forEach(function (e) {
			return mod[e]();
		});
	},
};

if (typeof module !== 'undefined') {
	module.exports = mod;
}

AppBehaviour = mod;
