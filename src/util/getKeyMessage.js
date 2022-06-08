import isCustomerMessage from "./isCustomerMessage";

function getKeyMessage(messages, members) {
    let storedMessage;
    let storedMessageIsFromCustomer;
  
    // loop through the messages in reverse chronological order
    for (let i = messages.length - 1; i >= 0; i--) {

      let currentMessage = messages[i];

      // check to see if the message is internal or external
      let currentMessageIsFromCustomer = isCustomerMessage(currentMessage, members);

      // if the internal/external message status is different than the stored message,
      // the stored message is the key message
      if (storedMessage && currentMessageIsFromCustomer != storedMessageIsFromCustomer) {
        break;
      }
  
      // otherwise, set the stored message to the current message
      storedMessage = currentMessage;

      // and update the internal message flag
      storedMessageIsFromCustomer = currentMessageIsFromCustomer;
    }
  
    // when the loop breaks, the storedMessage is the keyMessage
    return {
      keyMessage: storedMessage,
      isFromCustomer: storedMessageIsFromCustomer
    };
  }

export default getKeyMessage;
