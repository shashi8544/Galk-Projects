import { connect } from "react-redux";
import React, { useState } from "react";
import { Card, Row, Col, Button, Empty } from "antd";

import ProjectCard from "./projectCard";
import EditProjectModal from "./editProjectModal";
import CreateProjectModal from "./createProjectModal";

const ProjectList = ({ projectsList, isLoading }) => {
	const [index, setIndex] = useState(null);
	const [projectToEdit, setProjectToEdit] = useState(null);
	const [showEditModal, setShowEditModal] = useState(false);
	const [showCreateModal, setShowCreateModal] = useState(false);

	const editProject = (projextIndex) => {
		setProjectToEdit(projectsList[projextIndex]);
		setIndex(projextIndex);
		setShowEditModal(true);
	};

	const closeEditModal = () => {
		setProjectToEdit(null);
		setShowEditModal(false);
	};

	const closeCreateModal = () => {
		setShowCreateModal(false);
	};

	return (
		<>
			{isLoading}
			{projectsList && (
				<div style={{ height: "100%", padding: "0 10px", overflowY: "auto" }}>
					<Card
						title="Projects details"
						extra={
							<div style={{ display: "flex", alignItems: "baseline" }}>
								<Button
									type="primary"
									onClick={() => setShowCreateModal(true)}
									disabled={isLoading}
								>
									{"+ Post a new project"}
								</Button>
							</div>
						}
					>
						<Row>
							{projectsList.length === 0 && (
								<Col
									span={24}
									style={{
										display: "flex",
										flexDirection: "column",
										justifyContent: "center",
									}}
								>
									<Empty />
								</Col>
							)}
							{projectsList.map((item, i) => (
								<Col key={i} span={24}>
									<ProjectCard
										projectDetails={item}
										index={i}
										editHandler={editProject}
									/>
								</Col>
							))}
						</Row>
					</Card>
				</div>
			)}
			{showEditModal && (
				<EditProjectModal
					id={index}
					projectDetails={projectToEdit}
					modalCloseHandler={closeEditModal}
				/>
			)}
			{showCreateModal && (
				<CreateProjectModal modalCloseHandler={closeCreateModal} />
			)}
		</>
	);
};

const mapStateToProps = (state) => ({
	projectsList: state.firebase.profile.projects || [],
	isLoading: state.profile.isLoading,
});

export default connect(mapStateToProps, {})(ProjectList);
