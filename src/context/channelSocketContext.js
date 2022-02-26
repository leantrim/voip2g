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
        channel.on("connect_error", error => {
            // User failed authentication
            console.log(error);
        });
        channel.on("channel-notification", (data) => {
            // Reading the message in a function
            channelSocketMessage(data);
        });

        channel.on('prive-channel-notification', (data) => {
            channelSocketMessage(data);
        });

        return () => {
            channel.disconnect();
        }

    }, [channel]);


    const channelSocketMessage = (data) => {
        console.log(data);
        //TODO friends list should reload here
        // GetFriendList();
    }


    const userJoinChannel = (channelID, user) => {
        channel.emit('user_join_channel', channelID, user);
    }

    const userLeaveChannel = (channelID, user) => {
        channel.emit('user_leave_channel', channelID, user);
    }


    return (
        <channelSocketContext.Provider value={{
            channel,
            userJoinChannel
        }}>
            {children}
        </channelSocketContext.Provider>
    );
};

export { ChannelSocketProvider, channelSocketContext };