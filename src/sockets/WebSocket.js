/* global WebSocket */
/* eslint no-unused-vars: "off" */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { EventEmitter } from "../utils/Event";
import { constants } from '../utils/constants';

var socket = undefined
export function initSocket(address) {
    socket = new WebSocket(address)
    socket.onopen = () => socket.send("Connected");
    socket.onmessage = ({ data }) => {
        // console.log("Received : ", data);
        EventEmitter.dispatch(constants.KEY_EVENT_LOG,data)
    }
    socket.onerror = (error) => { EventEmitter.dispatch(constants.KEY_EVENT_LOG,error) }
    socket.onclose = () => {
        EventEmitter.dispatch(constants.KEY_EVENT_LOG,"Disconnected")
        console.log("onclose :: ")
    }
    // setWebSocket(socket)
}

export function disconnectSocket() {
    if(socket)socket.close()
}
export function sendMessage(data) {
    if(socket)socket.send(data)
}

// class WS extends Component {
//     state = {
//         ws: null
//     }

//     static defaultProps = {
//         reconnect: false
//     }

//     static propTypes = {
//         url: PropTypes.string.isRequired,
//         reconnect: PropTypes.bool,
//         onOpen: PropTypes.func,
//         onMessage: PropTypes.func,
//         onError: PropTypes.func,
//         onClose: PropTypes.func
//     }

//     send = (data) => this.state.ws.send(data)

//     componentDidMount() {
//         this.reconnect = !!this.props.reconnect
//         this._handleWebSocketSetup()
//     }

//     componentWillUnmount() {
//         this.reconnect = false
//         this.state.ws.close()
//     }

//     render() {
//         return null
//     }

//     _handleWebSocketSetup = () => {
//         // const ws = new WebSocket(this.props.url)
//         // ws.onopen = () => {
//         //     this.props.onOpen && this.props.onOpen()
//         //     this.send("Connected")
//         // }
//         // ws.onmessage = (event) => { this.props.onMessage && this.props.onMessage(event) }
//         // ws.onerror = (error) => { this.props.onError && this.props.onError(error) }
//         // ws.onclose = () => this.reconnect ? this._handleWebSocketSetup() : (this.props.onClose && this.props.onClose())
//         // this.setState({ ws })
//         const socket = new WebSocket("wss://echo.websocket.org/")
//         socket.onopen = () => socket.send(new Date().toGMTString());
//         socket.onmessage = ({ data }) => {
//             console.log("Received : ", data);

//             setTimeout(() => {
//                 socket.send(new Date().toGMTString());
//             }, 3000);
//         }
//         socket.onerror = (error) => { console.log("error :: ") }
//         socket.onclose = () => console.log("onclose :: ")
//         setWebSocket(socket)
//     }
// }

// export default WS
