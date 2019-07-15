import React from "react"

import MessageList from "./MessageList"
import SendMessageForm from "./SendMessageForm"
import ChannelList from "./ChannelList"
import NewChannelForm from "./NewChannelForm"

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <ChannelList />
        <MessageList />
        <SendMessageForm />
        <NewChannelForm />
      </div>
    )
  }
}

export default App
