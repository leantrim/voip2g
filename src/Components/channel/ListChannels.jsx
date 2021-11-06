import React, { Component } from "react";

// Tanken är att hämta channels från databasen här ifrån!

class ListChannels extends Component {
  state = {
    // Falsk DB.
    channels: [
      {
        name: 'Hemma',
        isChat: false,
      },
      {
        name: 'All Chat',
        isChat: true,
      },
      {
        name: 'Gaming',
        isChat: false,
      },
      {
        name: 'RedBull Racing',
        isChat: false,
      },
      {
        name: 'OSRS FUCK RS',
        isChat: false,
      },
      {
        name: 'AFK',
        isChat: false,
      },
    ]
  }
  renderChannelIcon = (channel) => {
    let classes = "mt-3 p-5 text-info fas ";
    classes += channel.isChat ? "fa-comment-alt" : "fa-headset";
    return classes;
  }

  render() {
    return (
      <>
        {this.state.channels.map((x) => 
                  <h5
                  style={{ cursor: "pointer" }}
                  className={this.renderChannelIcon(x)}
                  variant="primary"
                >
                  {" "}
                  {x.name}
                </h5>
        )}
      </>
    );
  }
}

export default ListChannels;
