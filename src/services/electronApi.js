const sendCustomNotification = async (options) => {
    window.App.notificationApi.sendNotification(options);
};

const openNewWindow = async (options) => {
    window.App.notificationApi.openNewWindow(options);
};
const getIdleTime = async () => {
    window.App.notificationApi.getSystemIdleTime();
};


const exportedObject = {
    sendCustomNotification,
    openNewWindow,
    getIdleTime
};

export default exportedObject;