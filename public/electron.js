const { app, BrowserWindow } = require('electron')
const isDev = require('electron-is-dev')


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
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false
        }
    });

    win.loadURL(
        isDev ? "http://localhost:3000" : `file://$path.join(__dirname, "../
            build/index.html")}`
    )

    win.maximize();
    win.show();

    mainWindow.on('minimize', function (event) {
        event.preventDefault();
        mainWindow.hide();
    });

    mainWindow.on('close', function (event) {
        if (!application.isQuiting) {
            event.preventDefault();
            mainWindow.hide();
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

