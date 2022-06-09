import isCustomerMessage from '../isCustomerMessage';
import testData from './testData'

test('no message', () => {
  expect(
    isCustomerMessage(
      {}
    )
  ).toBe(undefined);
})

test ('internal message with external role sid set in .env', () => {

  process.env.CUSTOMER_ROLE_SIDS = testData.customerRoleSidsEnvArr;

  expect(
    isCustomerMessage(
      testData.backAndForthMessageArrayNoIsFromMe[1],
      testData.memberMap
    )
  ).toBe(false)
})

test ('external message with external role sid set in .env', () => {

  process.env.CUSTOMER_ROLE_SIDS = testData.customerRoleSidsEnvArr;

  expect(
    isCustomerMessage(
      testData.backAndForthMessageArrayNoIsFromMe[0],
      testData.memberMap
    )
  ).toBe(true)
})

test ('internal message with external role sid in the config', () => {

  delete process.env.CUSTOMER_ROLE_SIDS;

  expect(
    isCustomerMessage(
      testData.backAndForthMessageArrayNoIsFromMe[1],
      testData.memberMap,
      {customerRoleSids: [testData.customerRoleSidsString]}
    )
  ).toBe(false)
})

test ('external message with external role sid in the config (arr)', () => {

  delete process.env.CUSTOMER_ROLE_SIDS;

  expect(
    isCustomerMessage(
      testData.backAndForthMessageArrayNoIsFromMe[0],
      testData.memberMap,
      {customerRoleSids: [testData.customerRoleSidsString]}
    )
  ).toBe(true)
})

test ('external message with external role sid in the config (str)', () => {

  delete process.env.CUSTOMER_ROLE_SIDS;

  expect(
    isCustomerMessage(
      testData.backAndForthMessageArrayNoIsFromMe[0],
      testData.memberMap,
      {customerRoleSids: testData.customerRoleSidsString}
    )
  ).toBe(true)
})

test ('internal message fallback to isFromMe', () => {

  delete process.env.CUSTOMER_ROLE_SIDS;

  expect(
    isCustomerMessage(
      testData.backAndForthEndingWithAgentMessageArray[1]
    )
  ).toBe(false)
})

test ('external message fallback to isFromMe', () => {

  delete process.env.CUSTOMER_ROLE_SIDS;

  expect(
    isCustomerMessage(
      testData.backAndForthEndingWithAgentMessageArray[0]
    )
  ).toBe(true)
})