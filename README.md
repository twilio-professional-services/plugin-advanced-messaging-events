# Advanced Messaging Events Flex Plugin

This plugin exposes actions which can be used to trigger functionality when it has been some time since the last chat message in a chat conversation, such as SMS or web chat. `MessageStaleMode` is emitted when the most recent message was from an agent; `MessageUrgencyMode` is emitted when the most recent message was from the customer. The threshold (time since last message) for a chat to be considered stale or urgent are configurable, as well as the role SID(s) representing the customer.

**For the Flex UI 1.x version of this plugin, see [the flex-ui-1 branch](https://github.com/twilio-professional-services/plugin-advanced-messaging-events/tree/flex-ui-1).**

## Disclaimer

**This software is to be considered "sample code", a Type B Deliverable, and is delivered "as-is" to the user. Twilio bears no responsibility to support the use or implementation of this software.**

## Pre-requisites

Make sure you have [Node.js](https://nodejs.org) as well as [`npm`](https://npmjs.com) installed.

Next, please install the [Twilio CLI](https://www.twilio.com/docs/twilio-cli/quickstart). If you are using Homebrew on macOS, you can do so by running:

```bash
brew tap twilio/brew && brew install twilio
```

Finally, install the [Flex Plugin extension](https://www.twilio.com/docs/flex/developer/plugins/cli/install) for the Twilio CLI:

```bash
twilio plugins:install @twilio-labs/plugin-flex
```

## Installation

First, clone the repository and change to its directory:

```bash
git clone https://github.com/twilio-professional-services/plugin-advanced-messaging-events.git

cd plugin-advanced-messaging-events
```

Then, copy `.env.sample` to `.env` and make modifications per the instructions in that file.

```bash
cp .env.sample .env
```

Copy `public/appConfig.example.js` to `public/appConfig.js`:

```bash
cp public/appConfig.example.js public/appConfig.js
```

Install the dependencies:

```bash
npm install
```

Run the plugin locally:

```bash
twilio flex:plugins:start
```

## Configuration

The following environment variables must be configured in the `.env` file created in the previous section:

- **FLEX_APP_CUSTOMER_ROLE_SIDS**: Array of role SIDs that represent the customer role(s).
- **FLEX_APP_STALE_THRESHOLD_SECONDS**: If the last message in the conversation was from an agent, the number of seconds before the chat is considered stale.
- **FLEX_APP_URGENCY_THRESHOLD_SECONDS**: If the last message in the conversation was from the customer, the number of seconds before the chat is considered urgent.

This plugin also supports the [Configuration API](https://www.twilio.com/docs/flex/developer/ui/configuration), allowing you to update settings without a new deploy/release of the plugin. Add the following object to the `ui_attributes` configuration object with your desired values:

```
"messaging_events": {
    "stale_threshold_seconds": 360,  // overrides FLEX_APP_STALE_THRESHOLD_SECONDS
    "urgency_threshold_seconds": 180 // overrides FLEX_APP_URGENCY_THRESHOLD_SECONDS
}
```

## Custom Actions

This Twilio plugin adds support for three custom actions: `MessageDefaultMode`, `MessageStaleMode`, and `MessageUrgencyMode`. The `payload` parameter includes contextual information regarding the task and channel that triggered the action. Use the following event listeners to add custom code once the custom actions have been observed:

```
flex.Actions.addListener("afterMessageDefaultMode", (payload) => {
    // Add your custom action code here
});

flex.Actions.addListener("afterMessageStaleMode", (payload) => {
    // Add your custom action code here
});

flex.Actions.addListener("afterMessageUrgencyMode", (payload) => {
    // Add your custom action code here
});
```

## Notable Features

This plugin has a few specific features intended to account for some of the more common edge cases that may be encountered.

### Key Message

Actions emitted by this plugin are based on the _key message_. Consider the scenario where a customer sends a message, waits a minute, then sends another message, without the agent sending a message in between. In this scenario, we would want to use the first of these two messages when determining when to enter urgency mode--otherwise the customer could unintentionally prevent the chat from entering urgency mode. This is the key message--the first message _in a group of messages_ sent by the same chat member who sent the latest message. The key message changes whenever a different member sends a chat message.

### Role Detection

When configuring this plugin, the customer role SID(s) must be entered. This allows uniquely identifying the customer in a chat conversation when there are more than two participants, such as with [chat transfer](https://github.com/twilio-professional-services/plugin-chat-sms-transfer). The plugin will consider any participant with a role SID not within the array of customer role SIDs to be an internal participant. This prevents the plugin from emitting the wrong type of event in a transfer scenario.

## Development

Run `twilio flex:plugins --help` to see all the commands we currently support. For further details on Flex Plugins refer to our documentation on the [Twilio Docs](https://www.twilio.com/docs/flex/developer/plugins/cli) page.
