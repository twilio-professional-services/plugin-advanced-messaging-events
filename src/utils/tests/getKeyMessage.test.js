import getKeyMessage from '../getKeyMessage';
import testData from './testData';

test ('no message', () => {
    let {keyMessage, isInternal} = getKeyMessage(
        testData.emptyMessageArray,
        testData.memberMap
    )

    expect(keyMessage).toBe(undefined);
    expect(isInternal).toBe(undefined);
})

test ('single message from customer', () => {
    let {keyMessage, isInternal} = getKeyMessage(
        testData.singleCustomerMessageArray,
        testData.memberMap
    )

    expect(keyMessage).toStrictEqual(testData.singleCustomerMessageArray[0]);
    expect(isInternal).toBe(false);
})

test ('single message from agent', () => {
    let {keyMessage, isInternal} = getKeyMessage(
        testData.singleAgentMessageArray,
        testData.memberMap
    )

    expect(keyMessage).toStrictEqual(testData.singleAgentMessageArray[0]);
    expect(isInternal).toBe(true);
})

test ('two messages from customer', () => {
    let {keyMessage, isInternal} = getKeyMessage(
        testData.twoCustomerMessagesArray,
        testData.memberMap
    )

    expect(keyMessage).toStrictEqual(testData.twoCustomerMessagesArray[0]);
    expect(isInternal).toBe(false);
})

test ('two messages from agent', () => {
    let {keyMessage, isInternal} = getKeyMessage(
        testData.twoAgentMessagesArray,
        testData.memberMap
    )

    expect(keyMessage).toStrictEqual(testData.twoAgentMessagesArray[0]);
    expect(isInternal).toBe(true);
})

test ('back and forth conversation', () => {
    let {keyMessage, isInternal} = getKeyMessage(
        testData.backAndForthEndingWithAgentMessageArray,
        testData.memberMap
    )

    expect(keyMessage).toStrictEqual(testData.backAndForthEndingWithAgentMessageArray[3]);
    expect(isInternal).toBe(true);
})
