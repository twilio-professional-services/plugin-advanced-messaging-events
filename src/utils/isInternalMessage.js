require('dotenv').config();

// Determines if a message is from an internal (agent) or external (customer) source
function isInternalMessage(message, members, config = {}) {

  // check that there is a message/author
  let author = message?.source?.state?.author;
  if (!author) {
    return undefined;
  }

  // pull external role sids from .env
  if (process.env.EXTERNAL_ROLE_SIDS) {
    config.externalRoleSids = JSON.parse(process.env.EXTERNAL_ROLE_SIDS)
  }

  // pull the message author's roleSid from the members map
  let roleSid = members.get(author).source.state.roleSid;

  // check optional externalRoleSids to see if the author sid
  // corresponds to an external role
  if (config?.externalRoleSids && config?.externalRoleSids[roleSid]) {
    return false;
  }

  // fallback again to `isFromMe` if `member_type` is undefined
  else if (message.isFromMe != undefined){
    return message.isFromMe
  }

  // default to assuming the message is internal
  return true;
}

export default isInternalMessage;