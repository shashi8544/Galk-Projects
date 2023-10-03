import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import CreateProjectModal from "./createProjectModal";
import EditProjectModal from "./editProjectModal";
import ProjectCard from "./projectCard";
import { Card, Row, Col, Button, Empty } from "antd";

const ProjectList = ({ projectList, isLoading }) => {
	const [showEditModal, setShowEditModal] = useState(false);
	const [projectToEdit, setProjectToEdit] = useState(null);
	const [showCreateModal, setShowCreateModal] = useState(false);
    const [index,setIndex] = useState(null);

	const editProject = (projIndex) => {
		setProjectToEdit(projectList[projIndex]);
        setIndex(projIndex);
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
			{projectList && (
				<div style={{ height: "100%", padding: "0 10px", overflowY: "auto" }}>
					<Card
						title="Project details"
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
							{projectList && projectList.length < 1 && (
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
							{projectList &&
								projectList.map((item, i) => (
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
	projectList: Array.from(state.firebase.profile?.project),
	isLoading: state.profile.isLoading,
});

export default connect(mapStateToProps, {})(ProjectList);
