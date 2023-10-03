import { connect } from "react-redux";
import React, { useState } from "react";
import { Card, Row, Col, Button, Empty } from "antd";

import JobCard from "./jobCard";
import EditJobModal from "./editJobModal";
import CreateJobModal from "./createJobModal";

const JobList = ({ jobList, isActionProgress }) => {
	const [showEditModal, setShowEditModal] = useState(false);
	const [jobToEdit, setJobToEdit] = useState(null);
	const [showCreateModal, setShowCreateModal] = useState(false);
	const [index, setIndex] = useState(null);

	const editJob = (jobIndex) => {
		setJobToEdit(jobList[jobIndex]);
		setIndex(jobIndex);
		setShowEditModal(true);
	};

	const closeEditModal = () => {
		setJobToEdit(null);
		setShowEditModal(false);
	};

	const closeCreateModal = () => {
		setShowCreateModal(false);
	};

	return (
		<>
			{jobList && (
				<div style={{ height: "100%", padding: "0 10px", overflowY: "auto" }}>
					<Card
						title="Job details"
						extra={
							<div style={{ display: "flex", alignItems: "baseline" }}>
								<Button
									type="primary"
									onClick={() => setShowCreateModal(true)}
									disabled={isActionProgress}
								>
									{"+ Post a new job"}
								</Button>
							</div>
						}
					>
						<Row>
							{jobList && jobList.length < 1 && (
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
							{jobList &&
								jobList.map((item, i) => (
									<Col key={i} span={24}>
										<JobCard
											jobDetails={item}
											index={i}
											editHandler={editJob}
										/>
									</Col>
								))}
						</Row>
					</Card>
				</div>
			)}
			{showEditModal && (
				<EditJobModal
					id={index}
					jobDetails={jobToEdit}
					modalCloseHandler={closeEditModal}
				/>
			)}
			{showCreateModal && (
				<CreateJobModal modalCloseHandler={closeCreateModal} />
			)}
		</>
	);
};

const mapStateToProps = (state) => ({
	isActionProgress: state.profile.actionInProgress,
	jobList: state.firebase.profile.job || [],
});

export default connect(mapStateToProps, {})(JobList);
