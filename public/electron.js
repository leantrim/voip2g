const {
    app,
    BrowserWindow,
    ipcMain,
    Notification,
    powerMonitor,
    Menu,
    Tray,
} = require('electron')
const isDev = require('electron-is-dev');
const path = require('path');

// Detects keybind
// var gkm = require('gkm');
// gkm.events.on('key.*', function (data) {
//     console.log(this.event + ' ' + data);
// });

// gkm.events.on('mouse.*', function (data) {
//     if (this.event === 'mouse.pressed') {
//         console.log(this.event + ' ' + data);
//     }
//     if (this.event === 'mouse.released') {
//         console.log(this.event + ' ' + data);
//     }
// });

// GET PLAYING!!
// desktopCapturer.getSources({
//     types: ['window', 'screen']
//   }, (error, sources) => {
//     if (error) throw error
//     for (let i = 0; i < sources.length; ++i) {
//       log(sources[i]);
//     }
//   });


let win;
const icon = isDev ? 'public/icon.png' : (__dirname, 'build/icon.png');
let tray

app.disableHardwareAcceleration();


function createWindow() {


    // Create the browser window.
    win = new BrowserWindow({
        title: 'VOIP2G Speak better with friends',
        show: true,
        icon: icon,
        //TODO:Enabble this later!   autoHideMenuBar: true,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            nodeIntegration: false, // is default value after Electron v5
            contextIsolation: true, // protect against prototype pollution
            enableRemoteModule: false, // turn off remote
            webSecurity: false
        },
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

    win.on('window-all-closed', function (event) {
        if (process.platform !== 'darwin') {
            app.quit();
        }


        return false;
    });

}


app.whenReady().then(() => {
    createWindow();

    tray = new Tray(icon)
    const contextMenu = Menu.buildFromTemplate([
        { label: 'Mute Microphone' },
        { label: 'Enable Microphone' },
        { label: 'Item3', type: 'radio', checked: true },
        { label: 'Item4', type: 'radio' }
    ])

    tray.setToolTip('VOIP2G');
    tray.setContextMenu(contextMenu);
})




app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

ipcMain.on('notification', (_, options) => {
    new Notification(options).show();
})

ipcMain.on('newWindow', (_, url) => {
    console.log(url);
    const window = new BrowserWindow({
        backgroundColor: '#2e2c29',
        webPreferences: {
        }
    })
    window.loadURL("http://localhost:3000/" + url);
})


ipcMain.on('getIdleTime', (_) => {
    const idleThreshold = powerMonitor.getSystemIdleTime();
    console.log(idleThreshold);
    win.webContents.send('message', idleThreshold);
})








