const sendCustomNotification = async (options) => {
    window.App.notificationApi.sendNotification(options);
};

const openNewWindow = async (options) => {
    window.App.notificationApi.openNewWindow(options);
};

const exportedObject = {
    sendCustomNotification,
    openNewWindow
};

export default exportedObject;