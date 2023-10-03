import React, { useState, useEffect } from "react";
import { database } from "../../../../utils/configs/firebaseConfig";
import Loading from "../../../common/loading";
import UserList from "./userList";
import MessageComponent from "./messageComponent";
import ChatRoomInformation from "./chatRoomInformation";
import { getSenderName } from "./helperFunction";
import { Layout, Button, Modal, Drawer, Dropdown, Menu } from "antd";
import {
	PlusOutlined,
	MenuOutlined,
	UserAddOutlined,
	UsergroupAddOutlined,
} from "@ant-design/icons";
import "./style.css";

const { Header, Footer, Sider, Content } = Layout;

const getIndividualChatList = (studentMetaData, individualChatList) => {
	if (individualChatList && individualChatList.length > 0) {
		return individualChatList.map((item) => {
			const _matchedStudent = studentMetaData.find(
				(stu) => stu.id === item.participants[0]
			);
			return {
				chatId: item.chatId,
				hasReceiverReceived: item.hasReceiverReceived,
				lastMsgSenderId: item.messages[item.messages.length - 1].sender,
				studentName: _matchedStudent.name,
				studentImg: _matchedStudent.img,
				studentCollege: _matchedStudent.collegeName,
				studentBranch: _matchedStudent.branchName,
			};
		});
	}
	return [];
};

const getGroupChatList = (studentMetaData, groupChatList) => {
	if (groupChatList && groupChatList.length > 0) {
		return groupChatList.map((item) => {
			return {
				chatId: item.chatId,
				chatName: item.chatName,
				hasReceiverReceived: item.hasReceiverReceived,
				lastMsgSenderId: item.messages[item.messages.length - 1].sender,
			};
		});
	}
	return [];
};

const ChatRoom = ({ companyId }) => {
	const [individualChatList, setIndividualChatList] = useState(null);
	const [groupChatList, setGroupChatList] = useState(null);
	const [studentMetaData, setStudentMetaData] = useState(null);
	const [showChatDetails, setShowChatDetails] = useState(false);
	const [selectedChatId, setSelectedChatId] = useState(null);
	const [isChatListLoading, setIsChatListLoading] = useState(false);

	useEffect(() => {
		if (companyId) {
			setIsChatListLoading(true);
			database
				.collection("StudentProfile")
				.where("profileCompletionStatus", "==", true)
				.get()
				.then((snapShot) => {
					let _studentMetaData = [];

					snapShot.forEach((doc) => {
						const _data = doc.data();
						_studentMetaData.push({
							id: _data.id,
							email: _data.email,
							name: _data.name,
							collegeName: _data.collegeName,
							img: _data.img,
							branchName: _data.branchName,
						});
					});

					setStudentMetaData(_studentMetaData);

					database
						.collection("ChatRoomGalkLab")
						.where("creator", "==", companyId)
						.get()
						.then((querySnapshot) => {
							let _allChatList = [];
							let _individualChatList = [];
							let _groupChatList = [];

							querySnapshot.forEach((doc) => {
								_allChatList.push({ ...doc.data(), chatId: doc.id });
							});

							_allChatList.forEach((chat) => {
								if (chat.type === "individual") {
									_individualChatList.push(chat);
								} else {
									_groupChatList.push(chat);
								}
							});

							console.log("INDIVIDUAL:", _individualChatList);
							console.log("GROUP:", _groupChatList);

							setIndividualChatList(_individualChatList);
							setGroupChatList(_groupChatList);
							setIsChatListLoading(false);
						});
				});
		}
	}, []);

	const shouldChatBoxRender = !isChatListLoading && studentMetaData;

	let individualListItems = [];
	let groupListItems = [];

	if (studentMetaData) {
		individualListItems = getIndividualChatList(
			studentMetaData,
			individualChatList
		);
		groupListItems = getGroupChatList(studentMetaData, groupChatList);
	}

	let selectedChat = null;
	let msgList = null;
	let selectedChatStudentId = null;
	let selectedChatType = "";

	if (selectedChatId) {
		selectedChat = [...individualChatList, ...groupChatList].find(
			(chat) => chat.chatId === selectedChatId
		);
		if (selectedChat) {
			msgList = selectedChat.messages;
			selectedChatType = selectedChat.type;
			if (selectedChatType === "individual") {
				selectedChatStudentId = selectedChat.participants[0];
			}
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
		setSelectedChatId(key);
	};

	return (
		<div className="galkLab_chatRoom_tab_container">
			{isChatListLoading && <Loading />}
			{shouldChatBoxRender && (
				<React.Fragment>
					<Layout style={{ height: "100%", border: "1px solid #3977f5" }}>
						<Sider className="galkLab_chatRoom_userList_container">
							<UserList
								individualChatList={individualListItems}
								groupChatList={groupListItems}
								selectChat={handleChatSelected}
								companyId={companyId}
								selectedChatId={selectedChatId}
							/>
						</Sider>
						<Layout>
							<Header className="galkLab_chatRoom_messageHeader_container">
								{selectedChatId && (
									<React.Fragment>
										<Button
											type="primary"
											shape="circle"
											icon={<MenuOutlined />}
											onClick={() => setShowChatDetails(!showChatDetails)}
										></Button>
									</React.Fragment>
								)}
							</Header>
							<Content>
								<div
									id="messageList-container"
									className="galkLab_chatRoom_messageList_container"
								>
									<MessageComponent
										studentMetaData={studentMetaData}
										// companyMetaData={companyMetaData}
										messageList={msgList}
										companyId={companyId}
									/>
									{showChatDetails && (
										<Drawer
											title={null}
											placement="right"
											closable={false}
											onClose={() => setShowChatDetails(false)}
											visible={true}
											getContainer={false}
											style={{ position: "absolute" }}
											width={320}
										>
											<ChatRoomInformation
												studentMetaData={studentMetaData}
												selectedChatStudentId={selectedChatStudentId}
												selectedChatType={selectedChatType}
											/>
										</Drawer>
									)}
								</div>
							</Content>
						</Layout>
					</Layout>
				</React.Fragment>
			)}
		</div>
	);
};

export default ChatRoom;
