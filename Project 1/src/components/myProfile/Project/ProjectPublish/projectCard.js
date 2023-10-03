import React from "react";
import { connect } from "react-redux";
import { Card, Modal } from "antd";
import { deleteCandidateProjects } from "../../../../actions/candidateActions";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import "./style.css";

const { confirm } = Modal;

const _projectCard = ({
	projectList,
	projectDetails,
	index,
	deleteCandidateProjects,
	editHandler,
}) => {
	const {
		title,
		place,
		startDate,
		endDate,
		description,
		skillsUsed,
		id,
		type,
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
									deleteCandidateProjects(projectList,index);
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
			{type && (
				<>
					<div className="project_card_title">Project type:</div>
					<div
						className="project_card_description"
						style={{ marginBottom: 10 }}
					>
						{type}
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
				{place}
			</div>
			<div className="project_card_description" style={{ marginTop: 10 }}>
				{description}
			</div>
		</Card>
	);
};
const mapStateToProps = (state) => ({
	projectList: state.firebase.profile?.project,
});


export default connect(mapStateToProps, {
	deleteCandidateProjects,
})(_projectCard);
