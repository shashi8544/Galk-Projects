import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import CreateJobModal from "./createJobModal";
import EditJobModal from "./editJobModal";
import { Region } from "../../common/layout/region";
import {
	getInternshipJobs,
	resetInternshipJobList,
} from "../../../actions/internshipJobPostingActions";
import JobCard from "./jobCard";
import Loading from "../../common/loading";
import { Select, Card, Row, Col, Button, Empty } from "antd";
import "./style.css";

const { Option } = Select;

const JobList = ({
	companyId,
	jobList,
	isLoading,
	match,
	getInternshipJobs,
	resetInternshipJobList,
	// sortInternshipJobList,
}) => {
	// const [sortCriteria, setSortCriteria] = useState("create date");
	const [showEditModal, setShowEditModal] = useState(false);
	const [jobToEdit, setJobToEdit] = useState(null);
	const [showCreateModal, setShowCreateModal] = useState(false);

	useEffect(() => {
		if (companyId && !jobList) {
			getInternshipJobs();
		}
	}, [companyId, jobList]);

	useEffect(() => {
		return () => {
			resetInternshipJobList();
		};
	}, []);

	// const handleSortOptionChange = (e) => {
	// 	setSortCriteria(e.target.value);

	// 	let _propertyName;
	// 	let _matchingDataType;

	// 	if (e.target.value === "create date") {
	// 		_propertyName = "createDate";
	// 		_matchingDataType = "date";
	// 	}
	// 	if (e.target.value === "project title") {
	// 		_propertyName = "title";
	// 		_matchingDataType = "string";
	// 	}

	// 	// sortInternshipJobList(jobList, _propertyName, _matchingDataType);
	// };

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
		<Region>
			{isLoading && <Loading />}
			{jobList && (
				<div style={{ height: "100%", padding: "0 10px", overflowY: "auto" }}>
					<Card
						title={`You have ${jobList.length} internship jobs posted.`}
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
		</Region>
	);
};

const mapStateToProps = (state) => ({
	jobList: state.internshipJobs.jobList,
	isLoading: state.internshipJobs.isListLoading,
	companyId: state.company.company.id,
});

export default connect(mapStateToProps, {
	getInternshipJobs,
	resetInternshipJobList,
	// sortInternshipJobList,
})(withRouter(JobList));
