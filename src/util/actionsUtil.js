export const SilentActionHandler = async (payload) => {
    try {
        payload.task || payload.channel
            ? console.log(`${payload.action} executed with task and channel information`, payload)
            : console.log(
                `Task or channel information is missing for the ${payload.action} action`
            );
    } catch (err) {
        console.log(err);
        throw err();
    }
};
