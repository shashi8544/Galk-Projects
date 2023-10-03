import React, { useEffect, useState } from "react";
import { Region } from "../../common/layout/region";
import { Card, Table, Tag, Button, Modal, message } from "antd";
import { database } from "../../../utils/configs/firebaseConfig";
import { sendMail } from "../../../utils/functions/httpServices";
import EmailEditContainer from "./emailEditContainer";

const EmailManagement = () => {
	const [emailList, setEmailList] = useState(null);
	const [emailToEdit, setEmailToEdit] = useState(null);
	const [openEditModal, setOpenEditModal] = useState(false);
	const [isEditing, setIsEditing] = useState(false);

	useEffect(() => {
		database
			.collection("EmailConfig")
			.get()
			.then((snapList) => {
				let emailConfigList = [];
				snapList.forEach((doc) => emailConfigList.push(doc.data()));
				setEmailList(emailConfigList);
			});
	}, []);

	const emailModifyHandler = (email) => {
		const emailToEditId = email.key;
		const emailToEdit = emailList.find((x) => x.id === emailToEditId);
		setEmailToEdit(emailToEdit);
		setOpenEditModal(true);
	};

	const updateEmail = (values) => {
		setIsEditing(true);
		const emailToUpdateId = emailToEdit.id;
		if (emailToUpdateId) {
			database
				.collection("EmailConfig")
				.doc(emailToUpdateId)
				.update({
					...values,
				})
				.then(() => {
					let UpdatedList = emailList.map((email) => {
						if (email.id === emailToUpdateId) {
							email.active = values.active;
							email.title = values.title;
							email.description = values.description;
							email.subject = values.subject;
							email.body = values.body;
							email.defaultCc = values.defaultCc;
							email.defaultBcc = values.defaultBcc;
							email.defaultFrom = values.defaultFrom;
							email.templateVariables = values.templateVariables;
						}

						return email;
					});
					setEmailList(UpdatedList);
					setIsEditing(false);
				})
				.catch((err) => {
					console.log("Error:", err);
					message.error("Error saving data !");
					setIsEditing(false);
				});
		}

		// temp
		// sendMail("test_email", values);
		//setIsEditing(false);
		//end temp
	};

	const editModalCloseHandler = () => {
		setEmailToEdit(null);
		setOpenEditModal(false);
	};

	const columns = [
		{
			width: "25%",
			title: "Title",
			dataIndex: "title",
			key: "title",
		},
		{
			width: "45%",
			title: "Description",
			dataIndex: "description",
			key: "description",
		},
		{
			width: "15%",
			title: "Status",
			dataIndex: "active",
			key: "active",
			render: (status) => (
				<Tag color={status ? "green" : "volcano"} key={status}>
					{status ? "Active" : "Inactive"}
				</Tag>
			),
		},
		{
			width: "15%",
			title: "Action",
			key: "action",
			render: (text, record) => (
				<Button type="link" onClick={() => emailModifyHandler(record)}>
					View / Modify
				</Button>
			),
		},
	];

	return (
		<Region>
			<div style={{ height: "100%", padding: "10px 10px", overflowY: "auto" }}>
				<Card title="Email Managementx" style={{ minHeight: "100%" }}>
					{emailList && (
						<Table
							dataSource={emailList.map((email) => ({
								key: email.id,
								title: email.title,
								active: email.active,
								description: email.description,
							}))}
							columns={columns}
							scroll={{ y: 400 }}
							pagination={false}
						/>
					)}
				</Card>
				{openEditModal && (
					<Modal
						title={`Template name: ${emailToEdit && emailToEdit.title}`}
						visible={true}
						// onOk={updateEmail}
						// confirmLoading={isEditing}
						onCancel={editModalCloseHandler}
						footer={null}
					>
						{emailToEdit && (
							<EmailEditContainer
								emailDetails={emailToEdit}
								updateHandler={updateEmail}
								isEditing={isEditing}
								modalCloseHandler={editModalCloseHandler}
							/>
						)}
					</Modal>
				)}
			</div>
		</Region>
	);
};

export default EmailManagement;
