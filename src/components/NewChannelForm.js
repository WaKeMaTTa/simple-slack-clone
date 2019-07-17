import React from "react"

class NewChannelForm extends React.Component {
  constructor() {
    super()
    this.state = {
      channelName: ''
    }
    this.handleNewChannel = this.handleNewChannel.bind(this)
    this.handleSumbit = this.handleSumbit.bind(this)
  }

  handleNewChannel(e) {
    this.setState({
      channelName: e.target.value
    })
  }

  handleSumbit(e) {
    e.preventDefault()
    this.props.createChannel(this.state.channelName)
    this.setState({
      channelName: ''
    })
  }

  render() {
    return (
      <div className="new-channel-form">
        <form onSubmit={this.handleSumbit}>
          <input onChange={this.handleNewChannel}
                 value={this.state.channelName}
                 type="text"
                 placeholder="New channel..."
                 required />
          <button id="create-channel-btn">+</button>
        </form>
      </div>
    )
  }
}

export default NewChannelForm
