import { createContext, useState, useEffect } from 'react';
import useLocalStorage from "hooks/useLocalStorage";
import auth from "../services/authService";
import client from "../services/userService";

const userContext = createContext();


const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [currentChat, setCurrentChat] = useState({ message: [] });
    const [currentChannel, setCurrentChannel] = useState({});
    const [channelLogging, setChannelLogging] = useLocalStorage("channelLogging", true);


    const logOutUser = () => {
        auth.logout();
    }

    const loadUserInfo = async () => {
        const { data: user } = await client.getUser();
        setUser(user);
    }

    const getCustomUser = async (id) => {
        const customUser = await client.getCustomUser(id);
        return customUser;
    }

    useEffect(() => {
        loadUserInfo();
    }, [])


    return (
        <userContext.Provider value={{
            user,
            setUser,
            logOutUser,
            getCustomUser,
            loadUserInfo,
            setCurrentChat,
            setCurrentChannel,
            currentChat,
            currentChannel,
            channelLogging,
            setChannelLogging
        }}>
            {children}

        </userContext.Provider>
    )
}

export { UserContextProvider, userContext };