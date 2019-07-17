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
      channelId: null,
      messages: [],
      joinableChannels: [],
      joinedChannels: []
    }
    this.sendMessage = this.sendMessage.bind(this)
    this.getChannels = this.getChannels.bind(this)
    this.subscribeToChannel = this.subscribeToChannel.bind(this)
    this.createChannel = this.createChannel.bind(this)
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
        console.log('Successful connection', currentUser)
        this.currentUser = currentUser
        this.getChannels()
      })
      .catch(err => {
        console.log('Error on connection', err)
      })
  }

  getChannels() {
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
   }

  subscribeToChannel(channelId) {
    this.setState({
      messages: []
    })

    this.currentUser
      .subscribeToRoom({
        roomId: channelId,
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
      .then(channel => {
        this.setState({
          channelId: channel.id
        })
        this.getChannels()
      })
      .catch(err => console.log('Error on subscribing to channel: ', err))
  }

  sendMessage(text) {
    if (this.state.channelId == null) {
      alert('You must be in a channel first.')
      return
    }

    this.currentUser.sendMessage({
      text: text,
      roomId: this.state.channelId
    })
  }

  createChannel(channelName) {
    // console.log('Creating channel with name ', channelName)
    this.currentUser.createRoom({
        name: channelName
      })
      .then(channel => {
        this.subscribeToChannel(channel.id)
      })
      .catch(err => console.log('Error with createChannel', err))
  }

  render() {
    return (
      <div className="app">
        <ChannelList channelId={this.state.channelId}
                     subscribeToChannel={this.subscribeToChannel}
                     channels={[...this.state.joinableChannels, ...this.state.joinedChannels]} />
        <MessageList channelId={this.state.channelId}
                     messages={this.state.messages} />
        <SendMessageForm sendMessage={this.sendMessage} />
        <NewChannelForm createChannel={this.createChannel} />
      </div>
    )
  }
}

export default App
