function getSenderType(message, members) {
  return members.get(message.source.state.author).source.state.attributes
    .member_type;
}

module.exports = getSenderType;