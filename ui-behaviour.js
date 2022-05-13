const toDataURI = async function(inputData) {
  return new Promise(function (res, rej) {
    Object.assign(new FileReader(), {
      onload (e) {
        return res(e.target.result);
      }
    }).readAsDataURL(new Blob([inputData]));
  });
};

const toByteArray = async function(inputData) {
  return new Promise(function (res, rej) {
    const xhr = Object.assign(new XMLHttpRequest(), {
      responseType: 'arraybuffer',
      onload () {
        if (xhr.status !== 200) {
          return rej(new Error('problem!'));
        }

        res(new Uint8Array(xhr.response))
      },
    });
    xhr.open('GET', inputData);
    xhr.send();
  });
};

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

	// INTERFACE

	InterfaceEdit (index) {
		const item = mod._ValueDocument.items[index];

		const name = document.querySelector('#' + item.guid + ' .AppListItemName');
		name.remove();

		const form = document.createElement('form');
		form.classList.add('AppUpdate');
		form.classList.add('AppListItemForm');
		form.id = item.guid + '-form'
		form.innerHTML = `
		<input class="AppListItemUpdateField AppListItemField" type="text" value="${ item.text }" autofocus />
		<input class="AppListItemUpdateButton AppListItemButton" type="submit" value="Update" />`;
		form.onsubmit = function () {
			event.preventDefault();

			const response = document.querySelector(`#${ item.guid }-form .AppListItemUpdateField`).value;
			form.remove();

			if (!response.trim().length) {
				return mod.ControlDelete(index);
			}

			window[item.guid].appendChild(name);

			mod.ControlUpdate(index, response);
		};

		window[item.guid].appendChild(form);
	},

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
			})
		}));

		window.AppCreateField.value = '';
	},

	ControlToggle (index) {
		mod._StoreChange(Automerge.change(mod._ValueDocument, function (doc) {
			doc.items[index].done = !doc.items[index].done;
		}));
	},

	ControlUpdate (index, text) {
		mod._StoreChange(Automerge.change(mod._ValueDocument, function (doc) {
			doc.items[index].text = text;
		}));
	},

	ControlDelete (index) {
		mod._StoreChange(Automerge.change(mod._ValueDocument, function (doc) {
			doc.items.splice(index, 1);
		}));
	},

	_ControlJournal (payload) {
		info = window.webxdc.selfName + ' updated the list';
		window.webxdc.sendUpdate({
	    payload,
	    info,
		}, info);
	},

	async _StoreChange (inputData) {
		mod._ValueDocument = inputData;

		mod.ReactDocument(inputData);
		
		mod._ValueJournaledChanges.push(await toDataURI(Automerge.getLastLocalChange(inputData)));

		// throttle
			// journal
			mod._ControlJournal({
				changes: mod._ValueJournaledChanges,
			});
			mod._ValueJournaledChanges = [];
	},

	// MESSAGE

	async MessageDidArrive (inputData) {
		const changes = await Promise.all(inputData.payload.changes.map(toByteArray));
		mod.ReactDocument(mod._ValueDocument = Automerge.applyChanges(mod._ValueDocument, changes)[0]);
	},

	// REACT

	async ReactDocument (doc) {
		const list = document.querySelector('#AppList');
		list.innerHTML = '';
		doc.items && doc.items.forEach((item, index) => {
		  const element = document.createElement('li')
		  element.id = item.guid;
		  element.innerHTML = `<input class="AppListItemToggle" type="checkbox" onclick="AppBehaviour.ControlToggle(${ index });" ${ item.done ? 'checked' : '' } /> <span class="AppListItemName" onclick="AppBehaviour.InterfaceEdit(${ index });">${ item.text }</span>`;
		  element.classList.add('AppListItem');
		  if (item.done) {
			  element.classList.add('AppListItemDone');
		  }
		  list.appendChild(element);
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
