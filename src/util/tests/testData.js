export default {
    memberMap: new Map([
        [
          "txe_simulated_author_sid",
          {
            friendlyName: "Customer",
            online: true,
            source: {
              channel: {},
              services: {},
              state: {
                roleSid: 'RL_simulated_external_role_sid',
                attributes: {
                  member_type: "guest",
                },
              },
            },
          },
        ],
        [
          "authenticatedagent",
          {
            friendlyName: "Auth Agent",
            online: true,
            source: {
              channel: {},
              services: {},
              state: {
                roleSid: 'RL_simulated_internal_role_sid',
                attributes: {
                  member_type: "agent",
                },
              },
            },
          },
        ],
    ]),
    customerRoleSidsObj: {
        'RL_simulated_external_role_sid': 'guest',
        'RL_SIMULATED_CHANNEL_USER_SID': 'channel_user'
    },
    customerRoleSidsArr: ['RL_simulated_external_role_sid'],
    customerRoleSidsString: 'RL_simulated_external_role_sid',
    emptyMessageArray: [],
    singleCustomerMessageArray: [
        {
            authorName: "Customer",
            source: {
                state: {
                    author: 'txe_simulated_author_sid',
                    index: '0',
                    sid: 'IM_simulated_message_sid_0'
                }
            },
            isFromMe: false
        }
    ],
    singleAgentMessageArray: [
        {
            authorName: "Agent",
            source: {
                state: {
                    author: 'authenticatedagent',
                    index: '0',
                    sid: 'IM_simulated_message_sid_0'
                }
            },
            isFromMe: true
        }
    ],
    twoCustomerMessagesArray: [
        {
            authorName: "Customer",
            source: {
                state: {
                    author: 'txe_simulated_author_sid',
                    index: '0',
                    sid: 'IM_simulated_message_sid_0'
                }
            },
            isFromMe: false
        },
        {
            authorName: "Customer",
            source: {
                state: {
                    author: 'txe_simulated_author_sid',
                    index: '1',
                    sid: 'IM_simulated_message_sid_1'
                }
            },
            isFromMe: false
        }
    ],
    twoAgentMessagesArray: [
        {
            authorName: "Agent",
            source: {
                state: {
                    author: 'authenticatedagent',
                    index: '0',
                    sid: 'IM_simulated_message_sid_0'
                }
            }
        },
        {
            authorName: "Agent",
            source: {
                state: {
                    author: 'authenticatedagent',
                    index: '1',
                    sid: 'IM_simulated_message_sid_1'
                }
            }
        }
    ],
    backAndForthEndingWithAgentMessageArray: [
        {
            authorName: "Customer",
            source: {
                state: {
                    author: 'txe_simulated_author_sid',
                    index: '0',
                    sid: 'IM_simulated_message_sid_0'
                }
            },
            isFromMe: false
        },
        {
            authorName: "Agent",
            source: {
                state: {
                    author: 'authenticatedagent',
                    index: '1',
                    sid: 'IM_simulated_message_sid_1'
                }
            },
            isFromMe: true
        },
        {
            authorName: "Customer",
            source: {
                state: {
                    author: 'txe_simulated_author_sid',
                    index: '2',
                    sid: 'IM_simulated_message_sid_2'
                }
            },
            isFromMe: false
        },
        {
            authorName: "Agent",
            source: {
                state: {
                    author: 'authenticatedagent',
                    index: '3',
                    sid: 'IM_simulated_message_sid_3'
                }
            },
            isFromMe: true
        }
    ],
    backAndForthMessageArrayNoIsFromMe: [
        {
            authorName: "Customer",
            source: {
                state: {
                    author: 'txe_simulated_author_sid',
                    index: '0',
                    sid: 'IM_simulated_message_sid_0'
                }
            }
        },
        {
            authorName: "Agent",
            source: {
                state: {
                    author: 'authenticatedagent',
                    index: '1',
                    sid: 'IM_simulated_message_sid_1'
                }
            }
        },
        {
            authorName: "Customer",
            source: {
                state: {
                    author: 'txe_simulated_author_sid',
                    index: '2',
                    sid: 'IM_simulated_message_sid_2'
                }
            }
        },
        {
            authorName: "Agent",
            source: {
                state: {
                    author: 'authenticatedagent',
                    index: '3',
                    sid: 'IM_simulated_message_sid_3'
                }
            }
        }
    ]
}