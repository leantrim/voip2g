const { app, BrowserWindow, ipcMain, Notification } = require('electron')
const isDev = require('electron-is-dev')
const path = require('path');


let win;
let mainWindow;

app.disableHardwareAcceleration();

function createWindow() {


    // Create the browser window.
    win = new BrowserWindow({
        title: 'VOIP2G Speak better with friends',
        show: true,
        icon: __dirname + './icon.png',
        //TODO:Enabble this later!   autoHideMenuBar: true,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            nodeIntegration: false, // is default value after Electron v5
            contextIsolation: true, // protect against prototype pollution
            enableRemoteModule: false, // turn off remote
        }
    });

    win.loadURL(
        isDev ? "http://localhost:3000" : `file://$path.join(__dirname, "../
            build/index.html")}`
    )

    win.maximize();
    win.show();

    //! Minimize bug here!
    mainWindow.on('minimize', function (event) {
        console.log('Should minimize!');
        event.preventDefault();
        win.hide();
    });

    win.on('close', function (event) {
        console.log('CLOSED?');
        if (!application.isQuiting) {
            event.preventDefault();
            win.hide();
        }

        return false;
    });

}



app.whenReady().then(() => {
    createWindow();
})


app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})