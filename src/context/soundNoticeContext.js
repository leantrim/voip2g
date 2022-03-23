import { useRef, createContext, useState, useEffect } from 'react';
import useSound from "use-sound";
import boopSfx from "../sounds/chanjoin.mp3";

const soundContext = createContext();

function useFocus() {
    const htmlElRef = useRef(null);

    const setFocus = () => {
        htmlElRef.current && htmlElRef.current.click();
    };

    return [htmlElRef, setFocus];
}

const SoundContextProvider = ({ children }) => {
    const [soundRef, playSound] = useFocus();
    const [sound, setSound] = useState();
    const [play] = useSound(boopSfx);

    const handleSoundPlay = () => {
        play();
    }


    // useEffect(() => {
    //     playSound();
    // }, [soundRef, playSound])

    return (
        <>
            <i style={{ visibility: 'hidden' }} ref={soundRef} onClick={handleSoundPlay}></i>
            <soundContext.Provider value={{
                playSound
            }}>
                {children}

            </soundContext.Provider>
        </>
    )
}

export { SoundContextProvider, soundContext };