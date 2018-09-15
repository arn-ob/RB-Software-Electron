const {
  app,
  BrowserWindow,
  Menu
} = require('electron')
const path = require('path')
const url = require('url')
const ProgressBar = require('electron-progressbar');

let win

function createWindow() {}

// var menu = Menu.buildFromTemplate([{
//   label: 'Exit',
//   click() {
//     app.quit()
//   }
// }])


app.on('ready', () => {

  var progressBar = new ProgressBar({
    title: 'RB Web',
    text: 'Downloading Web Content',
    detail: 'Loading'
  });

  let main = null

  main = new BrowserWindow({
    height: 768,
    width: 1366,
    show: false,
    frame: true
  })

  // main.setFullScreen(true);
  main.setMenuBarVisibility(false);  // hide the menu

  main.webContents.once('dom-ready', () => {

    progressBar.setCompleted();
    
    // console.log('main loaded')
    main.show()
    // Menu.setApplicationMenu(menu);

  })

  // long loading html
  main.loadURL('http://web.revolution-bd.com')

  progressBar.on('completed', function () {
    progressBar.detail = 'Finish';
  })
})

app.commandLine.appendSwitch('disable-web-security');

// app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})