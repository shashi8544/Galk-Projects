import React from "react";
import { Card, Modal } from "antd";
import { connect } from "react-redux";
import { ExclamationCircleOutlined } from "@ant-design/icons";

import { deleteCandidateProject } from "../../../../actions/candidateActions";

import "./style.css";

const { confirm } = Modal;

const _projectCard = ({
	projectsList,
	projectDetails,
	index,
	deleteCandidateProject,
	editHandler,
}) => {
	const {
		title,
		projectDomain,
		skillsUsed,
		// projectCategory,
		// projectType,
		// teamSize,
		// role,
		// projectLink,
		// projectDemo,
		startDate,
		endDate,
		location,
		description,
	} = projectDetails;
	return (
		<Card
			className="project_card_cardRoot"
			size="small"
			type="inner"
			title={`#${index + 1} ${title}`}
			style={{ marginBottom: 15 }}
			extra={
				<div style={{ display: "flex" }}>
					<span
						className="project_card_actionLink"
						style={{ marginRight: 20 }}
						onClick={(e) => {
							e.preventDefault();
							return editHandler(index);
						}}
					>
						Edit
					</span>
					<span
						className="project_card_actionLink_danger"
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
									deleteCandidateProject(projectsList, index);
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
			<div className="project_card_title">Title:</div>
			<div className="project_card_description" style={{ marginBottom: 10 }}>
				{title}
			</div>
			{projectDomain && (
				<>
					<div className="project_card_title">Project Domain:</div>
					<div
						className="project_card_description"
						style={{ marginBottom: 10 }}
					>
						{projectDomain}
					</div>
				</>
			)}

			<div className="project_card_title">Technical skills used:</div>
			{skillsUsed && skillsUsed.length > 0 ? (
				<div className="project_card_skillRoot">
					{skillsUsed.map((skill, i) => (
						<div className="project_card_skill" key={i}>
							{typeof skill === "string" ? skill : skill.label}
						</div>
					))}
				</div>
			) : (
				"No skills"
			)}
			<div className="project_card_title">Duration & Place:</div>
			<div className="project_card_description">
				{startDate}
				{" ~ "}
				{endDate}
				{", "}
				{location}
			</div>
			<div className="project_card_description" style={{ marginTop: 10 }}>
				{description}
			</div>
		</Card>
	);
};
const mapStateToProps = (state) => ({
	projectsList: state.firebase.profile?.projects,
});

export default connect(mapStateToProps, {
	deleteCandidateProject,
})(_projectCard);
