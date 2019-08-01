import React from 'react';
import { withWebRTC } from 'react-liowebrtc';

class Joystick extends React.Component {
    constructor(props) {
        super(props);
        console.log("my props", props);
        this.state = {
            acceleration: {
                x: 0,
                y: 0,
                z: 0,
            },
            accelerationIncludingGravity: {
                x: 0,
                y: 0,
                z: 0,
            },
            interval: 0,
            rotationRate: {
                alpha: 0,
                beta: 0,
                gamma: 0,
            },
        };
    }
    sendEvent = () =>{
        this.props.webrtc.shout('chat', this.state.acceleration);
    }
    handleDeviceMotion = event => {
        //alert("Im changed");
        const { acceleration, accelerationIncludingGravity, interval, rotationRate } = event;
        this.props.webrtc.shout('chat', acceleration);
        this.setState({ acceleration, accelerationIncludingGravity, interval, rotationRate });
    };

    componentDidMount() {
        var self = this;
        console.log("Joystick componentDidMount");
        if (window.DeviceOrientationEvent) {
            // Listen for the event and handle DeviceOrientationEvent object
            window.addEventListener('devicemotion', self.handleDeviceMotion, false);
        }
        else{
            alert("not working")
        }
    }

    componentWillUnmount() {
        console.log("Joystick componentWillUnmount");
        window.removeEventListener('onorientationchange', this.handleDeviceMotion, true);
    }

    render() {
        const acceleration = this.state.acceleration;
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
export default withWebRTC(Joystick);