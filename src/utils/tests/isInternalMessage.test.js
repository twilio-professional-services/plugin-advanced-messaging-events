import isInternalMessage from '../isInternalMessage';
import testData from './testData'

test('no message', () => {
  expect(
    isInternalMessage(
      {},
      testData.memberMap
    )
  ).toBe(undefined);
})

test ('internal message with external role sid set in .env', () => {

  process.env.EXTERNAL_ROLE_SIDS = JSON.stringify(testData.externalRoleSids);

  expect(
    isInternalMessage(
      testData.backAndForthMessageArrayNoIsFromMe[1],
      testData.memberMap
    )
  ).toBe(true)
})

test ('external message with external role sid set in .env', () => {

  process.env.EXTERNAL_ROLE_SIDS = JSON.stringify(testData.externalRoleSids);

  expect(
    isInternalMessage(
      testData.backAndForthMessageArrayNoIsFromMe[0],
      testData.memberMap
    )
  ).toBe(false)
})

test ('internal message with external role sid in the config', () => {

  delete process.env.EXTERNAL_ROLE_SIDS;

  expect(
    isInternalMessage(
      testData.backAndForthMessageArrayNoIsFromMe[1],
      testData.memberMap,
      {externalRoleSids: testData.externalRoleSids}
    )
  ).toBe(true)
})

test ('external message with external role sid in the config', () => {

  delete process.env.EXTERNAL_ROLE_SIDS;

  expect(
    isInternalMessage(
      testData.backAndForthMessageArrayNoIsFromMe[0],
      testData.memberMap,
      {externalRoleSids: testData.externalRoleSids}
    )
  ).toBe(false)
})

test ('internal message fallback to isFromMe', () => {

  delete process.env.EXTERNAL_ROLE_SIDS;

  expect(
    isInternalMessage(
      testData.backAndForthMessageArray[1],
      testData.memberMap
    )
  ).toBe(true)
})

test ('external message fallback to isFromMe', () => {

  delete process.env.EXTERNAL_ROLE_SIDS;

  expect(
    isInternalMessage(
      testData.backAndForthMessageArray[0],
      testData.memberMap
    )
  ).toBe(false)
})