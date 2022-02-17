import http from "./httpService";
import { ChannelType } from "../types/channelType";
import { DATABASE_URL } from "../config.json";

const SECOND_URL = "channels";

interface Channel {
  [ChannelType.name]: string;
  [ChannelType.isChat]: boolean;
  [ChannelType.author]: string;
}

function createChannel(channel: Channel) {
  return http.post(`${DATABASE_URL}/api/${SECOND_URL}`, {
    [ChannelType.name]: ChannelType.name,
    [ChannelType.isChat]: ChannelType.isChat,
    [ChannelType.author]: ChannelType.author,
  });
}

function getChannels() {
  return http.get(`${DATABASE_URL}/api/${SECOND_URL}`);
}

function getChannel(_id: string) {
  return http.get(`${DATABASE_URL}/api/${SECOND_URL}/${_id}`);
}

function addClientToChannel(user: string, _id: string) {
  return http.put(`${DATABASE_URL}/api/${SECOND_URL}/addMember/${_id}`, {
    user,
  });
}
function removeClientFromChannel(user: string, _id: string) {
  return http.put(
    `${DATABASE_URL}/api/${SECOND_URL}/removeMember//${_id}`,
    user
  );
}

const exportObject = {
  createChannel,
  getChannels,
  getChannel,
  addClientToChannel,
  removeClientFromChannel,
};

export default exportObject;