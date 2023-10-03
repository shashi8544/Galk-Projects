import React, { useEffect } from "react";
import moment from "moment";
import { getName, fallBackImage } from "./helperFunction";
import { Image } from "antd";
import "./style.css";

const renderMsgBasedOnType = (msg) => {
	if (msg.msgType) {
		switch (msg.msgType) {
			case "image":
				return (
					<div style={{ display: "flex", justifyContent: "center" }}>
						<Image
							className="galkLab_chatRoom_chatRoom_msgImage"
							width={150}
							height={140}
							src={msg.message}
							fallback={fallBackImage}
						/>
					</div>
				);
			case "video":
				return <video width="250" height="160" controls src={msg.message} />;
			case "document":
				return (
					<a
						href={msg.message}
						target="_blank"
						rel="noreferrer noopener"
						download={msg.fileName}
					>
						{msg.fileName || "Click to see the file"}
					</a>
				);
			case "system":
				return (
					<span className="galkLab_chatRoom_chatRoom_systemMsg_msg">
						{msg.message}
					</span>
				);
			default:
				return <span>{msg.message}</span>;
		}
	} else {
		return <span>{msg.message}</span>;
	}
};

const renderMsgHeader = (msg, loggedInUserId, studentMetaData) => {
	if (msg.sender === "system") {
		return <div style={{ paddingTop: 20 }}></div>;
	}
	if (msg.sender === loggedInUserId) {
		return (
			<div className="galkLab_chatRoom_msg_title_container">
				<div className="galkLab_chatRoom_msg_title_own">You</div>
				<div className="galkLab_chatRoom_msg_own_date">
					~ {moment(msg.timeStamp.toDate()).fromNow()}
				</div>
			</div>
		);
	}

	return (
		<div className="galkLab_chatRoom_msg_title_container">
			<div className="galkLab_chatRoom_msg_title">
				{getName(msg.sender, [...studentMetaData])}
			</div>
			<div className="galkLab_chatRoom_msg_date">
				~ {moment(msg.timeStamp.toDate()).fromNow()}
			</div>
		</div>
	);
};

const getSentMsgClassName = (senderId, loggedInUserId) => {
	if (senderId === "system") {
		return "chatRoom_messageList-sentBySystem";
	}

	if (senderId === loggedInUserId) {
		return "chatRoom_messageList-sentByMe";
	}

	return "chatRoom_messageList-notSentByMe";
};

const MessageComponent = ({
	messageList,
	studentMetaData,
	companyId,
	clearChatRoomData,
}) => {
	useEffect(() => {
		return () => {
			// clearChatRoomData();
		};
	}, []);

	return (
		<React.Fragment>
			{messageList
				? messageList.map((msg, i) => (
						<div key={i} className={getSentMsgClassName(msg.sender, companyId)}>
							{renderMsgHeader(msg, companyId, studentMetaData)}
							{renderMsgBasedOnType(msg)}
						</div>
				  ))
				: null}
		</React.Fragment>
	);
};

export default MessageComponent;
