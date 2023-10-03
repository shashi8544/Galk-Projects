import React, { useEffect } from "react";
import { Menu, Avatar, Badge } from "antd";

const UserList = ({
  individualChatList,
  groupChatList,
  selectChat,
  userId,
  selectedChatId,
  setChatReadStatus,
  selectedChatType,
}) => {
  useEffect(() => {
    if (selectedChatId) {
      const selectedChat = [...individualChatList, ...groupChatList].find(
        (chat) => chat.chatId === selectedChatId
      );
      if (
        selectedChat &&
        !selectedChat.hasReceiverReceived &&
        selectedChat.lastMsgSenderId !== userId
      ) {
        setChatReadStatus(selectedChatId, selectedChatType);
      }
    }
  }, [
    individualChatList,
    groupChatList,
    selectedChatId,
    userId,
    selectedChatType,
  ]);

  return (
    <Menu
      onClick={selectChat}
      className="chatRoot-userListMenu"
      mode="inline"
      selectedKeys={[selectedChatId]}
    >
      {individualChatList && individualChatList.length > 0 ? (
        <Menu.ItemGroup title="Individuals">
          {individualChatList.map((item) => (
            <Menu.Item
              key={item.chatId}
              icon={<Avatar src={item.companyLogo} />}
            >
              <span style={{ marginLeft: 10 }}>
                {item.companyName.substring(0, 15)}
              </span>
              {!item.hasReceiverReceived &&
                item.lastMsgSenderId !== userId &&
                selectedChatId !== item.chatId && <Badge dot />}
            </Menu.Item>
          ))}
        </Menu.ItemGroup>
      ) : (
        <Menu.ItemGroup title="Individuals">
          <Menu.Item disabled>{"No chat available"}</Menu.Item>
        </Menu.ItemGroup>
      )}
      {groupChatList && groupChatList.length > 0 ? (
        <Menu.ItemGroup title="GroupChats">
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
                {item.chatName.substring(0, 15)}
              </span>
              {!item.hasReceiverReceived &&
                item.lastMsgSenderId !== userId &&
                selectedChatId !== item.chatId && <Badge dot />}
            </Menu.Item>
          ))}
        </Menu.ItemGroup>
      ) : (
        <Menu.ItemGroup title="GroupChats">
          <Menu.Item disabled>{"No chat available"}</Menu.Item>
        </Menu.ItemGroup>
      )}
    </Menu>
  );
};

export default UserList;
