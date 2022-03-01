const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('App', {
    notificationApi: {
        sendNotification(options) {
            ipcRenderer.send('notify', options);
        }
    },
    getAppVersion: () => ipcRenderer.invoke('appVersion'),

})
