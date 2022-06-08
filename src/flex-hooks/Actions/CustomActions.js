import * as Flex from '@twilio/flex-ui';

export default (flex, manager) => {
    flex.Actions.registerAction("UrgencyMode", (payload) => {
        alert("UrgentMode ")
    })
    flex.Actions.registerAction("StaleMode", (payload) => {
        alert("StaleMode")
    })
}
