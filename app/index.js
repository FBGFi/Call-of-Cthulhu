const { app, BrowserWindow } = require('electron')

function createWindow () {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1920,
    height:1080,
    tabbingIdentifier: "cthulhu",
    icon: "./app/images/icon.ico",
    backgroundColor: '#111',
    nodeIntegration: true,
    webPreferences: {
      nodeIntegration: true,
      webviewTag: true
    }
  })

  // and load the index.html of the app.
  win.loadFile('app/index.html');

  // Open the DevTools.
  
  win.webContents.openDevTools()
  // win.setMenu(null);

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.