import { createContext, useState, useEffect, useContext } from 'react';
import chan from "../services/channelService";
import { channelSocketContext } from './channelSocketContext';
import { chatContext } from './chatContext';
import chatService from "../services/chatService";


const channelContext = createContext();



const ChannelContextProvider = ({ children }) => {
    const [channel, setChannels] = useState([]);
    const [currentChannel, setCurrentChannel] = useState();

    const {
        channel: channelSocket,
        userJoinChannel,
        userLeaveChannel,
        userSendMessageToChannel
    } = useContext(channelSocketContext);

    const {
        chatList,
        setChatList
    } = useContext(chatContext);




    useEffect(() => {
        loadChannels();


        channelSocket.on("connect_error", error => {
            // User failed authentication
            console.log(error);
        });
        channelSocket.on("channel-notification", (data) => {
            // Reading the message in a function
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
        };
        if (type === '[CONNECT]') chat.isJoining = 1;
        else chat.isJoining = 0;
        return chat;
    };

    const addChannelLog = async (channel, user, msg, type) => {
        // Channel logging
        const message = viewModelToDb(user, msg, type);

        chatList.data.message.push(message);

        setChatList({ ...chatList })

        console.log(channel);

        userSendMessageToChannel(channel._id, message);

        await chatService.addMessageToChat(message, channel._id);
    }


    const addUserToChannel = async (user, channelId) => {
        const channel = await chan.addClientToChannel(user, channelId._id);

        userJoinChannel(channelId, user);

        setCurrentChannel(channelId);

        addChannelLog(channelId, user, 'has joined to the channel', '[CONNECT]');

        return channel;
    }

    const removeUserFromChannel = async (user, channel) => {
        if (!currentChannel) return;

        // Logging
        addChannelLog(channel, user, 'has left the channel', '[DISCONNECT]');

        await chan.removeClientFromChannel(user, channel);

        setCurrentChannel('');

        return channel;
    }


    return (
        <channelContext.Provider value={{
            channel,
            currentChannel,
            setChannels,
            loadChannels,
            loadChannel,
            createNewChannel,
            addUserToChannel,
            removeUserFromChannel,
            setCurrentChannel
        }}>
            {children}

        </channelContext.Provider>
    )
}

export { ChannelContextProvider, channelContext };