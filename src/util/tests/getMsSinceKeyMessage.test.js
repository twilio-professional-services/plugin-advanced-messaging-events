import { getMsSinceKeyMessage } from '../getMsSinceKeyMessage';
import testData from './testData';

test('recent message', () => {
	let keyMessage = testData.singleCustomerMessageArray[0];
	keyMessage.source.timestamp = new Date(Date.now());
	
	expect(getMsSinceKeyMessage(keyMessage)).toBe(0);
})

test('urgent message', () => {
	let keyMessage = testData.singleCustomerMessageArray[0];
	keyMessage.source.timestamp = new Date(Date.now() - testData.urgencyThresholdSeconds * 1000);
	
	expect(getMsSinceKeyMessage(keyMessage)).toBe(testData.urgencyThresholdSeconds * 1000);
})

test('future message', () => {
	let keyMessage = testData.singleCustomerMessageArray[0];
	keyMessage.source.timestamp = new Date(Date.now() + 1000);
	
	expect(getMsSinceKeyMessage(keyMessage)).toBe(-1000);
})