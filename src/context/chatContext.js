import { createContext, useState } from 'react';


const chatContext = createContext();


const ChatContextProvider = ({ children }) => {
    const [showEmoji, setShowEmoji] = useState(false);
    const [emoji, setEmoji] = useState('');

    const onEmojiClick = (event, emojiObject) => {
        setEmoji(emojiObject.emoji);
        toggleEmoji(false);
    };



    const toggleEmoji = (specific = '') => {
        if (specific === '') {
            let currState = showEmoji;
            setShowEmoji((currState = !currState));
        } else {
            setShowEmoji(specific);
        }
    };

    return (
        <chatContext.Provider value={{
            onEmojiClick,
            toggleEmoji,
            showEmoji,
            emoji
        }}>
            {children}

        </chatContext.Provider>
    )
}

export { ChatContextProvider, chatContext };