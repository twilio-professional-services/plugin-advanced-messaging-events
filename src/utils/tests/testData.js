module.exports = {
    memberMap: new Map([
        [
          "txezLjyJfNanjF1t2Xs3svfOvRGXQRIb",
          {
            friendlyName: "Customer",
            online: true,
            source: {
              channel: {},
              services: {},
              state: {
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
                attributes: {
                  member_type: "agent",
                },
              },
            },
          },
        ],
    ]),
    emptyMessageArray: [],
    singleMessageArray: [
        {
            authorName: "Customer",
            source: {
                state: {
                    author: 'txezLjyJfNanjF1t2Xs3svfOvRGXQRIb',
                    index: '0'
                }
            }
        }
    ],
    twoMessagesFromSameUserArray: [
        {
            authorName: "Customer",
            source: {
                state: {
                    author: 'txezLjyJfNanjF1t2Xs3svfOvRGXQRIb',
                    index: '0'
                }
            }
        },
        {
            authorName: "Customer",
            source: {
                state: {
                    author: 'txezLjyJfNanjF1t2Xs3svfOvRGXQRIb',
                    index: '1'
                }
            }
        }
    ],
    backAndForthMessageArray: [
        {
            authorName: "Customer",
            source: {
                state: {
                    author: 'txezLjyJfNanjF1t2Xs3svfOvRGXQRIb',
                    index: '0'
                }
            }
        },
        {
            authorName: "Agent",
            source: {
                state: {
                    author: 'authenticatedagent',
                    index: '1'
                }
            }
        },
        {
            authorName: "Customer",
            source: {
                state: {
                    author: 'txezLjyJfNanjF1t2Xs3svfOvRGXQRIb',
                    index: '2'
                }
            }
        },
        {
            authorName: "Agent",
            source: {
                state: {
                    author: 'authenticatedagent',
                    index: '3'
                }
            }
        }
    ]
}