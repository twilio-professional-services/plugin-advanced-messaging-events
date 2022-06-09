import React, { useEffect, useState } from 'react';
import * as Flex from '@twilio/flex-ui';

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

    function getKeyMessage(channel) {
        return {
            keyMessage: {
                source: {
                    timestamp: "2022-06-08T19:09:01.937Z"
                }
            },
            isInternal: true
        }
    }


    // useEffect with [] param should behave as ComponentDidMount
    // Here we start a loop to get the key message and check the current mode. At the end we only update the React State if the mode has changed
    useEffect(() => {
        const interval = setInterval(() => {
            verifyChatMode()
        }, 2000);

        return () => clearInterval(interval);
    }, [])

    function verifyChatMode() {
        if (props.chatChannel) {
            const keyMessage = getKeyMessage(props.chatChannel.messages, props.chatChannel.members)

            const currentMode = checkMode(keyMessage);

            setChatMode(currentMode)
        }
    }

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
    function checkMode({ keyMessage, isInternal }) {
        const now = new Date().getTime();
        const messageTime = new Date(keyMessage.source.timestamp).getTime()
        const timeSinceKeyMessage = now - messageTime;

        if (isInternal) {
            if (timeSinceKeyMessage > modes.URGENCY_MODE.timerThreshold) {
                return modes.URGENCY_MODE
            }
        } else {
            if (timeSinceKeyMessage > modes.STALE_MODE.timerThreshold) {
                return modes.STALE_MODE
            }
        }

        return modes.DEFAULT_MODE;

    }

    return (<div />);
}

export default StaleChecker;