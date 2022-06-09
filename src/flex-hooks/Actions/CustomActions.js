import { SilentActionHandler } from "../../util/actionsUtil";

export default (flex, manager) => {
    flex.Actions.registerAction("UrgencyMode", SilentActionHandler);
    flex.Actions.registerAction("StaleMode", SilentActionHandler);
}
