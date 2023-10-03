import React, { useState, useEffect } from "react";
import { Layout, Drawer, Button } from "antd";
import UserList from "./UserList";
import MessageComponent from "./MessageComponent";
import MessageInputComponent from "./MessageInputComponent";
import ApplicationLoading from "../../common/ApplicationLoading";
import ChatRoomInformation from "./ChatRoomInformation";
import { connect } from "react-redux";
import { getSenderName } from "./helperFunction";
import {
	getAvailableChatLists,
	getCompanyMetaData,
	getStudentMetaData,
	setSelectedChat,
	submitChatMsg,
	submitGroupChatMsg,
	clearChatRoomData,
	setChatReadStatus,
} from "../../../actions/chatActions";
import { ifChatActive } from "../../../reducers/chatRoomSelector";
import { MenuOutlined } from "@ant-design/icons";

const { Header, Footer, Sider, Content } = Layout;

const getIndividualChatList = (companyMetaData, individualChatList) => {
	if (individualChatList && individualChatList.length > 0) {
		return individualChatList.map((item) => {
			const _matchedCompany = companyMetaData.find(
				(comp) => comp.id === item.creator
			);
			return {
				chatId: item.chatId,
				hasReceiverReceived: item.hasReceiverReceived,
				lastMsgSenderId: item.messages[item.messages.length - 1].sender,
				companyName: _matchedCompany.nameInEnglish
					? _matchedCompany.nameInEnglish
					: _matchedCompany.name,
				companyLogo: _matchedCompany.logo,
				companyIndustry: _matchedCompany.industry,
			};
		});
	}
	return [];
};

const getGroupChatList = (companyMetaData, groupChatList, userId) => {
	if (groupChatList && groupChatList.length > 0) {
		return groupChatList.map((item) => {
			const _matchedCompany = companyMetaData.find(
				(comp) => comp.id === item.creator
			);
			return {
				chatId: item.chatId,
				chatName: item.chatName,
				hasReceiverReceived: item.participantStatusList.find(
					(p) => p.id === userId
				).hasReceiverReceived,
				lastMsgSenderId: item.messages[item.messages.length - 1].sender,
				companyName: _matchedCompany.nameInEnglish
					? _matchedCompany.nameInEnglish
					: _matchedCompany.name,
			};
		});
	}
	return [];
};

const ChatRoomContainer = ({
	getAvailableChatLists,
	getCompanyMetaData,
	getStudentMetaData,
	userId,
	individualChatList,
	groupChatList,
	isChatListLoading,
	companyMetaData,
	studentMetaData,
	selectedChatId,
	setSelectedChat,
	submitChatMsg,
	submitGroupChatMsg,
	ifChatActive,
	setChatReadStatus,
	isFileUploading,
	fileUploadProgress,
}) => {
	const [showChatDetails, setShowChatDetails] = useState(false);

	useEffect(() => {
		getAvailableChatLists(userId);
		getCompanyMetaData();
		getStudentMetaData();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const shouldChatBoxRender =
		!isChatListLoading && companyMetaData && studentMetaData;

	let individualListItems = [];
	let groupListItems = [];
	if (companyMetaData) {
		individualListItems = getIndividualChatList(
			companyMetaData,
			individualChatList
		);
		groupListItems = getGroupChatList(companyMetaData, groupChatList, userId);
	}

	let selectedChat = null;
	let creatorId = null;
	let msgList = null;
	let selectedChatStudentId = null;
	let selectedChatType = "";

	if (selectedChatId) {
		selectedChat = [...individualChatList, ...groupChatList].find(
			(chat) => chat.chatId === selectedChatId
		);
		if (selectedChat) {
			creatorId = selectedChat.creator;
			msgList = selectedChat.messages;
			selectedChatType = selectedChat.type;

			if (selectedChatType === "group") {
				selectedChatStudentId = selectedChat.participants;
			}
		}
	}

	useEffect(() => {
		const container = document.getElementById("messageList-container");

		if (container) {
			container.scrollTo(0, container.scrollHeight);
		}
	}, [msgList]);

	const handleChatSelected = ({ key }) => {
		setSelectedChat(key);
	};

	const submitNewMsg = (msg, type) => {
		submitChatMsg(msg, type);
	};

	const submitNewGroupMsg = (msg, type) => {
		submitGroupChatMsg(msg, type);
	};

	return (
		<div className="internshipContainer">
			<div className="chatRoot">
				{shouldChatBoxRender ? (
					<Layout style={{ height: "100%", border: "1px solid #3977f5" }}>
						<Sider className="userList-container">
							<UserList
								individualChatList={individualListItems}
								groupChatList={groupListItems}
								selectChat={handleChatSelected}
								setChatReadStatus={setChatReadStatus}
								userId={userId}
								selectedChatId={selectedChatId}
								selectedChatType={selectedChatType}
							/>
						</Sider>
						<Layout>
							<Header className="messageHeader-container">
								{selectedChatId && (
									<React.Fragment>
										<span>
											Your conversation with{"  "}
											{getSenderName(creatorId, [
												...companyMetaData,
												...studentMetaData,
											])}
										</span>
										<Button
											shape="circle"
											type="primary"
											icon={<MenuOutlined />}
											onClick={() => setShowChatDetails(!showChatDetails)}
										/>
									</React.Fragment>
								)}
							</Header>
							<Content>
								<div
									id="messageList-container"
									className="messageList-container"
								>
									<MessageComponent
										companyMetaData={companyMetaData}
										studentMetaData={studentMetaData}
										messageList={msgList}
										userId={userId}
									/>
									<Drawer
										title={null}
										placement="right"
										closable={false}
										onClose={() => setShowChatDetails(false)}
										visible={showChatDetails}
										getContainer={false}
										style={{ position: "absolute" }}
										width={320}
									>
										<ChatRoomInformation
											companyMetaData={companyMetaData}
											studentMetaData={studentMetaData}
											selectedChatCreatorId={creatorId}
											selectedChatStudentId={selectedChatStudentId}
											selectedChatType={selectedChatType}
										/>
									</Drawer>
								</div>
							</Content>
							<Footer className="messageInput-container">
								{selectedChatId && ifChatActive && selectedChatType && (
									<MessageInputComponent
										submitChatMsg={
											selectedChatType === "individual"
												? submitNewMsg
												: submitNewGroupMsg
										}
										isFileUploading={isFileUploading}
										fileUploadProgress={fileUploadProgress}
									/>
								)}
							</Footer>
						</Layout>
					</Layout>
				) : (
					<div
						style={{
							height: "80vh",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<ApplicationLoading />
					</div>
				)}
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	userId: state.firebase.auth.uid,
	individualChatList: state.chatRoom.individualChatList,
	groupChatList: state.chatRoom.groupChatList,
	isChatListLoading: state.chatRoom.isChatListLoading,
	isMessageLoading: state.chatRoom.isMessageLoading,
	companyMetaData: state.chatRoom.companyMetaData,
	studentMetaData: state.chatRoom.studentMetaData,
	selectedChatId: state.chatRoom.selectedChatId,
	selectedChatMessages: state.chatRoom.selectedChatMessages,
	ifChatActive: ifChatActive(state),
	isFileUploading: state.chatRoom.isFileUploading,
	fileUploadProgress: state.chatRoom.fileUploadProgress,
});

export default connect(mapStateToProps, {
	getAvailableChatLists,
	getCompanyMetaData,
	getStudentMetaData,
	setSelectedChat,
	submitChatMsg,
	submitGroupChatMsg,
	clearChatRoomData,
	setChatReadStatus,
})(ChatRoomContainer);
