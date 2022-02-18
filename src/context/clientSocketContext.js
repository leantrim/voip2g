import { createContext, useContext, useEffect } from 'react';
import { io } from 'socket.io-client';
import { channelContext } from './channelContext';

const clientSocketContext = createContext();
const client = io('http://192.168.1.52:5001');

const DEFAULT_ROOM = 'default_room';
const JOIN_CHANNEL = 'channel_join'

const ClientSocketProvider = ({ children }) => {
    const { loadChannels } = useContext(channelContext);

    client.emit('join_room', DEFAULT_ROOM);

    useEffect(() => {
        client.on("receive_message", (data) => {
            console.log(data);
            socketMsgRecive(data);
        });

        return () => client.disconnect();
    }, [client]);


    const socketMsgRecive = (data) => {
        switch (data) {
            case JOIN_CHANNEL: {
                console.log('something happend =D');
                loadChannels();
            }
        }
    }

    const userJoinChanSocketMsg = () => {
        console.log('sent');
        client.emit("send_message", JOIN_CHANNEL);
    }



    return (
        <clientSocketContext.Provider value={{
            userJoinChanSocketMsg,
        }}
        >
            {children}
        </clientSocketContext.Provider>
    );
};

export { ClientSocketProvider, clientSocketContext };