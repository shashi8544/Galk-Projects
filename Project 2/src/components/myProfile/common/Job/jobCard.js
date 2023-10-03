import React from "react";
import { Card, Modal } from "antd";
import { connect } from "react-redux";
import { ExclamationCircleOutlined } from "@ant-design/icons";

import { deleteCandidateJob } from "../../../../actions/candidateActions";

import "./style.css";

const { confirm } = Modal;

const _jobCard = ({
	jobList,
	jobDetails,
	index,
	deleteCandidateJob,
	editHandler,
}) => {
	const { designation, place, startDate, endDate, description, company } =
		jobDetails;

	return (
		<Card
			className="job_card_cardRoot"
			size="small"
			type="inner"
			title={`#${index + 1} ${designation}`}
			style={{ marginBottom: 15 }}
			extra={
				<div style={{ display: "flex" }}>
					<span
						className="job_card_actionLink"
						style={{ marginRight: 20 }}
						onClick={(e) => {
							e.preventDefault();
							return editHandler(index);
						}}
					>
						Edit
					</span>
					<span
						className="job_card_actionLink_danger"
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
									deleteCandidateJob(jobList, index);
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
			<div className="job_card_title">Designation:</div>
			<div className="job_card_skill" style={{ width: "60%" }}>
				{designation}
			</div>
			<br></br>
			<div className="job_card_title">Company Name:</div>
			<div className="job_card_description">
				{company}
				{", "}
				{place}
			</div>
			<br></br>
			<div className="job_card_title">Duration:</div>
			<div className="job_card_description">
				{startDate}
				{" ~ "}
				{endDate}
			</div>
			<br></br>
			<div className="job_card_description">{description}</div>
		</Card>
	);
};

const mapStateToProps = (state) => ({
	jobList: state.firebase.profile?.job,
});

export default connect(mapStateToProps, {
	deleteCandidateJob,
})(_jobCard);
