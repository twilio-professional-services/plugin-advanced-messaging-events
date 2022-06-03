const getSenderType = require('./getSenderType');

function getKeyMessage(messages, members) {
    let keyMessage;
  
    for (let i = messages.length - 1; i >= 0; i--) {
      let senderType = getSenderType(messages[i], members);
      if (keyMessage && senderType != keyMessage.senderType) {
        break;
      }
  
      keyMessage = messages[i];
      keyMessage.senderType = senderType;
    }
  
    return keyMessage;
  }

module.exports = getKeyMessage;
