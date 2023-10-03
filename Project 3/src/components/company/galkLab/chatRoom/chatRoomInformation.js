import React, { useState } from "react";
import { Divider, List, Avatar } from "antd";
import "./style.css";

const ChatRoomInformation = ({
	studentMetaData,
	selectedChatStudentId,
	selectedChatType,
}) => {
	let studentDetails = null;
	let studentGroupList = null;
	let availableStudentListToChat = null;

	if (selectedChatType === "individual") {
		studentDetails = studentMetaData.find(
			(stu) => stu.id === selectedChatStudentId
		);
	}
	if (selectedChatType === "group") {
		studentGroupList = studentMetaData.filter((stu) =>
			selectedChatStudentId.find((stuChat) => {
				if (stuChat === stu.id) return true;
				return false;
			})
		);
	}

	return (
		<div className="galkLab_chatRoom_chatRoomInformation_container">
			{selectedChatType === "individual" && studentDetails && (
				<React.Fragment>
					<img
						className="galkLab_chatRoom_chatRoomInformation_profileImg"
						src={studentDetails.img}
						alt={studentDetails.name}
					/>
					<div className="galkLab_chatRoom_chatRoomInformation_profileName">
						{studentDetails.name}
					</div>
					<div className="galkLab_chatRoom_chatRoomInformation_collegeName">
						{studentDetails.collegeName}
						<br />
						{studentDetails.branchName}
					</div>
					<Divider />
				</React.Fragment>
			)}
			{selectedChatType === "group" && studentGroupList && (
				<React.Fragment>
					<div
						style={{
							width: "100%",
							display: "flex",
							flexDirection: "column",
							alignItems: "flex-start",
							textAlign: "left",
						}}
					>
						<span style={{ marginBottom: 5 }}>Members</span>
						<List
							style={{ width: "100%" }}
							size="small"
							itemLayout="horizontal"
							dataSource={studentGroupList}
							renderItem={(item) => (
								<List.Item key={item.id}>
									<List.Item.Meta
										avatar={<Avatar src={item.img} />}
										title={item.name}
										description={
											<span>
												{item.collegeName}
												<br />
												{item.branchName}
											</span>
										}
									/>
								</List.Item>
							)}
						/>
					</div>
					<Divider />
				</React.Fragment>
			)}
		</div>
	);
};

export default ChatRoomInformation;
