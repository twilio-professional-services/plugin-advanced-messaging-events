const getKeyMessage = require('../getKeyMessage');
const testData = require('./testData');

test ('empty message array', () => {
    expect(getKeyMessage(testData.emptyMessageArray, testData.memberMap)).toBe(undefined)
})

test ('single message array', () => {
    expect(getKeyMessage(testData.singleMessageArray, testData.memberMap)).toBe(
        testData.singleMessageArray[0]
    )
})

test ('two messages from same user', () => {
    expect(getKeyMessage(testData.twoMessagesFromSameUserArray, testData.memberMap)).toBe(
        testData.twoMessagesFromSameUserArray[0]
    )
})

test ('back and forth', () => {
    expect(getKeyMessage(testData.backAndForthMessageArray, testData.memberMap)).toBe(
        testData.backAndForthMessageArray[3]
    )
})