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
    const authed = auth.getCurrentUser();


    const logOutUser = () => {
        auth.logout();
    }

    const getUsers = async () => {
        const { data: users } = await client.getUsers();
        return users;
    }

    const loadUserInfo = async () => {
        if (!authed) return;

        try {
            const { data: user } = await client.getUser();
            setUser(user);
        } catch (error) {
            console.log(error);
        }
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
            setChannelLogging,
            getUsers
        }}>
            {children}

        </userContext.Provider>
    )
}

export { UserContextProvider, userContext };