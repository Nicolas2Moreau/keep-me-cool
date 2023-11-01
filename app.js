// const dotenv = require('dotenv');
// require('dotenv').config();
const { autoUpdater } = require('electron-updater');
const { app, BrowserWindow, dialog,ipcMain,webContents,IpcRenderer } = require('electron');
const path = require('path');
const si = require('systeminformation');
const os = require('os-utils');

// Fetch CPU usage
os.cpuUsage((v) => {
  console.log('CPU Usage:', v);
});
si.cpu()
  .then(data => console.log("si data"+data))
  .catch(error => console.error(error));


autoUpdater.setFeedURL({
  // url: 'https://github.com/Nicolas2Moreau/keep-me-cool/releases',
  provider: 'github',
  owner: 'Nicolas2Moreau',
  repo: 'keep-me-cool',
  // token: process.env.GITHUB_TOKEN,
});


if (require('electron-squirrel-startup')) {
  app.quit();
}
let appWindow
let appPath


const createChildWindow = () => {
  
  appWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    },
    options: {
      fullscreen: true
    }
  });
  console.error("cooucou");
  // and load the index.html of the app.
  appWindow.loadFile('./ng-cool/dist/ng-cool/index.html')
  appWindow.on('closed', function () {
    // appWindow = null
  })
  // appWindow.webContents. 
  // appWindow.setMenu(null);


  appWindow.setFullScreen(false);
  appWindow.maximize();
  appWindow.webContents.on('dom-ready', () => {
    // Now it's safe to interact with appWindow
  appWindow.webContents.send('main-window-ready');
   
  });

  ipcMain.on('request-cpu-temperature', (event) => {
    console.error("cooucou de la temp");
    si.cpuTemperature()
      .then(data => {
        // Send the data to the Angular renderer process
        console.log(data);
        event.sender.send('cpu-temperature', data);
      })
      .catch(error => {
        console.error('Error fetching CPU temperature:', error);
      });
  });
  
  // Open the DevTools.
  appWindow.webContents.openDevTools();
};


app.whenReady().then(() => {
  appPath = app.getAppPath();
  console.log(appPath);
  createChildWindow();
  
  if (app.isPackaged) {
    autoUpdater.checkForUpdates();
  }

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createChildWindow()
    }
  })

  if (app.isPackaged) {
    autoUpdater.on('update-available', () => {
      // Handle the event when an update is available
      dialog.showMessageBox({
        type: 'info',
        buttons: ['Install', 'Cancel'],
        defaultId: 0,
        message: 'A new version is available. Do you want to install it now?',
      }).then((result) => {
        if (result.response === 0) {
          autoUpdater.downloadUpdate();
        }
      });
    });

  }


  autoUpdater.on('update-downloaded', () => {
    // Handle the event when the update has been downloaded and is ready to be installed
    autoUpdater.quitAndInstall();
  });

})
