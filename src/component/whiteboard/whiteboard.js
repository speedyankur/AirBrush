import React from 'react';
import { withWebRTC } from 'react-liowebrtc';
class Whiteboard extends React.Component {
    constructor(props) {
        super(props);
        console.log("my props", props);
    }
    sendEvent = () =>{
        this.props.webrtc.shout('chat', {"msg":"test"});
    }
    render() {
        const { acceleration } = this.props;
        return (
            <div>
                <div>X:${acceleration.x}</div>
                <div>Y:${acceleration.y}</div>
                <div>Z:${acceleration.z}</div>
                <button onClick={this.sendEvent} >Send data</button>
            </div>
        );
    }
}

export default withWebRTC(Whiteboard);