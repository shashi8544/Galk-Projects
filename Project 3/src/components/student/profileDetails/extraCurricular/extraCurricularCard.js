import React from "react";
import { connect } from "react-redux";
import { Card, Modal } from "antd";
import { deleteStudentToShowExtraCurricular } from "../../../../actions/studentAction";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import "./style.css";

const { confirm } = Modal;

const _extraCurricularCard = ({
	extraCurricularDetails,
	index,
	deleteStudentToShowExtraCurricular,
	editHandler,
}) => {
	const { title, description, id } = extraCurricularDetails;

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
									deleteStudentToShowExtraCurricular(id);
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
			<div className="certificate_card_title">Description:</div>
			<div className="certificate_card_description" style={{ marginTop: 10 }}>
				{description}
			</div>
		</Card>
	);
};

export default connect(null, {
	deleteStudentToShowExtraCurricular,
})(_extraCurricularCard);
