# Advanced Messaging Events Flex Plugin

This plugin exposes actions which can be used to trigger functionality when it has been some time since the last chat message in a chat conversation. `StaleMode` is emitted when the most recent message was from an agent; `UrgencyMode` is emitted when the most recent message was from the customer. The threshold (time since last message) for a chat to be considered stale or urgent are configurable, as well as the role SID(s) representing the customer.

## Installation

First, copy `.env.sample` to `.env` and make modifications per the instructions in that file.

Make sure you have [Node.js](https://nodejs.org) as well as [`npm`](https://npmjs.com). We support Node >= 10.12 (and recommend the _even_ versions of Node). Afterwards, install the dependencies by running `npm install`:

```bash
cd

# If you use npm
npm install
```

Next, please install the [Twilio CLI](https://www.twilio.com/docs/twilio-cli/quickstart) by running:

```bash
brew tap twilio/brew && brew install twilio
```

Finally, install the [Flex Plugin extension](https://github.com/twilio-labs/plugin-flex/tree/v1-beta) for the Twilio CLI:

```bash
twilio plugins:install @twilio-labs/plugin-flex
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

This Twilio plugin adds support for two custom actions: `StaleMode` and `UrgencyMode`. Use the following event listeners to add custom code once the custom actions have been observed:

```
Actions.addListener("afterStaleMode", () => {
    // Add your custom action code here
});

Actions.addListener("afterUrgencyMode", () => {
    // Add your custom action code here
});
```

## Development

Run `twilio flex:plugins --help` to see all the commands we currently support. For further details on Flex Plugins refer to our documentation on the [Twilio Docs](https://www.twilio.com/docs/flex/developer/plugins/cli) page.
