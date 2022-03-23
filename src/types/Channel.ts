export default interface Channel {
  map?(arg0: (chan: Channel[]) => JSX.Element): import("react").ReactNode;
  _id?: string;
  name: string;
  isChat?: boolean;
  currentUsers?: string;
  chatLog?: string;
  author?: string;
  isDefault?: boolean;
  chan?: any;
  handleClickDisconnect?: any;
  handleChannelClick?: any;
  loadChannels?: Function;
  channel?: any;
  createChannel?: any;
  key?: string;
}
