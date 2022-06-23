import { getMsSinceKeyMessage } from '../util/getMsSinceKeyMessage';
import { modeConfig } from '../util/modeConfig';
import { ChatMode } from '../enums';

// Function to verify the current status of the chat
// Get the message timestamp and compare with the current timestamp
// Check if the threshold have been reached for both cases (agent and customer)
// if none conditions matched, return DefaultMode
export const checkMode = ({ keyMessage, isFromCustomer }) => {
	if (!keyMessage) {
		return ChatMode.default;
	}
	
	const secondsSinceKeyMessage = Math.floor(getMsSinceKeyMessage(keyMessage) / 1000);
	const keyMessageMode = isFromCustomer ? ChatMode.urgency : ChatMode.stale;
	
	if (secondsSinceKeyMessage >= modeConfig[keyMessageMode].timerThreshold) {
		return keyMessageMode;
	}
	
	return ChatMode.default;
}