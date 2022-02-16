import { createContext, useState, useEffect } from 'react';
import auth from "../services/authService";
import client from "../services/userService";

const userContext = createContext();



const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState({});


    navigator.mediaDevices.getUserMedia({ video: false, audio: true })
        .then((currentStream) => {
            console.log('STRM', currentStream);
            const audioTracks = window;

            console.log(audioTracks);

            //myVideo.current.srcObject = currentStream;
        });


    const logOutUser = () => {
        auth.logout();
    }

    const loadUserInfo = async () => {
        const user = await client.getUser();
        setUser({ user: user.data });
        console.log("called", user);
    }

    const getCustomUser = async (id) => {
        const customUser = await client.getCustomUser(id);
        return customUser;
    }

    useEffect(() => {
        loadUserInfo();
    }, []);


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