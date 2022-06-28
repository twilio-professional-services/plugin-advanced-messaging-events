import { SilentActionHandler } from "../../util/actionsUtil";
import { ActionName } from '../../enums';

export default (flex, manager) => {
    flex.Actions.registerAction(ActionName.default, (payload) => {
        SilentActionHandler({ ...payload, action: ActionName.default })
    });
    flex.Actions.registerAction(ActionName.urgency, (payload) => {
        SilentActionHandler({ ...payload, action: ActionName.urgency })
    });
    flex.Actions.registerAction(ActionName.stale, (payload) => {
        SilentActionHandler({ ...payload, action: ActionName.stale })
    });
}
