const { app, BrowserWindow } = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')

// function createWindow() {
//     const win = new BrowserWindow({
//         width: 100,
//         height: 100
//     })

//     win.loadURL(
//         isDev ? "http://localhost:3000" : `file://$path.join(__dirname, "../
//         buid/index.html")}`
//     )
// }

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        show: false,
     //TODO:Enabble this later!   autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true,
        }
    });

    win.loadURL(
        isDev ? "http://localhost:3000" : `file://$path.join(__dirname, "../
            buid/index.html")}`
    )

    win.maximize();
    win.show();
}

app.whenReady().then(() => {
    createWindow()
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})