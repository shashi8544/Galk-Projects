import React from "react";
import { Card, Modal } from "antd";
import { connect } from "react-redux";
import { ExclamationCircleOutlined } from "@ant-design/icons";

import { deleteCandidateCertificate } from "../../../../actions/candidateActions";

import "./style.css";

const { confirm } = Modal;

const _certificateCard = ({
	certificateDetails,
	index,
	deleteCandidateCertificate,
	editHandler,
}) => {
	const {
		title,
		// certificateCategory,
		// courseName,
		// startDate,
		// endDate,
		// certificateProvider,
		// certifiedSkill,
		// projectName,
		// skillsUsed,
		link,
		issueDate,
		description,
	} = certificateDetails;
	return (
		<Card
			className="certificate_card_cardRoot"
			size="small"
			type="inner"
			title={`#${index + 1} ${title}`}
			style={{ marginBottom: 15 }}
			extra={
				<div style={{ display: "flex" }}>
					<span
						className="certificate_card_actionLink"
						style={{ marginRight: 20 }}
						onClick={(e) => {
							e.preventDefault();
							return editHandler(index);
						}}
					>
						Edit
					</span>
					<span
						className="certificate_card_actionLink_danger"
						onClick={(e) => {
							e.preventDefault();
							confirm({
								title: "Are you sure delete this entry?",
								icon: <ExclamationCircleOutlined />,
								content: "This action can not be undone",
								okText: "Yes",
								okType: "danger",
								cancelText: "No",
								onOk() {
									deleteCandidateCertificate(index);
								},
								onCancel() {},
							});
						}}
					>
						Delete
					</span>
				</div>
			}
		>
			<div className="certificate_card_title">Title:</div>
			<div
				className="certificate_card_description"
				style={{ marginBottom: 10 }}
			>
				{title}
			</div>
			<div className="certificate_card_title">Certificate link:</div>
			<div
				className="certificate_card_description"
				style={{ marginBottom: 10 }}
			>
				{link}
			</div>
			<div className="certificate_card_title">Issue date:</div>
			<div className="certificate_card_description">{issueDate}</div>
			<div className="certificate_card_description" style={{ marginTop: 10 }}>
				{description}
			</div>
		</Card>
	);
};

export default connect(null, {
	deleteCandidateCertificate,
})(_certificateCard);
