import { createContext, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useLocalStorage from "hooks/useLocalStorage";
import chatService from "../services/chatService";
import chan from "../services/channelService";
import { channelSocketContext } from './channelSocketContext';
import { userContext } from './userContext';

const chatContext = createContext();


const ChatContextProvider = ({ children }) => {
    const [showEmoji, setShowEmoji] = useState(false);
    const [emoji, setEmoji] = useState('');
    //const [chatList, setChatList] = useState({ message: [] });
    const [chatList, setChatList] = useLocalStorage("chatList", { message: [] });
    const { register, handleSubmit, watch, setValue, getValues } = useForm();
    const { user, setUser, currentChat, setCurrentChat } = useContext(userContext);

    const {
        channel: channelSocket,
        userSendMessageToChannel,
    } = useContext(channelSocketContext);

    const getCurrentChat = async (currentChat) => {

        console.log('CurrentChat called')
        if (!currentChat._id) {

            const findChannel = await chan.getChannels();

            let channel = findChannel.data.find(chan => chan.isDefault);

            if (!channel) return console.log('FATAL ERROR(924): NO CHANNELS & CHATS CREATED, PLEASE MAKE A NEW CHANNEL ASAP.');

            const { data: chat } = await chatService.getChat(channel._id);


            setChatList({ ...chat });

            console.log('getCurrentChat, SETCURRENTCHAT')
            setCurrentChat(channel);

            return;
        }
        const { data: chat } = await chatService.getChat(currentChat._id);

        setChatList({ ...chat });


    };

    const viewModelToDb = (input) => {
        const chat = {
            content: input,
            author: {
                name: user.name,
                userLogo: user.userLogo,
            },
            date: Date.now()
        };
        return chat;
    };

    const handleMessageSubmit = async (input) => {
        if (!input.message) return;

        const chat = viewModelToDb(input.message);

        toggleEmoji(false);

        setValue("message", "");

        console.log(chatList.message);

        chatList.message.push(chat);

        setChatList({ ...chatList })


        userSendMessageToChannel(currentChat._id, chatList);

        await chatService.addMessageToChat(chat, currentChat._id);
    };

    useEffect(() => {
        getCurrentChat(currentChat);

        channelSocket.on('user_receive_message_private_channel', (message) => {
            setChatListMessage(message);
        });

    }, [channelSocket])

    const setChatListMessage = (message) => {
        getCurrentChat(currentChat);
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
        setValue("message", getValues("message") + emojiObject.emoji);
        toggleEmoji(false);
    };

    return (
        <chatContext.Provider value={{
            onEmojiClick,
            toggleEmoji,
            showEmoji,
            emoji,
            handleMessageSubmit,
            getCurrentChat,
            chatList,
            setChatList,
            register,
            handleSubmit,
            watch,
            setValue,
        }}>
            {children}

        </chatContext.Provider>
    )
}

export { ChatContextProvider, chatContext };