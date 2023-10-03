import React from "react";
import { connect } from "react-redux";
import { Card, Modal, Button, Tooltip } from "antd";
import Render from "../../../common/auth/render";
import {
	deleteGalkJobToShow,
	approveGalkJobToShow,
} from "../../../../actions/companyActions";
import MentorShipIcon from "../../../../../src/assets/images/mentorship.png";
import {
	UsergroupAddOutlined,
	PaperClipOutlined,
	ExclamationCircleOutlined,
	FundProjectionScreenOutlined,
	CalendarOutlined,
} from "@ant-design/icons";
import "./style.css";

const { confirm } = Modal;

const _jobCard = ({
	jobDetails,
	index,
	deleteGalkJobToShow,
	approveGalkJobToShow,
	editHandler,
	isActionLoading,
	assignModal,
	setSelectedJob,
	assignStudentModal,
	setJobProgressModalIsOpen,
	setAttendanceModuleIsOpen
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
		requiredEngineerCount,
		assignedStudentCount,
	} = jobDetails;

	const assignMentorsOpenModal = () => {
		assignModal(true);
		setSelectedJob(jobDetails);
	};

	const assignEngineeorsOpenModal = () => {
		assignStudentModal(true);
		setSelectedJob(jobDetails);
	};

	const openJobProgressView = () => {
		setSelectedJob(jobDetails);
		setJobProgressModalIsOpen(true);
	};
	const openAttendanceModuleView = () => {
		setSelectedJob(jobDetails);
		setAttendanceModuleIsOpen(true)
	}
	return (
		<Card
			className="internshipJob_card_cardRoot"
			size="small"
			type="inner"
			title={`#${index + 1} ${title}`}
			style={{ marginBottom: 15 }}
			extra={
				<div style={{ display: "flex" }}>
					<span
						style={{ marginRight: 40 }}
						onClick={(e) => {
							e.preventDefault();
							return openAttendanceModuleView();
						}}
					>
						<Tooltip title="Attendance">
							<CalendarOutlined style={{ fontSize: "25px" }} />
						</Tooltip>
					</span>
					<span
						style={{ marginRight: 20 }}
						onClick={(e) => {
							e.preventDefault();
							return openJobProgressView();
						}}
					>
						<Tooltip title="Project Progress">
							<FundProjectionScreenOutlined style={{ fontSize: "25px" }} />
						</Tooltip>
					</span>
					<Render when={status === "pendingApproval"}>
						<Button
							size="small"
							type="primary"
							style={{ marginRight: 20 }}
							loading={isActionLoading}
							onClick={() => approveGalkJobToShow(jobId, "approved")}
						>
							Click to approve
						</Button>
					</Render>
					<Render when={status === "approved"}>
						<Button
							size="small"
							style={{ marginRight: 20 }}
							loading={isActionLoading}
							onClick={() => approveGalkJobToShow(jobId, "pendingApproval")}
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
									deleteGalkJobToShow(jobId);
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
				// <div style={{ display: "flex", justifyContent: "center" }} key={1}>
				// 	<span className="internshipJob_card_createDate">Status:</span>
				// 	<Render when={status === "pendingApproval"}>
				// 		<span className="internshipJob_card_statusPendingApproval">
				// 			Pending approval
				// 		</span>
				// 	</Render>
				// 	<Render when={status === "approved"}>
				// 		<span className="internshipJob_card_statusApproved">Approved</span>
				// 	</Render>
				// </div>,
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
				<Tooltip title="Assign Engineers" placement="top">
					<div
						onClick={assignEngineeorsOpenModal}
						style={{ display: "flex", justifyContent: "center" }}
						key={5}
					>
						<span>
							<UsergroupAddOutlined
								style={{ fontSize: 20, marginRight: "10px" }}
							/>
						</span>
						{`${assignedStudentCount || 0} / ${requiredEngineerCount || 0}`}
					</div>
				</Tooltip>,
				<Tooltip title="Assign Mentors" placement="top">
					<div
						onClick={assignMentorsOpenModal}
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
						key={4}
					>
						<span>
							<img
								style={{ width: 24, height: 24 }}
								alt="mentors"
								src={MentorShipIcon}
							/>{" "}
							&nbsp;&nbsp;
						</span>
						<span>{jobDetails.assignedMentors?.length || 0}</span>
					</div>
				</Tooltip>,
				<div style={{ display: "flex", justifyContent: "center" }} key={5}>
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
	isActionLoading: state.company.galkJobActionInProgress,
});

export default connect(mapStateToProps, {
	deleteGalkJobToShow,
	approveGalkJobToShow,
})(_jobCard);
