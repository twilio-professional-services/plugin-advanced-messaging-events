import React, { useEffect, useState } from 'react';
import * as Flex from '@twilio/flex-ui';
import getKeyMessage from '../../util/getKeyMessage';

const URGENCY_MODE = "URGENCY_MODE";
const STALE_MODE = "STALE_MODE";
const DEFAULT_MODE = "DEFAULT_MODE";
const TASK_STATUS_WRAPPING = 'wrapping';
const ONE_SECOND = 1000;
const ONE_MINUTE = 1000 * 60;

const modes = {
    URGENCY_MODE: {
        name: URGENCY_MODE,
        actionName: "UrgencyMode",
        timerThreshold: ONE_MINUTE
    },
    STALE_MODE: {
        name: STALE_MODE,
        actionName: "StaleMode",
        timerThreshold: ONE_MINUTE
    },
    DEFAULT_MODE: {
        name: DEFAULT_MODE,
        actionName: "DefaultMode"
    }
};

// Calculates Ms Since Key Message
const getMsSinceKeyMessage = (keyMessage) => {
    const now = new Date().getTime();
    const messageTime = new Date(keyMessage?.source?.timestamp).getTime()
    return Math.floor((now - messageTime));
}

// Function to verify the current status of the chat
// Get the message timestamp and compare with the current timestamp
// Check if the threshold have been reached for both cases (agent and customer)
// if none conditions matched, return DefaultMode
const checkMode = (keyMessage, isFromCustomer) => {
    if (!keyMessage) {
        return modes.DEFAULT_MODE;
    }
    return isFromCustomer ? modes.URGENCY_MODE : modes.STALE_MODE;
}

function StaleChecker({task, chatChannel}) {
    if (!task || !chatChannel) {
        return null;
    }

    const { messages, members } = chatChannel;
    if (!messages || !members) {
        return null;
    }

    const taskStatus = task.status;
    const { keyMessage } = getKeyMessage(messages, members);

    if (!keyMessage) return null;

    const [canFireAction, setCanFireAction] = useState(true);

    // set a timer that runs every second
    // cleans itself up once the task enters wrapping
    useEffect(() => {
        let intervalId;

        const cleanup = () => clearInterval(intervalId);

        if (taskStatus === TASK_STATUS_WRAPPING) {
            return cleanup;
        }

        intervalId = setInterval(() => {
            const { keyMessage, isFromCustomer } = getKeyMessage(messages, members);
            const currentMode = checkMode(keyMessage, isFromCustomer);

            // if default mode - there is no timerThreshold
            if (currentMode.name === DEFAULT_MODE) return;

            // check if we've already fired our action
            if (!canFireAction) return;

            if (getMsSinceKeyMessage(keyMessage) >= currentMode.timerThreshold) {
                Flex.Actions.invokeAction(currentMode.actionName, { task, chatChannel })
                console.log(currentMode.actionName.toUpperCase())
                // action fired, set this to false so we dont constantly fire the action
                setCanFireAction(false);
            }
        }, ONE_SECOND);

        return cleanup;
    }, [taskStatus, messages, members, canFireAction]);

    // when the key message changes, we can fire new actions
    useEffect(() => {
        setCanFireAction(true);
    }, [keyMessage])

    return (<div />);
}

export default StaleChecker;