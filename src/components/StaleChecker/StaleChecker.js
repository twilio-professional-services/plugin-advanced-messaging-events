import React, { useState } from 'react';
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
class StaleChecker extends React.Component {

    constructor (props) {
        const [chatMode, setChatMode] = useState(modes.DEFAULT_MODE);
    }

    getKeyMessage(channel) {
        return {
            author: "",
            message: "",
            timestamp: "",
        }
    }

    componentDidUpdate() {
        if (this.chatMode.name != DEFAULT_MODE) {
            Flex.Actions.invokeAction(this.chatMode.actionName, { task: this.props.task, channel: this.props.channel })
        }
    }

    checkMode(message) {
        const now = new Date().getTime();
        const messageTime = new Date(message.timestamp).getTime()
        const lastAuthor = message.author;
        const timeSinceLastMessage = now - messageTime;


        if (lastAuthor === 'agent') {
            if (timeSinceLastMessage > modes.URGENCY_MODE.timerThreshold) {
                return modes.URGENCY_MODE
            }
        } else {
            if (timeSinceLastMessage > modes.STALE_MODE.timerThreshold) {
                return modes.STALE_MODE
            }
        }

        return modes.DEFAULT_MODE;

    }

    componentDidMount() {
        setInterval(() => {
            const keyMessage = getKeyMessage(this.props.channel)

            const currentMode = this.checkMode(keyMessage);

            if (this.chatMode != currentMode) {
                this.setChatMode(currentMode)
            }

        }, 1000);
    }

    render() {

    }
}

export default StaleChecker;