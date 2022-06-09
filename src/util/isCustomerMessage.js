require('dotenv').config();

import convertEnvStringToArray from './convertEnvStringToArray';

// Determines if a message is from an internal (agent) or external (customer) source
function isCustomerMessage(message, members, config = {}) {

  // check that there is a message/author
  let author = message?.source?.state?.author;
  if (!author) {
    return undefined;
  }

  // if there is a MemberMap provided, look at the roleSid to see if it corresponds
  // to a customer role
  if (members instanceof Map) {
    let customerRoleSids = [];

    // pull strings/arrays of customerRoleSids from the config object
    if (config.customerRoleSids) {
      if (Array.isArray(config.customerRoleSids)) {
        customerRoleSids.push(...config.customerRoleSids);
      } else {
        customerRoleSids.push(config.customerRoleSids);
      }
    }

    // pull external role sids from .env.
    if (process.env.CUSTOMER_ROLE_SIDS) {
      customerRoleSids.push(...convertEnvStringToArray(process.env.CUSTOMER_ROLE_SIDS))
    }

    // pull the message author's roleSid from the members map
    let authorRoleSid = members.get(author)?.source?.state?.roleSid;

    // check customerRoleSids to see if the author sid
    // corresponds to an external role
    if (customerRoleSids.includes(authorRoleSid)) {
      return true;
    }
  }

  // fallback again to `isFromMe` if `member_type` is undefined
  if (message.isFromMe != undefined){
    return !message.isFromMe
  }

  // default to assuming the message is internal
  return false;
}

export default isCustomerMessage;