import http from "./httpService";
import { DATABASE_URL } from "../config.json";

const SECOND_URL = "chat";

interface Channel {
  _id: string;
  channel: object;
}

interface MessageContent {
  content: string;
  author: string;
}

function createChannelChat(channel: Channel) {
  return http.post(`${DATABASE_URL}/api/${SECOND_URL}/${channel._id}`);
}

function getChats() {
  return http.get(`${DATABASE_URL}/api/${SECOND_URL}`);
}

function getChat(_id: string) {
  return http.get(`${DATABASE_URL}/api/${SECOND_URL}/${_id}`);
}

function addMessageToChat(chat: MessageContent, _id: string) {
  return http.put(`${DATABASE_URL}/api/${SECOND_URL}/${_id}`, {
    chat,
  });
}

const exportObject = {
  createChannelChat,
  getChats,
  getChat,
  addMessageToChat,
};

export default exportObject;
