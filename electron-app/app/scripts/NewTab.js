const { BrowserWindow } = require('electron')

let child = new BrowserWindow({ parent: top, modal: true, show: false })
child.loadURL('./index.js');
child.once('ready-to-show', () => {
  child.show()
});

module.exports = child;