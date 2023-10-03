import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import CreateJobModal from "./createJobModal";
import EditJobModal from "./editJobModal";
import { getInternshipJobListToShow } from "../../../actions/companyActions";
import JobCard from "./jobCard";
import Loading from "../../common/loading";
import { Card, Row, Col, Button, Empty } from "antd";
import "./style.css";

const JobList = ({
	companyId,
	jobList,
	isLoading,
	getInternshipJobListToShow,
	// resetInternshipJobList,
}) => {
	const [showEditModal, setShowEditModal] = useState(false);
	const [jobToEdit, setJobToEdit] = useState(null);
	const [showCreateModal, setShowCreateModal] = useState(false);

	useEffect(() => {
		if (companyId && !jobList) {
			getInternshipJobListToShow();
		}
	}, [companyId, jobList]);

	// useEffect(() => {
	// 	return () => {
	// 		resetInternshipJobList();
	// 	};
	// }, []);

	const editJob = (job) => {
		setJobToEdit(job);
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
			{isLoading && <Loading />}
			{jobList && (
				<div style={{ height: "100%", padding: "0 10px", overflowY: "auto" }}>
					<Card
						title={`${jobList.length} internship jobs found.`}
						extra={
							<div style={{ display: "flex", alignItems: "baseline" }}>
								<Button
									type="primary"
									onClick={() => setShowCreateModal(true)}
									// style={{ marginRight: 10 }}
									disabled={isLoading}
								>
									{"+ Post a new job"}
								</Button>
								{/* <span style={{ fontWeight: "bold", marginRight: 10 }}>
									{"Sort By : "}
								</span>
								<Select
									defaultValue={sortCriteria}
									style={{ width: 120 }}
									onChange={handleSortOptionChange}
									disabled={isLoading}
								>
									<Option value={"create date"}>Create Date</Option>
									<Option value={"project title"}>Projct Title</Option>
								</Select> */}
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
								jobList
									.filter((job) => job.status !== "archived")
									.map((item, i) => (
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
	jobList: state.company.internshipJobListToShow,
	isLoading: state.company.isInternshipJobListLoading,
	companyId: state.company.companyToShow.id,
});

export default connect(mapStateToProps, {
	getInternshipJobListToShow,
	// resetInternshipJobList,
})(JobList);
