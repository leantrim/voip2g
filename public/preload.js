const { contextBridge, ipcRenderer } = require('electron')

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
        }
    }

})
