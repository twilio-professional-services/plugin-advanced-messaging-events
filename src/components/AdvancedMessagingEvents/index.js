import React, { useEffect, useState } from 'react';
import * as Flex from '@twilio/flex-ui';
import { checkMode } from '../../util/checkMode';
import { getKeyMessage } from '../../util/getKeyMessage';
import { modeConfig } from '../../util/modeConfig';
import { ChatMode } from '../../enums';

function AdvancedMessagingEvents(props) {
    const [chatMode, setChatMode] = useState(null);
    const [clock, setClock] = useState(true);

    // useEffect with [] param should behave as ComponentDidMount
    // Here we start a loop to get the key message and check the current mode. At the end we only update the React State if the mode has changed
    useEffect(() => {
        const interval = setInterval(() => {
            setClock(clock => !clock)
        }, 1000);

        return () => clearInterval(interval);
    }, [])

    useEffect(() => {
        if (!props.chatChannel) { return; }
        
        const message = getKeyMessage(props.chatChannel.messages, props.chatChannel.members)
        
        if (!message.keyMessage) { return; }
        
        const currentMode = checkMode(message);
        setChatMode(currentMode);
        
    }, [clock])

    // useEffect with [chatMode] param should behave as ComponentDidUpdate, but should run only if chatMode have been updated
    useEffect(() => {
        if (chatMode) {
            Flex.Actions.invokeAction(modeConfig[chatMode].actionName, { task: props.task, channel: props.chatChannel })
        }
    }, [chatMode])

    return (<div />);
}

export default AdvancedMessagingEvents;