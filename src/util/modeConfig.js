import * as Flex from "@twilio/flex-ui";
import { ActionName, ChatMode } from "../enums";

const {
  messaging_events = {
    stale_threshold_seconds: process.env.FLEX_APP_STALE_THRESHOLD_SECONDS,
    urgency_threshold_seconds: process.env.FLEX_APP_URGENCY_THRESHOLD_SECONDS,
  },
} = Flex.Manager.getInstance().serviceConfiguration.ui_attributes;

export const modeConfig = {
  [ChatMode.default]: {
    actionName: ActionName.default,
    timerThreshold: 0,
  },
  [ChatMode.urgency]: {
    actionName: ActionName.urgency,
    timerThreshold: messaging_events.urgency_threshold_seconds,
  },
  [ChatMode.stale]: {
    actionName: ActionName.stale,
    timerThreshold: messaging_events.stale_threshold_seconds,
  },
};
