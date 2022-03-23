import http from "./httpService";
import { DATABASE_URL } from "../config.json";

import Users from "types/Users";
import Channel from "types/Channel";

const SECOND_URL = "channels";

export enum ChannelType {
  name = "name",
  isChat = "isChat",
  author = "author",
}

function createChannel(channel: Channel) {
  return http.post(`${DATABASE_URL}/api/${SECOND_URL}`, {
    channel,
  });
}

function getChannels() {
  return http.get(`${DATABASE_URL}/api/${SECOND_URL}`);
}

function getChannel(_id: string) {
  return http.get(`${DATABASE_URL}/api/${SECOND_URL}/${_id}`);
}

function addClientToChannel(user: Users, _id: string) {
  return http.put(`${DATABASE_URL}/api/${SECOND_URL}/addMember/${_id}`, {
    user,
  });
}

function addChatToChannel(message: string, _id: string) {
  return http.put(`${DATABASE_URL}/api/${SECOND_URL}/sendChat/${_id}`, {
    message,
  });
}
interface channel {
  _id: string;
}

function removeClientFromChannel(user: Users, channel: Channel) {
  return http.put(
    `${DATABASE_URL}/api/${SECOND_URL}/removeMember/${channel._id}`,
    user
  );
}

const exportObject = {
  createChannel,
  getChannels,
  getChannel,
  addClientToChannel,
  removeClientFromChannel,
  addChatToChannel,
};

export default exportObject;
