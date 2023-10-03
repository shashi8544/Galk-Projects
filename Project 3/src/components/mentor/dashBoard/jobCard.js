import React from "react";
import { connect } from "react-redux";
import { Card, Tooltip } from "antd";

import {
	PaperClipOutlined,
	UsergroupAddOutlined,
	CalendarOutlined,
} from "@ant-design/icons";
import "./jobCard.css";

const _jobCard = ({
	jobDetails,
	index,
	assignStudentModal,
	setSelectedJob,
	mentor,
	setAttendanceModuleIsOpen,
}) => {
	const {
		title,
		attachmentURL,
		skills,
		optionalSkills,
		createDate,
		description,
		candidateAssignedList,
		requiredEngineerCount,
	} = jobDetails;
	const assignEngineeorsOpenModal = () => {
		assignStudentModal(true);
		setSelectedJob(jobDetails);
	};

	const openAttendanceModuleView = () => {
		setSelectedJob(jobDetails);
		setAttendanceModuleIsOpen(true);
	};

	return (
		<>
			<Card
				className="mentor_job_list_card_cardRoot"
				size="small"
				type="inner"
				title={`#${index + 1} ${title}`}
				style={{ marginBottom: 15 }}
				actions={[
					<Tooltip title="Attendance">
						<span
							onClick={(e) => {
								e.preventDefault();
								return openAttendanceModuleView();
							}}
						>
							<CalendarOutlined style={{ fontSize: "25px" }} />
						</span>
					</Tooltip>,
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
							{`${candidateAssignedList?.length || 0} / ${
								requiredEngineerCount || 0
							}`}
						</div>
					</Tooltip>,
					<div style={{ display: "flex", justifyContent: "center" }} key={5}>
						<span
							className="mentor_job_list_card_createDate"
							style={{ marginRight: 10 }}
						>
							Posted on:
						</span>
						{createDate}
					</div>,
				]}
			>
				<>
					<div className="mentor_job_list_jobCard_title">
						Required technical skills:
					</div>
					{skills && skills.length > 0 ? (
						<div className="mentor_job_list_card_skillRoot">
							{skills.map((skill, i) => (
								<div className="mentor_job_list_card_skill" key={i}>
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
						<div className="mentor_job_list_jobCard_title">
							Preferred technical skills:
						</div>
						<div className="mentor_job_list_card_skillRoot">
							{optionalSkills.map((skill, i) => (
								<div className="mentor_job_list_card_skill" key={i}>
									{skill}
								</div>
							))}
						</div>
					</>
				)}
				<div className="mentor_job_list_card_description">{description}</div>
			</Card>
		</>
	);
};

const mapStateToProps = (state) => ({
	mentor: state.mentor, // to get live update
});

export default connect(mapStateToProps, {})(_jobCard);
