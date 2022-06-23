import React, { useEffect, useState } from 'react';
import * as Flex from '@twilio/flex-ui';
import getKeyMessage from '../../util/getKeyMessage';


const URGENCY_MODE = "URGENCY_MODE";
const STALE_MODE = "STALE_MODE";
const DEFAULT_MODE = "DEFAULT_MODE";

const modes = {
    URGENCY_MODE: {
        name: URGENCY_MODE,
        actionName: "UrgencyMode",
        timerThreshold: 5
    },
    STALE_MODE: {
        name: STALE_MODE,
        actionName: "StaleMode",
        timerThreshold: 3
    },
    DEFAULT_MODE: {
        name: DEFAULT_MODE,
        actionName: "DefaultMode"
    }
}
function StaleChecker(props) {

    const [chatMode, setChatMode] = useState(modes.DEFAULT_MODE);
    const [clock, setClock] = useState(true);

    // useEffect with [] param should behave as ComponentDidMount
    // Here we start a loop to get the key message and check the current mode. At the end we only update the React State if the mode has changed
    useEffect(() => {
        const interval = setInterval(() => {
            setClock(clock => !clock)
        }, 2000);

        return () => clearInterval(interval);
    }, [])

    useEffect(() => {
        if (props.chatChannel) {
            const message = getKeyMessage(props.chatChannel.messages, props.chatChannel.members)
            if (message.keyMessage) {
                const currentMode = checkMode(message);
                setChatMode(currentMode)
            }
        }
    }, [clock])

    // useEffect with [chatMode] param should behave as ComponentDidUpdate, but should run only if chatMode have been updated
    // Here we check if the new Mode is not the Default, since only Urgent and Stale mode should fire an Action
    useEffect(() => {
        if (chatMode.name != DEFAULT_MODE) {
            Flex.Actions.invokeAction(chatMode.actionName, { task: props.task, channel: props.chatChannel })
        }
    }, [chatMode])


    // Function to verify the current status of the chat
    // Get the message timestamp and compare with the current timestamp
    // Check if the threshold have been reached for both cases (agent and customer)
    // if none conditions matched, return DefaultMode
    function checkMode({ keyMessage, isFromCustomer }) {
        const now = new Date().getTime();
        const messageTime = new Date(keyMessage.source.timestamp).getTime()
        const minutesSinceKeyMessage = Math.floor((now - messageTime) / 60000);

        if (isFromCustomer) {
            if (minutesSinceKeyMessage > modes.URGENCY_MODE.timerThreshold) {
                return modes.URGENCY_MODE
            }
        } else {
            if (minutesSinceKeyMessage > modes.STALE_MODE.timerThreshold) {
                return modes.STALE_MODE
            }

        }

        return modes.DEFAULT_MODE;

    }

    return (<div />);
}

export default StaleChecker;