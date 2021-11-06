import Sidebar from './Sidebar/Sidebar';
import React, { Component } from 'react';
import ListChannels from './channel/ListChannels';


class MainPage extends Component {
    state = {
        channel: [],
    }
 
    render() {
        return (
            <div>
                    <ListChannels />
                    <Sidebar channel={this.state.channel} useri={this.props.useri} handleNewChannel={this.makeChannel} channel={this.channel}/>
                    <button onClick={this.props.handleLogout}>Logga Ut</button>
            </div>
        );
    }
}

export default MainPage;



