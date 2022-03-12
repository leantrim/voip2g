import { useRef, createContext, useState } from 'react';
import useSound from "use-sound";
import boopSfx from "../sounds/chanjoin.mp3";

const soundContext = createContext();

function UseFocus() {
    const htmlElRef = useRef(null);
    const setFocus = () => {
        htmlElRef.current && htmlElRef.current.click();
    };

    return [htmlElRef, setFocus];
}

const SoundContextProvider = ({ children }) => {
    const [soundRef, playSound] = UseFocus();
    const [sound, setSound] = useState();
    const [play] = useSound(boopSfx);

    const handleSoundPlay = () => {
        play();
    }

    const playCustomSound = () => {
        playSound();
    }

    return (
        <>
            <button ref={soundRef} onClick={() => handleSoundPlay}></button>
            <soundContext.Provider value={{
                playCustomSound

            }}>
                {children}

            </soundContext.Provider>
        </>
    )
}

export { SoundContextProvider, soundContext };