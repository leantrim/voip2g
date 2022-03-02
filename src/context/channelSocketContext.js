import { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import auth from "../services/authService";


const channelSocketContext = createContext();

const jwtToken = auth.getJwt();
const namespace = 'channel';


const channelSocketConnection = io(`http://192.168.1.52:5001/${namespace}`, { auth: { token: jwtToken } });

const ChannelSocketProvider = ({ children }) => {
    const [channel] = useState(channelSocketConnection);

    useEffect(() => {
        channel.on("user joined", payload => {
        });
    }, [channel])



    const userJoinChannel = (channelID, user) => {
        channel.emit('user_join_channel', channelID, user);
    }

    const userLeaveChannel = (channelID, user) => {
        channel.emit('user_leave_channel', channelID, user);
    }


    return (
        <channelSocketContext.Provider value={{
            channel,
            userJoinChannel,
            userLeaveChannel
        }}>
            {children}
        </channelSocketContext.Provider>
    );
};

export { ChannelSocketProvider, channelSocketContext };