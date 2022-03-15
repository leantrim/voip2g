import { createContext, useState, useEffect, useContext } from 'react';
import chan from "../services/channelService";
import { channelSocketContext } from './channelSocketContext';
import { chatContext } from './chatContext';
import chatService from "../services/chatService";
import { soundContext } from './soundNoticeContext';
import { userContext } from './userContext';


const channelContext = createContext();



const ChannelContextProvider = ({ children }) => {
    const [channel, setChannels] = useState([]);

    const {
        channel: channelSocket,
        userJoinChannel,
        userLeaveChannel,
        userSendMessageToChannel
    } = useContext(channelSocketContext);

    const {
        playSound
    } = useContext(soundContext);


    const {
        chatList,
        setChatList,
    } = useContext(chatContext);

    const { currentChannel,
        setCurrentChat,
        setCurrentChannel } = useContext(userContext);


    useEffect(() => {


        channelSocket.on("connect_error", error => {
            // User failed authentication
            console.log(error);
        });
        channelSocket.on("channel-notification", (data) => {
            // Reading the message in a function
            console.log('TRIGGERED channel-notification');
            loadChannels();
        });

        channelSocket.on('prive-channel-notification', ({ msg, id }) => {
            channelJoinPrivate(msg, id);
        });


        const channelJoinPrivate = (msg, id) => {
            switch (msg) {
                case "USER_JOIN_PRIVATE_CHANNEL":
                    break;

                default:
                    break;
            }
        }


        return () => {
            channelSocket.disconnect();
        }

    }, [channelSocket]);



    const createNewChannel = async (chan) => {
        const channel = await chan.createChannel(chan);
        return channel;
    }

    const loadChannels = async () => {
        console.log('LoadChannels Command ran!');
        const { data: channel } = await chan.getChannels();
        setChannels([...channel]);
    }


    const loadChannel = async (id) => {
        const channel = await chan.getChannel(id);
        return channel;
    }



    const viewModelToDb = (user, msg, type) => {
        const chat = {
            content: `${type} ${user.name} ${msg}`,
            isLog: true,
            date: Date.now(),
        };
        if (type === '[JOIN]') chat.isJoining = 1;
        else chat.isJoining = 0;
        return chat;
    };

    const addChannelLog = async (channel, user, msg, type) => {
        // Channel logging
        const message = viewModelToDb(user, msg, type);

        chatList.message.push(message);

        setChatList({ ...chatList })

        userSendMessageToChannel(channel._id, message);

        await chatService.addMessageToChat(message, channel._id);
    }

    const handleChannelClick = async (user, channel) => {
        if (currentChannel._id) {
            if (currentChannel._id === channel._id) return;
            await removeUserFromChannel(user, currentChannel);
        }

        await addUserToChannel(user, channel);
        playSound();
        console.log('handleChannelClick');
    };


    const handleClickDisconnect = async (user) => {
        console.log('handleclickDisconnect triggered');
        await removeUserFromChannel(user, currentChannel);
        loadChannels();
        playSound();
    };


    const addUserToChannel = async (user, channelId) => {
        const { data: channel } = await chan.addClientToChannel(user, channelId._id);
        addChannelLog(channelId, user, 'has joined to the channel', '[JOIN]');

        userJoinChannel(channelId, user);

        setCurrentChannel(channelId);
        setCurrentChat({ ...channelId });

        const { data: chat } = await chatService.getChat(channel._id);
        setChatList({ ...chat });

        loadChannels();

        return channel;
    }

    const removeUserFromChannel = async (user, channel) => {
        if (!currentChannel._id) return;

        // Logging
        addChannelLog(channel, user, 'has left the channel', '[LEAVE]');

        userLeaveChannel(channel, user);

        await chan.removeClientFromChannel(user, currentChannel);

        setCurrentChannel('');

        return channel;
    }


    return (
        <channelContext.Provider value={{
            channel,
            setChannels,
            loadChannels,
            loadChannel,
            createNewChannel,
            addUserToChannel,
            removeUserFromChannel,
            handleChannelClick,
            handleClickDisconnect
        }}>
            {children}

        </channelContext.Provider>
    )
}

export { ChannelContextProvider, channelContext };