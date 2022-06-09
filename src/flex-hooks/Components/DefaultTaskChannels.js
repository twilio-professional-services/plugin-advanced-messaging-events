import StaleChecker from "../../components/StaleChecker"

export default (flex, manager) => {
    flex.DefaultTaskChannels.Chat.addedComponents = [
        {
            target: "TaskListItem",
            component: <StaleChecker
                key="StaleChecker"
            />
        }
    ]
}