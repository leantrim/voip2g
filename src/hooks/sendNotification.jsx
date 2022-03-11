const useWow = () => {
  const path = require("path");

  const options = {
    title: "VOIP2G",
    subtitle: "POKE!",
    body: "Vrickad has poked you: Valo? Spil?",
  };

  const sendCustomNotification = async () => {
    window.App.notificationApi.sendNotification(options);
  };

  return { useWow };
};
