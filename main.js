const { app, BrowserWindow } = require('electron')

app.disableHardwareAcceleration();

// attempt to control browserZoom

let win;

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1366, 
    height: 768,
    backgroundColor: '#ffffff',
    webPreferences: { zoomFactor: 0.6 }
  })

  //win.loadURL(`file:/home/lenovo/pipeline/web/dist/index.html`)
  win.loadFile(`dist/index.html`)
  
  //// uncomment below to open the DevTools.
  //win.webContents.openDevTools()

  // Event when the window is closed.
  win.on('closed', function () {
    win = null
  })
}

// Create window on electron intialization
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {

  // On macOS specific close process
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // macOS specific close process
  
  if (win === null) {
    createWindow()
  }
})

