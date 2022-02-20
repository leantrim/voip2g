import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { channelContext } from './channelContext';



console.log('clientSocketContext called');

const clientSocketContext = createContext();




// 1 establish connection
const client = io.connect('http://192.168.1.52:5001');

const ClientSocketProvider = ({ children }) => {
    const [socket, setSocket] = useState();
    const { loadChannels } = useContext(channelContext);

    //2 User sends a message to listener "join_room" with the property "default_room"
    client.emit('join_room', "default_room", { user: 'lean' });




    useEffect(() => {
        // 8 - a listener with receive_message was sent from database with data which is "channel_join"
        setSocket(client);
        client.on("receive_message", (data) => {
            // Reading the message in a function
            socketMsgRecive(data);
        });

        return () => client.disconnect();

    }, [client]);

    const userJoinChanSocketMsg = () => {
        // 5 - Sending to listener "send_message" to the backend with the message 'channel_join'
        client.emit("send_message", "channel_joinLeave");
    }


    const socketMsgRecive = (data) => {
        switch (data) {
            // Final step
            case "channel_joinLeave": {
                console.log('something happend =D');
                loadChannels();
            }
        }
    }

    console.log(socket);




    return (
        <clientSocketContext.Provider value={{
            userJoinChanSocketMsg,
            socket
        }}
        >
            {children}
        </clientSocketContext.Provider>
    );
};

export { ClientSocketProvider, clientSocketContext };