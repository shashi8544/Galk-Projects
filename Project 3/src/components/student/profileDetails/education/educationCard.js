import React from "react";
import { connect } from "react-redux";
import { Card, Modal, Button } from "antd";
import { deleteStudentToShowEducation } from "../../../../actions/studentAction";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import "./style.css";

const { confirm } = Modal;

const _jobCard = ({
	educationDetails,
	index,
	deleteStudentToShowEducation,
	editHandler,
}) => {
	const { degree, place, startDate, endDate, description, instituteName, id } =
		educationDetails;

	return (
		<Card
			className="education_card_cardRoot"
			size="small"
			type="inner"
			title={`#${index + 1} ${degree}`}
			style={{ marginBottom: 15 }}
			extra={
				<div style={{ display: "flex" }}>
					<span
						className="education_card_actionLink"
						style={{ marginRight: 20 }}
						onClick={(e) => {
							e.preventDefault();
							return editHandler(index);
						}}
					>
						Edit
					</span>
					<span
						className="education_card_actionLink_danger"
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
									deleteStudentToShowEducation(id);
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
			<div className="education_card_title">Degree:</div>
			<div className="education_card_skill" style={{ width: "30%" }}>
				{degree}
			</div>
			<div className="education_card_title">Institute Name:</div>
			<div className="education_card_description">
				{instituteName}
				{", "}
				{place}
			</div>
			<div className="education_card_title">Duration:</div>
			<div className="education_card_description">
				{startDate}
				{" ~ "}
				{endDate}
			</div>
			<div className="education_card_description" style={{ marginTop: 10 }}>
				{description}
			</div>
		</Card>
	);
};

export default connect(null, {
	deleteStudentToShowEducation,
})(_jobCard);
