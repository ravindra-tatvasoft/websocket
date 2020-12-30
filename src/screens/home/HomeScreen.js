import React, { useEffect, useState, useRef } from "react";
import {
    View, Keyboard, TextInput, Image,
    StyleSheet, Text, TouchableOpacity
} from 'react-native';
import { IsJsonString, IsValidUrl } from "../../utils/validation";

import styles from './styles'
import WS from 'react-native-websocket'
import { disconnectSocket, initSocket, sendMessage } from "../../sockets/WebSocket";
import { EventEmitter } from "../../utils/Event";
import { constants } from "../../utils/constants";
import { ScrollView } from "react-native-gesture-handler";
import { images } from "../../assets/images";

export default function HomeScreen({ route, navigation }) {

    const [txtSocket, setTxtSocket] = useState(''); //wss://echo.websocket.org
    const [txtMessage, setMessage] = useState('');
    const [logs, setLogs] = useState([]);
    const [isHideLog, setHideLog] = useState(false)

    useEffect(() => {
        subscribeEvent()
        return () => {
            //Clear state
            disconnectSocket()
        }
    }, []);

    /** Subscribe event for listen logs */
    function subscribeEvent() {
        EventEmitter.subscribe(constants.KEY_EVENT_LOG, logMessage => {
            console.log("logMessage ", logMessage)
            logs.push(logMessage)
            setLogs(JSON.stringify(logs))
        });
    }
    /**
     *  Handle button clicks
     */
    function handleButtnClick(type) {
        Keyboard.dismiss()
        switch (type) {
            case 1:
                initSocket(txtSocket)
                break;
            case 2:
                disconnectSocket(txtMessage)
                break;
            case 3:
                if(!txtMessage || txtMessage.trim().length <=0 || !IsJsonString(txtMessage)){
                    alert('Please enter valid message')
                    return
                }
                sendMessage(txtMessage)
                setMessage("")
                break;
            case 4:
                setLogs([])
                break
            default:
                break;
        }
    }

    /**
     * UI components for buttons
     */
    function viewButton(type, lable, isDisabled, styleProps = {}) {
        return (<TouchableOpacity
            disabled={isDisabled}
            onPress={() => handleButtnClick(type)}
            style={[styles.buttnRoot, styleProps ,{backgroundColor:isDisabled ? 'rgba(93, 173, 226,0.4)':'#5DADE2'}]}>
            <Text style={styles.btnTxt}>{lable}</Text>
        </TouchableOpacity>)
    }

    /** Label text */
    function labelsText(text, stylesProps = {}) {
        return (<Text style={[styles.txtLocation, stylesProps]}>{text}</Text>)
    }
    /**
     * Toggle button for on/off log window
     */
    function toggleSwitch(images) {
        return (
            <TouchableOpacity onPress={() => setHideLog(!isHideLog)}>
                <Image
                    style={{ width: 40, height: 30, }}
                    source={images}
                    resizeMode='cover'
                />
            </TouchableOpacity>
        )
    }
    return (

        <View style={styles.root}>
            {labelsText('Location')}
            <TextInput
                style={styles.inputLocation}
                maxLength={100}
                keyboardType='url'
                autoCapitalize='none'
                autoCorrect={false}
                onChangeText={text => setTxtSocket(text)}
                placeholder="Enter web socket address"
                placeholderTextColor='gray'
                value={txtSocket}
            />
            {(txtSocket.length > 0 && !IsValidUrl(txtSocket))
                && <Text style={styles.txtError}>Please enter valid socket url</Text>}
            {/** Buttons for connect and disconnect socket */}
            <View style={styles.btnConnectRoot}>
                {viewButton(1, 'Connect', !IsValidUrl(txtSocket), styles.flex1)}
                {viewButton(2, 'Disconnect', false, [{ marginStart: 20 }, styles.flex1])}
            </View>
            {labelsText('Message', { marginTop: 15 })}
            <TextInput
                style={styles.inputLocation}
                maxLength={100}
                autoCapitalize='none'
                autoCorrect={false}
                onChangeText={text => setMessage(text)}
                placeholder="Enter message"
                placeholderTextColor='gray'
                value={txtMessage}
            />
            {(txtMessage.length > 0 && !IsJsonString(txtMessage))
                && <Text style={styles.txtError}>You can enter only JSON</Text>}
            {viewButton(3, 'Send', false, styles.btnSend)}

            <View style={styles.rootLog}>
                {labelsText('Log', { flex: 1 })}
                {toggleSwitch(isHideLog ? images.IMG_OFF : images.IMG_ON)}
            </View>

            {/** Log section */}
            {!isHideLog && <View>
                <Text style={styles.txtLogs}>{logs}</Text>
                {viewButton(4, 'Clear Log', false, { marginTop: 15 })}
            </View>}
        </View>
    )
}


