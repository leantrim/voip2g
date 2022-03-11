const { app, BrowserWindow, ipcMain, Notification } = require('electron')
const isDev = require('electron-is-dev');
const path = require('path');

let win;
let mainWindow;


function createWindow() {


    // Create the browser window.
    win = new BrowserWindow({
        title: 'VOIP2G Speak better with friends',
        show: true,
        icon: (__dirname, 'build/icon.png'),
        //TODO:Enabble this later!   autoHideMenuBar: true,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            nodeIntegration: false, // is default value after Electron v5
            contextIsolation: true, // protect against prototype pollution
            enableRemoteModule: false, // turn off remote
            webSecurity: false
        }
    });

    win.loadURL(
        isDev ? "http://localhost:3000" : path.join(__dirname, '/index.html')
    )

    win.maximize();
    win.show();


    // Open window?
    // win.webContents.setWindowOpenHandler(({ url }) => {
    //     if (url.startsWith('https://github.com/')) {
    //         return { action: 'allow' }
    //     }
    //     return { action: 'deny' }
    // })

    win.on('close', function (event) {
        if (!application.isQuiting) {
            event.preventDefault();
            win.hide();
        }

        return false;
    });

}

ipcMain.on('notify', (_, options) => {
    new Notification(options).show();
})




app.whenReady().then(() => {
    createWindow();
})


app.disableHardwareAcceleration();


app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})



