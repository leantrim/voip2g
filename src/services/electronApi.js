
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
    window.App.notificationApi.getVideoSource();
};

const reloadWindow = async () => {
    // window.App.notificationApi.reloadPage();
    //window.location.reload(true);
};

const getConsole = async () => {
    console.log(window.App);
}


const exportedObject = {
    sendCustomNotification,
    openNewWindow,
    getIdleTime,
    getVideoSources,
    reloadWindow,
    getConsole
};

export default exportedObject;