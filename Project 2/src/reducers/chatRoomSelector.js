export const ifChatActive = (state) => {
	const selectedChatId = state.chatRoom.selectedChatId;

	if (selectedChatId) {
		const indiVidualChatList = state.chatRoom.individualChatList;
		const groupChatList = state.chatRoom.groupChatList;
		const allChat = [...indiVidualChatList, ...groupChatList];

		const selectedChat = allChat.find((chat) => chat.chatId === selectedChatId);

		if (selectedChat) {
			return selectedChat.active;
		}
	}
	return true;
};
