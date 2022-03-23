import moment from "moment";


const formatDate = (inputDate) => {
    // Format date
    let message_date = moment(inputDate).format("YYYY-MM-DD H:mm z");

    // Format current date
    let dateToday = Date.now();

    const difference = (Date.now() - inputDate) / 1000;

    const secondsAgo = Math.floor(difference);

    const messageDay = new Date(inputDate).getDate();
    const currentDay = new Date(dateToday).getDate();

    if (secondsAgo < 10) return "just now ";

    if (secondsAgo < 60) {
        return secondsAgo + "s ago ";
    }

    if (currentDay - messageDay === 1) {
        message_date = moment(inputDate).format("HH:mm z");
        return "yesterday " + message_date;
    }

    // if message was sent within 3600 seconds (one hour);
    if (secondsAgo < 3600) return Math.floor(secondsAgo / 60) + "m ago ";

    if (messageDay === currentDay) {
        message_date = moment(inputDate).format("HH:mm z");
        return "today at " + message_date;
    }

    return message_date;
};

export default formatDate;