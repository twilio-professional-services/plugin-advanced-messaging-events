import { ActionName, ChatMode } from '../enums';

export const modeConfig = {
	[ChatMode.urgency]: {
		actionName: ActionName.urgency,
		timerThreshold: process.env.FLEX_APP_URGENCY_THRESHOLD_SECONDS
	},
	[ChatMode.stale]: {
		actionName: ActionName.stale,
		timerThreshold: process.env.FLEX_APP_STALE_THRESHOLD_SECONDS
	}
}