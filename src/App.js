import React from 'react';
import { LioWebRTC } from 'react-liowebrtc';
import {
  BrowserView,
  MobileView
} from "react-device-detect";
import Whiteboard from './component/whiteboard/whiteboard';
import Joystick from './component/joystick/joystick'
import logo from './logo.svg';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      chatLog: [],
      acceleration: {
        x: 0, y: 0, z: 0
      },
      options: {
        debug: true,
        dataOnly: true
      }
    };
  }

  join = (webrtc) => webrtc.joinRoom('my-p2p-app-demo');

  handleCreatedPeer = (webrtc, peer) => {
    this.addChat(`Peer-${peer.id.substring(0, 5)} joined the room!`, ' ', true);
  }

  handlePeerData = (webrtc, type, payload, peer) => {
    switch (type) {
      case 'chat':
        this.addChat(`Peer-${peer.id.substring(0, 5)}`, payload);
        break;
      default:
        return;
    };
  }
  sendEvent = () => {
    this.props.webrtc.shout('chat', { "msg": "test" });
  }
  addChat = (name, payload, alert = false) => {
    console.log("payload", payload);

    this.setState({
      acceleration:payload 
    });
  }

  render() {
    const { options, acceleration } = this.state;
    return (
      <LioWebRTC
        options={options}
        onReady={this.join}
        onCreatedPeer={this.handleCreatedPeer}
        onReceivedPeerData={this.handlePeerData}
      >

        <BrowserView>
          <Whiteboard acceleration={acceleration} />
        </BrowserView>
        <MobileView>
          <Joystick />
        </MobileView>
      </LioWebRTC>
    );
  }
}

export default App;
