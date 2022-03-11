const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('App', {
    notificationApi: {
        sendNotification(options) {
            ipcRenderer.send('notification', options);
        },
        openNewWindow(options) {
            ipcRenderer.send('newWindow', options);
        }
    }

})
