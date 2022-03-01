import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { channelSocketContext } from './channelSocketContext';
import Peer from "simple-peer";
import { userContext } from './userContext';



const mediaStreamContext = createContext();



const MediaStreamProvider = ({ children }) => {
    const { channel: socket } = useContext(channelSocketContext);
    const { user } = useContext(userContext);

    const [peers, setPeers] = useState([]);
    const socketRef = useRef();
    const userVideo = useRef();
    const peersRef = useRef([]);
    const [micMuted, setMicMuted] = useState(false);

    socketRef.current = socket;

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({
            audio: {
                autoGainControl: false,
                channelCount: 2,
                echoCancellation: false,
                latency: 0,
                noiseSuppression: false,
                sampleRate: 48000,
                sampleSize: 16,
                volume: 1
            }
        }).then((stream) => {
            userVideo.current.srcObject = stream;
            socketRef.current.on("all users", (users) => {
                const peers = [];
                users.forEach((userID) => {
                    const peer = createPeer(userID, socketRef.current.id, stream);
                    peersRef.current.push({
                        peerID: userID,
                        peer,
                    });
                    peers.push(peer);
                });
                setPeers(peers);
            });

            socketRef.current.on("user joined", (payload) => {
                const peer = addPeer(payload.signal, payload.callerID, stream);
                peersRef.current.push({
                    peerID: payload.callerID,
                    peer,
                });

                setPeers((users) => [...users, peer]);
            });

            socketRef.current.on("receiving returned signal", (payload) => {
                const item = peersRef.current.find((p) => p.peerID === payload.id);
                item.peer.signal(payload.signal);
            });

            socketRef.current.on("user left", (id) => {
                const peerObj = peersRef.current.find((p) => p.peerID === id);
                if (peerObj) {
                    peerObj.peer.destroy();
                }
                const peers = peersRef.current.filter((p) => p.peerID !== id);
                peersRef.current = peers;
                setPeers(peers);
            });
        });
    }, []);

    function createPeer(userToSignal, callerID, stream) {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,
            config: { iceServers: [{ url: "stun:stun.l.google.com:19302" }] },
        });

        peer.on("signal", (signal) => {
            socketRef.current.emit("sending signal", {
                userToSignal,
                callerID,
                signal,
            });
        });

        return peer;
    }

    function addPeer(incomingSignal, callerID, stream) {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
            config: { iceServers: [{ url: "stun:stun.l.google.com:19302" }] },
        });

        peer.on("signal", (signal) => {
            socketRef.current.emit("returning signal", { signal, callerID });
        });

        peer.signal(incomingSignal);

        return peer;
    }

    const toggleMic = () => {
        const audioTrack = userVideo.current.srcObject
            .getTracks()
            .find((track) => track.kind === "audio");

        if (micMuted) {
            audioTrack.enabled = true;
            setMicMuted(false);
            user.micMuted = false;
        } else {
            audioTrack.enabled = false;
            setMicMuted(true);
            user.micMuted = true;
        }
    };

    const enableMic = () => {
        const audioTrack = userVideo.current.srcObject
            .getTracks()
            .find((track) => track.kind === "audio");

        audioTrack.enabled = true;
        setMicMuted(false);
        user.micMuted = false;
    };

    const disableMic = () => {
        const audioTrack = userVideo.current.srcObject
            .getTracks()
            .find((track) => track.kind === "audio");

        audioTrack.enabled = false;
        setMicMuted(true);
        user.micMuted = true;
    };


    return (
        <mediaStreamContext.Provider value={{
            disableMic,
            enableMic,
            toggleMic,
            micMuted,
            userVideo,
            peers,
            peersRef
        }}>
            {children}
        </mediaStreamContext.Provider>
    );
};

export { MediaStreamProvider, mediaStreamContext };