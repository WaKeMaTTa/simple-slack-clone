import React from "react"

class SendMessageForm extends React.Component {
  constructor() {
    super()
    this.state = {
      message: ''
    }
    this.handleNewMessage = this.handleNewMessage.bind(this)
    this.handleSumbit = this.handleSumbit.bind(this)
  }

  handleNewMessage(e) {
    // console.log(e.target.value)
    this.setState({
      message: e.target.value
    })
  }

  handleSumbit(e) {
    e.preventDefault()
    // console.log(this.state.message)
    this.props.sendMessage(this.state.message)
    this.setState({
      message: ''
    })
  }

  render() {
    // console.log(this.state.message)
    return (
      <form onSubmit={this.handleSumbit}
            className="send-message-form">
        <input onChange={this.handleNewMessage}
               value={this.state.message}
               disabled={this.props.disabled}
               type="text"
               placeholder="Your message here..." />
      </form>
    )
  }
}

export default SendMessageForm
