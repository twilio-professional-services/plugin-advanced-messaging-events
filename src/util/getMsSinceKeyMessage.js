export const getMsSinceKeyMessage = (keyMessage) => {
	const now = new Date().getTime();
	const messageTime = new Date(keyMessage?.source?.timestamp).getTime();
	
	return now - messageTime;
}