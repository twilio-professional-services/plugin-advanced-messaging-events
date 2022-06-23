import AdvancedMessagingEvents from "../../components/AdvancedMessagingEvents"

export default (flex, manager) => {
    flex.DefaultTaskChannels.Chat.addedComponents = [
        {
            target: "TaskListItem",
            component: <AdvancedMessagingEvents
                key="AdvancedMessagingEvents"
            />
        }
    ]
}