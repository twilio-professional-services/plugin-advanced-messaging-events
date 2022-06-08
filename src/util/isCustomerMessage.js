require('dotenv').config();

import stringIsFound from './stringIsFound';

// Determines if a message is from an internal (agent) or external (customer) source
function isCustomerMessage(message, members, config = {}) {

  // check that there is a message/author
  let author = message?.source?.state?.author;
  if (!author) {
    return undefined;
  }

  let customerRoleSids = config.customerRoleSids;
  
  // pull external role sids from .env. try parsing as JSON, if that doesn't work,
  // load it as a regular string.
  if (process.env.CUSTOMER_ROLE_SIDS) {
    try {
      config.customerRoleSids = JSON.parse(process.env.CUSTOMER_ROLE_SIDS)
    }
    catch (e) {
      config.customerRoleSids = process.env.CUSTOMER_ROLE_SIDS;
    }
  }

  // pull the message author's roleSid from the members map
  let authorRoleSid = members.get(author).source.state.roleSid;

  // check optional customerRoleSids to see if the author sid
  // corresponds to an external role
  if (stringIsFound(authorRoleSid, config.customerRoleSids)) {
    return true;
  }

  // fallback again to `isFromMe` if `member_type` is undefined
  if (message.isFromMe != undefined){
    return !message.isFromMe
  }

  // default to assuming the message is internal
  return false;
}

export default isCustomerMessage;