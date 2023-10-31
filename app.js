const { app, BrowserWindow } = require('electron');
const { webContents } = require('electron/main');
const path = require('path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}
let appWindow
let appPath
const createWindow = () => {
  appWindow = new BrowserWindow({
      width: 1000,
      height: 800,
      webPreferences: {
          preload: path.join(__dirname, 'preload.js')
        },
        options:{
    fullscreen:true
  }
  });

  // and load the index.html of the app.
  appWindow.loadFile('./ng-cool/dist/ng-cool/index.html')
  appWindow.on('closed', function(){
    appWindow = null
})
// appWindow.webContents. 
appWindow.setMenu(null);


appWindow.setFullScreen(false);
appWindow.maximize();
  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
};

const createChildWindow = () => {
  appWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
          preload: path.join(__dirname, 'preload.js')
        },
        options:{
    fullscreen:true
  }
  });

  // and load the index.html of the app.
  appWindow.loadFile('./ng-cool/dist/ng-cool/index.html')
  appWindow.on('closed', function(){
    appWindow = null
})
// appWindow.webContents. 
appWindow.setMenu(null);


appWindow.setFullScreen(false);
appWindow.maximize();
  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
};


app.whenReady().then(()=> {
  appPath=app.getAppPath();
  console.log(appPath);
  createWindow();
  app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createChildWindow()
      }
    })

    appWindow.webContents.setWindowOpenHandler(({ url }) => {
      // config.fileProtocol is my custom file protocol
      if (url.startsWith("http")) {
        shell.openExternal(url);
          // return { action: 'allow' };
      }
      // open url in a browser and prevent default
      
      // return { action: 'deny' };
    });

  // appWindow.on('open', () => {
  //   createChildWindow()
  // })
})


// // This method will be called when Electron has finished
// // initialization and is ready to create browser windows.
// // Some APIs can only be used after this event occurs.
// app.on('ready', createWindow);

// // Quit when all windows are closed, except on macOS. There, it's common
// // for applications and their menu bar to stay active until the user quits
// // explicitly with Cmd + Q.
// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     app.quit();
//   }
// });

// app.on('activate', () => {
//   // On OS X it's common to re-create a window in the app when the
//   // dock icon is clicked and there are no other windows open.
//   if (BrowserWindow.getAllWindows().length === 0) {
//     createWindow();
//   }
// });

// // In this file you can include the rest of your app's specific main process
// // code. You can also put them in separate files and import them here.
