import React from "react";
import { VERSION, Actions } from "@twilio/flex-ui";
import { FlexPlugin } from "@twilio/flex-plugin";
import * as ActionsUtil from "./util/actionsUtil.js";

import CustomTaskListContainer from "./components/CustomTaskList/CustomTaskList.Container";
import reducers, { namespace } from "./states";

const PLUGIN_NAME = "AdvancedMessagingEventsPlugin";

export default class AdvancedMessagingEventsPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  async init(flex, manager) {
    this.registerReducers(manager);

    const options = { sortOrder: -1 };
    flex.AgentDesktopView.Panel1.Content.add(
      <CustomTaskListContainer key="AdvancedMessagingEventsPlugin-component" />,
      options
    );

    ActionsUtil.registerAction("StaleAction");
    ActionsUtil.registerAction("UrgencyAction");

    Actions.addListener("afterStaleAction", () => {
      // Add your custom action code here
    });

    Actions.addListener("afterUrgencyAction", () => {
      // Add your custom action code here
    });
  }

  /**
   * Registers the plugin reducers
   *
   * @param manager { Flex.Manager }
   */
  registerReducers(manager) {
    if (!manager.store.addReducer) {
      // eslint-disable-next-line
      console.error(
        `You need FlexUI > 1.9.0 to use built-in redux; you are currently on ${VERSION}`
      );
      return;
    }

    manager.store.addReducer(namespace, reducers);
  }
}
