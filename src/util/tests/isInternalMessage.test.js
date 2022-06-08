import isInternalMessage from '../isInternalMessage';
import testData from './testData'

test('no message', () => {
  expect(
    isInternalMessage(
      {}
    )
  ).toBe(undefined);
})

test ('internal message with external role sid set in .env', () => {

  process.env.CUSTOMER_ROLE_SIDS = testData.customerRoleSidsString;

  expect(
    isInternalMessage(
      testData.backAndForthMessageArrayNoIsFromMe[1],
      testData.memberMap
    )
  ).toBe(true)
})

test ('external message with external role sid set in .env', () => {

  process.env.CUSTOMER_ROLE_SIDS = testData.customerRoleSidsString;

  expect(
    isInternalMessage(
      testData.backAndForthMessageArrayNoIsFromMe[0],
      testData.memberMap
    )
  ).toBe(false)
})

test ('internal message with external role sid in the config', () => {

  delete process.env.CUSTOMER_ROLE_SIDS;

  expect(
    isInternalMessage(
      testData.backAndForthMessageArrayNoIsFromMe[1],
      testData.memberMap,
      {customerRoleSids: testData.customerRoleSidsString}
    )
  ).toBe(true)
})

test ('external message with external role sid in the config', () => {

  delete process.env.CUSTOMER_ROLE_SIDS;

  expect(
    isInternalMessage(
      testData.backAndForthMessageArrayNoIsFromMe[0],
      testData.memberMap,
      {customerRoleSids: testData.customerRoleSidsString}
    )
  ).toBe(false)
})

test ('internal message fallback to isFromMe', () => {

  delete process.env.CUSTOMER_ROLE_SIDS;

  expect(
    isInternalMessage(
      testData.backAndForthEndingWithAgentMessageArray[1],
      testData.memberMap
    )
  ).toBe(true)
})

test ('external message fallback to isFromMe', () => {

  delete process.env.CUSTOMER_ROLE_SIDS;

  expect(
    isInternalMessage(
      testData.backAndForthEndingWithAgentMessageArray[0],
      testData.memberMap
    )
  ).toBe(false)
})