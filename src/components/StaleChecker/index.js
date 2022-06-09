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
        timerThreshold: ONE_SECOND * 6
    },
    STALE_MODE: {
        name: STALE_MODE,
        actionName: "StaleMode",
        timerThreshold: ONE_SECOND * 10
    },
    DEFAULT_MODE: {
        name: DEFAULT_MODE,
        actionName: "DefaultMode"
    }
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
    const { keyMessage, isFromCustomer } = getKeyMessage(messages, members);

    const getMsSinceKeyMessage = () => {
        const now = new Date().getTime();
        const messageTime = new Date(keyMessage?.source?.timestamp).getTime()
        return Math.floor((now - messageTime));
    }

    const [canFireAction, setCanFireAction] = useState(true);
    const [chatMode, setChatMode] = useState(modes.DEFAULT_MODE);
    const [msSinceKeyMessage, setMsSinceKeyMessage] = useState(getMsSinceKeyMessage());

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

    // set a timer that runs every second
    // cleans itself up once the task enters wrapping
    useEffect(() => {
        let intervalId;
        const cleanup = () => clearInterval(intervalId);

        if (taskStatus === TASK_STATUS_WRAPPING) {
            setMsSinceKeyMessage(0);
            return cleanup;
        }

        intervalId = setInterval(() => {
            setMsSinceKeyMessage(getMsSinceKeyMessage());
        }, ONE_SECOND);

        return cleanup;
    }, [taskStatus, keyMessage]);

    // check the mode everytime the keymessage changes, or the isFromCustomer changes
    useEffect(() => {
        const currentMode = checkMode(keyMessage, isFromCustomer);
        setChatMode(currentMode)
        // keymessage changed - that means we reset our fireAction state
        setCanFireAction(true);
    }, [keyMessage, isFromCustomer]);

    // every second, check to see if we should fire our action
    useEffect(() => {
        if (chatMode.name === DEFAULT_MODE) return;
        if (!canFireAction) return;

        if (msSinceKeyMessage >= chatMode.timerThreshold) {
            Flex.Actions.invokeAction(chatMode.actionName, { task, chatChannel })
            // action fired, set this to false so we dont constantly fire the action
            setCanFireAction(false);
        }
    }, [msSinceKeyMessage, chatMode, task, chatChannel])

    return (<div />);
}

export default StaleChecker;