import React from "react"

class ChannelList extends React.Component {
  render() {
    // console.log(this.props.channels)

    const orderedChannels = [...this.props.channels].sort((a, b) => a.id - b.id)

    return (
      <div className="channels-list">
        <h3>Channels</h3>
        <ul>
          {
            orderedChannels.map(channel => {
              const active = this.props.channelId === channel.id ? "active" : "";
              return (
                <li key={channel.id} className={"channel " + active}>
                  <a onClick={() => this.props.subscribeToChannel(channel.id)}
                     href="#">
                    #{channel.name}
                  </a>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

export default ChannelList
