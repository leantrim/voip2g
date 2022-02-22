import { createContext, useContext, useEffect, useState } from 'react';
import useSound from "use-sound";
import { io } from 'socket.io-client';
import { channelContext } from './channelContext';
import newSound from "../sounds/chanjoin.mp3";
import { userContext } from './userContext';


console.log('clientSocketContext called');

const clientSocketContext = createContext();




// 1 establish connection
const client = io.connect('http://192.168.1.52:5001');

const ClientSocketProvider = ({ children }) => {
    const [socket, setSocket] = useState();

    const { loadChannels } = useContext(channelContext);
    const { user } = useContext(userContext);

    const [playUserJoin] = useSound(newSound);

    //2 User sends a message to listener "join_room" with the property "default_room"

    const joinSocketRoom = () => {

    }



    useEffect(() => {
        // 8 - a listener with receive_message was sent from database with data which is "channel_join"
        console.log('init')
        setSocket(client);
        client.emit('main_lobby', "lobby_room", 'Laptop');


        client.on("receive_message", (data) => {
            // Reading the message in a function
            socketMsgRecive(data);
        });

        return () => {
            console.log('cleanup')
            client.disconnect();
        }

    }, [client]);

    const userJoinChanSocketMsg = (channel) => {
        console.log('userjoinchan TRIGGED');
        // 5 - Sending to listener "send_message" to the backend with the message 'channel_join'
        client.emit("send_message", "user_join_lobby", 'Laptop');
        client.emit("user_join_channel", channel, user);
    }


    const socketMsgRecive = (data) => {
        switch (data) {
            case "user_join_channel": {
                loadChannels();
                console.log(data, 'user joined your channel =D');
                console.log('SHOULD PLAY NOTICE');
                playUserJoin();
            }

            case "user_join_lobby": {
                console.log('something happend =D');
                loadChannels();
                // Reload friend list, set the user online for user! :)
            }
            case "user_leave_lobby": {
                console.log('USER LEAVE LOBBY');
                loadChannels();
                // Reload friend list, set the user offline for user! :)
            }
        }
    }


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