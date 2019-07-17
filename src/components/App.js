import { tokenUrl, instanceLocator } from '../config'

import React from "react"
import Chatkit from "@pusher/chatkit-client"

import MessageList from "./MessageList"
import SendMessageForm from "./SendMessageForm"
import ChannelList from "./ChannelList"
import NewChannelForm from "./NewChannelForm"

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      messages: [],
      joinableChannels: [],
      joinedChannels: []
    }
    this.sendMessage = this.sendMessage.bind(this)
  }

  componentDidMount() {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator: instanceLocator,
      userId: 'wakematta',
      tokenProvider: new Chatkit.TokenProvider({
        url: tokenUrl
      })
    })

    chatManager
      .connect()
      .then(currentUser => {
        // console.log('Successful connection', currentUser)
        this.currentUser = currentUser

        this.currentUser
          .getJoinableRooms()
          .then(joinableRooms => {
            this.setState({
              joinableChannels: joinableRooms,
              joinedChannels: this.currentUser.rooms
            })
          })
          .catch(err => {
            console.log('Error on joinableRooms: ', err)
          })

        this.currentUser
          .subscribeToRoom({
            roomId: '21655498',
            messageLimit: 20,
            hooks: {
              onMessage: message => {
                // console.log('message.text: ', message.text)
                this.setState({
                  messages: [...this.state.messages, message]
                })
              }
            }
          })
      })
      .catch(err => {
        console.log('Error on connection', err)
      })
  }

  sendMessage(text) {
    this.currentUser.sendMessage({
      text: text,
      roomId: '21655498'
    })
  }

  render() {
    return (
      <div className="app">
        <ChannelList channels={[...this.state.joinableChannels, ...this.state.joinedChannels]} />
        <MessageList messages={this.state.messages} />
        <SendMessageForm sendMessage={this.sendMessage} />
        <NewChannelForm />
      </div>
    )
  }
}

export default App
