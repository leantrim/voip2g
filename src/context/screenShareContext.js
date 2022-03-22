import { createContext, useRef, useState } from 'react';


const screenContext = createContext();


const ScreenContextProvider = ({ children }) => {
    const [userVideo, setUserVideo] = useState({});
    const [watchingStream, setWatchingStream] = useState(false);


    return (
        <screenContext.Provider value={{
            userVideo,
            setUserVideo,
            watchingStream,
            setWatchingStream
        }}>
            {children}

        </screenContext.Provider>
    )
}

export { ScreenContextProvider, screenContext };