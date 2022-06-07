import { FlexPlugin } from '@twilio/flex-plugin';


import CustomizeFlexActions from './flex-hooks/actions';

const PLUGIN_NAME = "AdvancedMessagingEventsPlugin";

export default class AdvancedMessagingEventsPlugin extends FlexPlugin {
  constructor () {
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

    const initializers = [
      CustomizeFlexActions,
      CustomizeFlexComponents,
    ];

    initializers.forEach((initializer) => initializer(flex, manager));


  }
}
