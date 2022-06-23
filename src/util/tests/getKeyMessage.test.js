import { getKeyMessage } from '../getKeyMessage';
import testData from './testData';

test ('no message', () => {
    let {keyMessage, isFromCustomer} = getKeyMessage(
        testData.emptyMessageArray,
        testData.memberMap
    )

    expect(keyMessage).toBe(undefined);
    expect(isFromCustomer).toBe(undefined);
})

test ('single message from customer', () => {
    let {keyMessage, isFromCustomer} = getKeyMessage(
        testData.singleCustomerMessageArray,
        testData.memberMap
    )

    expect(keyMessage).toStrictEqual(testData.singleCustomerMessageArray[0]);
    expect(isFromCustomer).toBe(true);
})

test ('single message from agent', () => {
    let {keyMessage, isFromCustomer} = getKeyMessage(
        testData.singleAgentMessageArray,
        testData.memberMap
    )

    expect(keyMessage).toStrictEqual(testData.singleAgentMessageArray[0]);
    expect(isFromCustomer).toBe(false);
})

test ('two messages from customer', () => {
    let {keyMessage, isFromCustomer} = getKeyMessage(
        testData.twoCustomerMessagesArray,
        testData.memberMap
    )

    expect(keyMessage).toStrictEqual(testData.twoCustomerMessagesArray[0]);
    expect(isFromCustomer).toBe(true);
})

test ('two messages from agent', () => {
    let {keyMessage, isFromCustomer} = getKeyMessage(
        testData.twoAgentMessagesArray,
        testData.memberMap
    )

    expect(keyMessage).toStrictEqual(testData.twoAgentMessagesArray[0]);
    expect(isFromCustomer).toBe(false);
})

test ('back and forth conversation', () => {
    let {keyMessage, isFromCustomer} = getKeyMessage(
        testData.backAndForthEndingWithAgentMessageArray,
        testData.memberMap
    )

    expect(keyMessage).toStrictEqual(testData.backAndForthEndingWithAgentMessageArray[3]);
    expect(isFromCustomer).toBe(false);
})
