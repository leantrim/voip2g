import { createContext, useState, useEffect } from 'react';
import auth from "../services/authService";
import client from "../services/userService";

const userContext = createContext();



const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState();


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
    }, []);

    console.log(user);

    return (
        <userContext.Provider value={{
            user,
            setUser,
            logOutUser,
            getCustomUser,
        }}>
            {children}

        </userContext.Provider>
    )
}

export { UserContextProvider, userContext };