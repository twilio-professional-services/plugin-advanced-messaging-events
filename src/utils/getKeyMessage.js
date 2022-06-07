import isInternalMessage from "./isInternalMessage";

function getKeyMessage(messages, members) {
    let storedMessage;
    let storedMessageIsInternal;
  
    // loop through the messages in reverse chronological order
    for (let i = messages.length - 1; i >= 0; i--) {

      let currentMessage = messages[i];

      // check to see if the message is internal or external
      let currentMessageIsInternal = isInternalMessage(currentMessage, members);

      // if the internal/external message status is different than the stored message,
      // the stored message is the key message
      if (storedMessage && currentMessageIsInternal != storedMessageIsInternal) {
        break;
      }
  
      // otherwise, set the stored message to the current message
      storedMessage = currentMessage;

      // and update the internal message flag
      storedMessageIsInternal = currentMessageIsInternal;
    }
  
    // when the loop breaks, the storedMessage is the keyMessage
    return {
      keyMessage: storedMessage,
      isInternal: storedMessageIsInternal
    };
  }

export default getKeyMessage;
