import { checkMode } from '../checkMode';
import { modeConfig } from '../modeConfig';
import { ChatMode } from '../../enums';
import testData from './testData';

test ('no message', () => {
	let message = {
		keyMessage: null,
		isFromCustomer: null
	};
	
	expect(checkMode(message)).toStrictEqual(ChatMode.default)
})

test ('non-urgent customer message', () => {
	modeConfig[ChatMode.urgency].timerThreshold = testData.urgencyThresholdSeconds;
	testData.singleCustomerMessageArray[0].source.timestamp = new Date(Date.now());
	
	let message = {
		keyMessage: testData.singleCustomerMessageArray[0],
		isFromCustomer: true
	};
	
	expect(checkMode(message)).toStrictEqual(ChatMode.default)
})

test ('urgent customer message', () => {
	modeConfig[ChatMode.urgency].timerThreshold = testData.urgencyThresholdSeconds;
	testData.singleCustomerMessageArray[0].source.timestamp = new Date(Date.now() - testData.urgencyThresholdSeconds * 1000);
	
	let message = {
		keyMessage: testData.singleCustomerMessageArray[0],
		isFromCustomer: true
	};
	
	expect(checkMode(message)).toStrictEqual(ChatMode.urgency)
})

test ('non-stale agent message', () => {
	modeConfig[ChatMode.stale].timerThreshold = testData.staleThresholdSeconds;
	testData.singleCustomerMessageArray[0].source.timestamp = new Date(Date.now());
	
	let message = {
		keyMessage: testData.singleAgentMessageArray[0],
		isFromCustomer: false
	};
	
	expect(checkMode(message)).toStrictEqual(ChatMode.default)
})

test ('stale agent message', () => {
	modeConfig[ChatMode.stale].timerThreshold = testData.staleThresholdSeconds;
	testData.singleAgentMessageArray[0].source.timestamp = new Date(Date.now() - testData.staleThresholdSeconds * 1000);
	
	let message = {
		keyMessage: testData.singleAgentMessageArray[0],
		isFromCustomer: false
	};
	
	expect(checkMode(message)).toStrictEqual(ChatMode.stale)
})