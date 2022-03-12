import { createContext, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import chatService from "../services/chatService";
import chan from "../services/channelService";
import { channelSocketContext } from './channelSocketContext';
import { userContext } from './userContext';

const chatContext = createContext();


const ChatContextProvider = ({ children }) => {
    const [showEmoji, setShowEmoji] = useState(false);
    const [emoji, setEmoji] = useState('');
    const [chatList, setChatList] = useState([]);
    const { register, handleSubmit, watch, setValue, getValues } = useForm();
    const { user, setUser, getCustomUser, loadUserInfo } = useContext(userContext);

    const {
        channel: channelSocket,
        userSendMessageToChannel,
    } = useContext(channelSocketContext);

    const getCurrentChat = async (userChannel) => {

        if (!userChannel) {

            const channels = await chan.getChannels();

            let channel = channels.data.find(chan => chan.isDefault);
            const chat = await chatService.getChat(channel._id);
            console.log(channel);

            setChatList(chat);
            user.channel = channel;
            setUser(user);
            return;

        }
        const chat = await chatService.getChat(userChannel._id);

        setChatList(chat);

        console.log('Downloaded chat', chat);

    };

    const viewModelToDb = (input) => {
        const chat = {
            content: input,
            author: user.name,
        };
        return chat;
    };

    const handleMessageSubmit = async (input) => {
        if (!input.message) return;

        const chat = viewModelToDb(input.message);

        toggleEmoji(false);

        setValue("message", "");

        chatList.data.message.push(chat);

        setChatList({ ...chatList })

        userSendMessageToChannel(user.channel._id, chatList);

        await chatService.addMessageToChat(chat, user.channel._id);
    };

    useEffect(() => {

        channelSocket.on('user_receive_message_private_channel', (message) => {
            setChatListMessage(message);
        });

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