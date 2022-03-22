const { contextBridge, ipcRenderer, remote, } = require('electron');

ipcRenderer.on('message', function (evt, message) {
    console.log(message); // Returns: {'SAVED': 'File Saved'}
});


ipcRenderer.on('screens', function (evt, src) {
    localStorage.setItem('screens', JSON.stringify(src));
    console.log(src);
});

ipcRenderer.on('selectedScreen', function (evt, src) {
    localStorage.setItem('selectedScreen', JSON.stringify(src));
    console.log(src);
});



contextBridge.exposeInMainWorld('App', {

    notificationApi: {
        sendNotification(options) {
            ipcRenderer.send('notification', options);
        },
        openNewWindow(options) {
            ipcRenderer.send('newWindow', options);
        },
        getSystemIdleTime() {
            ipcRenderer.send('getIdleTime');
        },
        getVideoSource() {
            ipcRenderer.send('getVideoSources');
        },
        reloadPage() {
            ipcRenderer.send('reloadElectronPage');
        }
    }

})

// getVideoSources() {
//     //ipcRenderer.send('getVideoSources');
//     const inputSources = await desktopCapturer.getSources({
//         types: ['window', 'screen']
//     });

//     console.log(inputSources);

//     const videoOptionsMenu = Menu.buildFromTemplate(
//         inputSources.map(source => {
//             return {
//                 label: source.name,
//                 click: () => selectSource(source)
//             };
//         })
//     )
//     videoOptionsMenu.popup();
// }
