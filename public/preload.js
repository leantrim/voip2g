const { contextBridge, ipcRenderer, desktopCapturer, remote } = require('electron');
const { Menu } = remote;

ipcRenderer.on('message', function (evt, message) {
    console.log(message); // Returns: {'SAVED': 'File Saved'}
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
        getVideoSources() {
            //ipcRenderer.send('getVideoSources');
            const inputSources = await desktopCapturer.getSources({
                types: ['window', 'screen']
            });

            console.log(inputSources);

            const videoOptionsMenu = Menu.buildFromTemplate(
                inputSources.map(source => {
                    return {
                        label: source.name,
                        click: () => selectSource(source)
                    };
                })
            )
            videoOptionsMenu.popup();
        }
    }

})
