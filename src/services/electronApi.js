const sendCustomNotification = async (options) => {
    window.App.notificationApi.sendNotification(options);
};

const openNewWindow = async (options) => {
    window.App.notificationApi.openNewWindow(options);
};
const getIdleTime = async () => {
    window.App.notificationApi.getSystemIdleTime();
};

const getVideoSources = async () => {
    console.log(window);
    window.App.notificationApi.getVideoSources();
};


const exportedObject = {
    sendCustomNotification,
    openNewWindow,
    getIdleTime,
    getVideoSources
};

export default exportedObject;