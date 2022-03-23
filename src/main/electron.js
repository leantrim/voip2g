const {
    app,
    BrowserWindow,
    ipcMain,
    Notification,
    powerMonitor,
    Menu,
    Tray,
    desktopCapturer,
    remote
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
const icon = isDev ? 'src/main/icon.png' : (__dirname, 'build/icon.png');
let tray

app.disableHardwareAcceleration();


function createWindow() {


    // Create the browser window.
    win = new BrowserWindow({
        title: 'VOIP2G Speak better with friends',
        show: true,
        icon: icon,
        autoHideMenuBar: true,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            nodeIntegration: false, // is default value after Electron v5
            contextIsolation: true, // protect against prototype pollution
            enableRemoteModule: true, // turn off remote
            webSecurity: true
        },
    });

    win.loadURL(
        isDev ? "http://localhost:3000" : path.join(__dirname, 'index.html')
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

const handleGetVideoSources = async () => {

    const inputSources = await desktopCapturer.getSources({
        thumbnailSize: {
            height: 90,
            width: 150,
        },
        fetchWindowIcons: true,
        types: ["window", "screen", 'audio'],
    });

    // Update the thumbnail png
    inputSources.map((source) => source.thumbnailImg = source.thumbnail.toDataURL())

    return inputSources;

};


app.whenReady().then(() => {
    tray = new Tray(icon)
    const contextMenu = Menu.buildFromTemplate([
        { label: 'Mute Microphone' },
        { label: 'Enable Microphone' },
        { label: 'Item3', type: 'radio', checked: true },
        { label: 'Item4', type: 'radio' }
    ])

    tray.setToolTip('VOIP2G');
    tray.setContextMenu(contextMenu);

    ipcMain.handle('getVideoSources', handleGetVideoSources);

    createWindow();
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
            nodeIntegration: true, // is default value after Electron v5
            contextIsolation: false, // protect against prototype pollution
            enableRemoteModule: true, // turn off remote
            webSecurity: false
        },
    })
    window.loadURL("http://localhost:3000/" + url);
})


ipcMain.on('getIdleTime', (_) => {
    const idleThreshold = powerMonitor.getSystemIdleTime();
    console.log(idleThreshold);
    win.webContents.send('message', idleThreshold);
})

ipcMain.on('reloadElectronPage', (_) => {
    win.webContents.reload();
    console.log('Page should reload!');
})


ipcMain.on('getVideoSources', async (_) => {
    const inputSources = await desktopCapturer.getSources({
        thumbnailSize: {
            height: 90,
            width: 150,
        },
        fetchWindowIcons: true,
        types: ["window", "screen", 'audio'],
    });

    console.log(inputSources);
    return inputSources;
})

const selectSource = (source) => {
    win.webContents.send('selectedScreen', source);
}





