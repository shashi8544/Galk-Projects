import React from "react";
import { connect } from "react-redux";
import { Card, Modal, Button } from "antd";
import Render from "../../common/auth/render";
import {
	deleteInternshipJobToShow,
	approveInternshipJobToShow,
} from "../../../actions/companyActions";
import {
	EnvironmentOutlined,
	PaperClipOutlined,
	ExclamationCircleOutlined,
} from "@ant-design/icons";
import "./style.css";

const { confirm } = Modal;

const _jobCard = ({
	jobDetails,
	index,
	deleteInternshipJobToShow,
	approveInternshipJobToShow,
	editHandler,
	isActionLoading,
}) => {
	const {
		title,
		attachmentURL,
		skills,
		optionalSkills,
		createDate,
		location,
		status,
		description,
		jobId,
	} = jobDetails;

	return (
		<Card
			className="internshipJob_card_cardRoot"
			size="small"
			type="inner"
			title={`#${index + 1} ${title}`}
			style={{ marginBottom: 15 }}
			extra={
				<div style={{ display: "flex" }}>
					<Render when={status === "pendingApproval"}>
						<Button
							size="small"
							type="primary"
							style={{ marginRight: 20 }}
							loading={isActionLoading}
							onClick={() => approveInternshipJobToShow(jobId, "approved")}
						>
							Click to approve
						</Button>
					</Render>
					<Render when={status === "approved"}>
						<Button
							size="small"
							style={{ marginRight: 20 }}
							loading={isActionLoading}
							onClick={() =>
								approveInternshipJobToShow(jobId, "pendingApproval")
							}
						>
							Click to unapprove
						</Button>
					</Render>
					<span
						className="internshipJob_card_actionLink"
						style={{ marginRight: 20 }}
						onClick={(e) => {
							e.preventDefault();
							return editHandler(jobDetails);
						}}
					>
						Edit
					</span>
					<span
						className="internshipJob_card_actionLink_danger"
						onClick={(e) => {
							e.preventDefault();
							confirm({
								title: "Are you sure delete this job?",
								icon: <ExclamationCircleOutlined />,
								content: "This action can not be undone",
								okText: "Yes",
								okType: "danger",
								cancelText: "No",
								onOk() {
									deleteInternshipJobToShow(jobId);
								},
								onCancel() { },
							});
						}}
					>
						Delete
					</span>
				</div>
			}
			actions={[
				<div style={{ display: "flex", justifyContent: "center" }} key={1}>
					<span className="internshipJob_card_createDate">Status:</span>
					<Render when={status === "pendingApproval"}>
						<span className="internshipJob_card_statusPendingApproval">
							Pending approval
						</span>
					</Render>
					<Render when={status === "approved"}>
						<span className="internshipJob_card_statusApproved">Approved</span>
					</Render>
				</div>,
				<div style={{ display: "flex", justifyContent: "center" }} key={2}>
					<PaperClipOutlined style={{ fontSize: 20, marginRight: 10 }} />
					{attachmentURL ? (
						<span>
							<a href={attachmentURL} target="blank">
								Has attachment
							</a>
						</span>
					) : (
						<span>Not available</span>
					)}
				</div>,
				<div style={{ display: "flex", justifyContent: "center" }} key={3}>
					<EnvironmentOutlined style={{ fontSize: 20, marginRight: 10 }} />
					<span>Location: {location || "Not available"} </span>
				</div>,
				<div style={{ display: "flex", justifyContent: "center" }} key={4}>
					<span
						className="internshipJob_card_createDate"
						style={{ marginRight: 10 }}
					>
						Posted on:
					</span>
					{createDate}
				</div>,
			]}
		>
			<>
				<div className="jobCard_title">Required technical skills:</div>
				{skills && skills.length > 0 ? (
					<div className="internshipJob_card_skillRoot">
						{skills.map((skill, i) => (
							<div className="internshipJob_card_skill" key={i}>
								{skill}
							</div>
						))}
					</div>
				) : (
					"No skills"
				)}
			</>
			{optionalSkills && optionalSkills.length > 0 && (
				<>
					<div className="jobCard_title">Preferred technical skills:</div>
					<div className="internshipJob_card_skillRoot">
						{optionalSkills.map((skill, i) => (
							<div className="internshipJob_card_skill" key={i}>
								{skill}
							</div>
						))}
					</div>
				</>
			)}
			<div className="internshipJob_card_description">{description}</div>
		</Card>
	);
};

const mapStateToProps = (state) => ({
	isActionLoading: state.company.internshipJobActionInProgress,
});

export default connect(mapStateToProps, {
	deleteInternshipJobToShow,
	approveInternshipJobToShow,
})(_jobCard);
