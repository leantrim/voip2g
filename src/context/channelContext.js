import { createContext, useState, useEffect, useContext } from 'react';
import chan from "../services/channelService";
import { clientSocketContext } from './clientSocketContext';

const channelContext = createContext();



const ChannelContextProvider = ({ children }) => {
    const [channel, setChannels] = useState([]);
    const [currentChannel, setCurrentChannel] = useState([]);


    useEffect(() => {
        loadChannels();
    }, []);



    const createChannel = async (chan) => {
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

    const addUserToChannel = async (user, channelId) => {
        const channel = await chan.addClientToChannel(user, channelId._id);
        setCurrentChannel(channelId._id);
        return channel;
    }
    const removeUserFromChannel = async (user, channelId) => {
        if (!currentChannel) return;
        setCurrentChannel('');
        const channel = await chan.removeClientFromChannel(user, channelId);
        loadChannels();
        return channel;
    }


    return (
        <channelContext.Provider value={{
            channel,
            currentChannel,
            setChannels,
            loadChannels,
            loadChannel,
            createChannel,
            addUserToChannel,
            removeUserFromChannel,
        }}>
            {children}

        </channelContext.Provider>
    )
}

export { ChannelContextProvider, channelContext };