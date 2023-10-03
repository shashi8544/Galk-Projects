import React, { useEffect } from "react";
import { Menu, Avatar, Badge } from "antd";
import "./style.css";

const UserList = (props) => {
	const {
		individualChatList,
		groupChatList,
		selectChat,
		companyId,
		selectedChatId,
		setChatReadStatus,
	} = props;

	useEffect(() => {
		if (selectedChatId) {
			const selectedChat = [...individualChatList, ...groupChatList].find(
				(chat) => chat.chatId === selectedChatId
			);
			if (
				selectedChat &&
				!selectedChat.hasReceiverReceived &&
				selectedChat.lastMsgSenderId !== companyId
			) {
				setChatReadStatus(selectedChatId);
			}
		}
	}, [individualChatList, groupChatList, selectedChatId, companyId]);

	return (
		<Menu
			onClick={selectChat}
			className="galkLab_chatRoom_chatRoot_userListMenu"
			mode="inline"
			selectedKeys={[selectedChatId]}
		>
			{individualChatList && individualChatList.length > 0 ? (
				<Menu.ItemGroup title="Individual">
					{individualChatList.map((item) => (
						<Menu.Item
							key={item.chatId}
							icon={<Avatar src={item.studentImg} />}
						>
							<span style={{ marginLeft: 10 }}>
								{item.studentName.substring(0, 15) + "..."}
							</span>
							{!item.hasReceiverReceived &&
								item.lastMsgSenderId !== companyId &&
								selectedChatId !== item.chatId && <Badge dot />}
						</Menu.Item>
					))}
				</Menu.ItemGroup>
			) : (
				<Menu.ItemGroup title="Individual">
					<Menu.Item disabled>
						<span style={{ color: "#bcbcbc" }}>No chat available</span>
					</Menu.Item>
				</Menu.ItemGroup>
			)}
			{groupChatList && groupChatList.length > 0 ? (
				<Menu.ItemGroup title="Group chats">
					{groupChatList.map((item) => (
						<Menu.Item
							key={item.chatId}
							icon={
								<Avatar style={{ verticalAlign: "middle" }}>
									{item.chatName.substring(0, 1)}
								</Avatar>
							}
						>
							<span style={{ marginLeft: 10 }}>
								{item.chatName.substring(0, 15) + "..."}
							</span>
							{!item.hasReceiverReceived &&
								item.lastMsgSenderId !== companyId &&
								selectedChatId !== item.chatId && <Badge dot />}
						</Menu.Item>
					))}
				</Menu.ItemGroup>
			) : (
				<Menu.ItemGroup title="GroupChats">
					<Menu.Item disabled>
						<span style={{ color: "#bcbcbc" }}>No chat available</span>
					</Menu.Item>
				</Menu.ItemGroup>
			)}
		</Menu>
	);
};

export default UserList;
