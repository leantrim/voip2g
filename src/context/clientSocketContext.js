import { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import auth from "../services/authService";


const clientSocketContext = createContext();

const jwtToken = auth.getJwt();
const namespace = 'lobby';


const lobbySocketConnection = io(`http://176.10.174.108:5001/${namespace}`, { auth: { token: jwtToken } });

const ClientSocketProvider = ({ children }) => {
    const [lobby] = useState(lobbySocketConnection);

    useEffect(() => {
        lobby.on("connect_error", error => {
            // User failed authentication
            console.log(error);
        });
        lobby.on("user-notification", (data) => {
            // Reading the message in a function
            lobbySocketMessage(data);
        });

        return () => {
            lobby.disconnect();
        }

    }, [lobby]);


    const lobbySocketMessage = (data) => {
        //TODO friends list should reload here
        // GetFriendList();
    }


    return (
        <clientSocketContext.Provider value={{ lobby }}>
            {children}
        </clientSocketContext.Provider>
    );
};

export { ClientSocketProvider, clientSocketContext };