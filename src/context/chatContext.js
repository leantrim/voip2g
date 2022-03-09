import { createContext, useContext, useEffect, useState } from 'react';
import chatService from "../services/chatService";
import { channelSocketContext } from './channelSocketContext';
import { userContext } from './userContext';

const chatContext = createContext();


const ChatContextProvider = ({ children }) => {
    const [showEmoji, setShowEmoji] = useState(false);
    const [emoji, setEmoji] = useState('');
    const [message, setMessage] = useState("");
    const [chatList, setChatList] = useState([]);
    const { user } = useContext(userContext);

    const {
        channel: channelSocket,
        userSendMessageToChannel,
    } = useContext(channelSocketContext);

    const getCurrentChat = async () => {
        const chat = await chatService.getChat("622431824c5c5c847154d595");
        setChatList(chat);
        console.log('Downloaded chat');
    };

    const viewModelToDb = () => {
        const chat = {
            content: message,
            author: user.name,
        };
        return chat;
    };

    const handleMessageSubmit = async () => {
        if (!message) return;

        const chat = viewModelToDb();
        toggleEmoji(false);
        setMessage("");
        chatList.data.message.push(chat);
        setChatList({ ...chatList })
        await chatService.addMessageToChat(chat, "622431824c5c5c847154d595");
        userSendMessageToChannel("622431824c5c5c847154d595", chatList);
    };

    useEffect(() => {

        channelSocket.on('user_receive_message_private_channel', (message) => {
            setChatListMessage(message);
        });

        console.log('getcurrentChat called');
        getCurrentChat();
    }, [channelSocket])

    const setChatListMessage = (message) => {
        getCurrentChat();
    }

    const toggleEmoji = (specific = '') => {
        if (specific === '') {
            let currState = showEmoji;
            setShowEmoji((currState = !currState));
        } else {
            setShowEmoji(specific);
        }
    };
    const onEmojiClick = (event, emojiObject) => {
        setMessage((m) => m + emojiObject.emoji);
        toggleEmoji(false);
    };

    return (
        <chatContext.Provider value={{
            onEmojiClick,
            toggleEmoji,
            showEmoji,
            emoji,
            handleMessageSubmit,
            setMessage,
            message,
            getCurrentChat,
            chatList
        }}>
            {children}

        </chatContext.Provider>
    )
}

export { ChatContextProvider, chatContext };