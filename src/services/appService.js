export default async function getCurrentVersion() {
    const version = await window.App.getAppVersion();
    console.log(version);
    return version;
};
