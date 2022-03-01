import { createContext, useState, useEffect, useContext } from 'react';
import chan from "../services/channelService";
import { channelSocketContext } from './channelSocketContext';


const channelContext = createContext();



const ChannelContextProvider = ({ children }) => {
    const [channel, setChannels] = useState([]);
    const [currentChannel, setCurrentChannel] = useState();

    const {
        channel: channelSocket,
        userJoinChannel,
        userLeaveChannel
    } = useContext(channelSocketContext);




    useEffect(() => {
        console.log('useEffect channelContext');
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
        console.log('loadChannels RAN!');
        const { data: channel } = await chan.getChannels();
        setChannels([...channel]);
    }


    const loadChannel = async (id) => {
        const channel = await chan.getChannel(id);
        return channel;
    }


    const addUserToChannel = async (user, channelId) => {
        const channel = await chan.addClientToChannel(user, channelId._id);
        setCurrentChannel(channelId._id);
        userJoinChannel(channelId, user);
        return channel;
    }
    const removeUserFromChannel = async (user, channelId) => {
        if (!currentChannel) return;
        await chan.removeClientFromChannel(user, channelId);
        setCurrentChannel('');
        userLeaveChannel(channelId, user);
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