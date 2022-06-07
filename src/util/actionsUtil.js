import { Actions } from "@twilio/flex-ui";

export function registerAction(action) {
  Actions.registerAction(action, async (payload) => {
    try {
      payload.task || payload.channel
        ? console.log(`${action} executed with task and channel information`)
        : console.log(
            `Task or channel information is missing for the ${action} action`
          );
    } catch (err) {
      console.log(err);
      throw err();
    }
  });
}
