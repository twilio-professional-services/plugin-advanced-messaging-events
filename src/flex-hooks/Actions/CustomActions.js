import { SilentActionHandler } from "../../util/actionsUtil";

export default (flex, manager) => {
    flex.Actions.registerAction("UrgencyMode", (payload) => {
        SilentActionHandler({ ...payload, action: "UrgencyMode" })
    });
    flex.Actions.registerAction("StaleMode", (payload) => {
        SilentActionHandler({ ...payload, action: "StaleMode" })
    });
}
