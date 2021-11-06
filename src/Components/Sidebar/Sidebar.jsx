import React from 'react'
import "./sidebar.css"
import NewChannel from '../channel/NewChannel';

function Sidebar(props) {
    return (
        <div className="app">
            <div className="sidebar__top">
                <NewChannel channel={props.channel} useri={props.useri} handleNewChannel={props.makeChannel} channel={props.channel} />
            </div>
        </div>
    )
}

export default Sidebar
