import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import CreateJobModal from "./createJobModal";
import EditJobModal from "./editJobModal";
import {
	getGalkJobListToShow,
	getTaggedGalkLabStudentList,
} from "../../../../actions/companyActions";
import { resetError } from "../../../../actions/jobProgressActions";
import JobCard from "./jobCard";
import Loading from "../../../common/loading";
import { Card, Row, Col, Button, Empty } from "antd";
import "./style.css";
import AssignMentors from "./assignMentors";
import AssignEngineers from "./assignEngineers";
import { getAllGALKLabStudents } from "../../../../actions/studentActionGalkLab";
import JobProgress from "./jobProgress";
import AttendanceModule from "./attendanceModule";

const JobList = ({
	companyId,
	companyName,
	jobList,
	isLoading,
	getGalkJobListToShow,
	getAllGALKLabStudents,
	getTaggedGalkLabStudentList,
	resetError,
	taggedStudentList,
}) => {
	const [showEditModal, setShowEditModal] = useState(false);
	const [jobToEdit, setJobToEdit] = useState(null);
	const [showCreateModal, setShowCreateModal] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
	const [selectedJob, setSelectedJob] = useState(null);
	const [jobProgressModalIsOpen, setJobProgressModalIsOpen] = useState(false);
	const [attendanceModuleIsOpen, setAttendanceModuleIsOpen] = useState(false)

	useEffect(() => {
		if (companyId && !jobList) {
			getGalkJobListToShow();
		}
	}, [companyId, jobList]);

	useEffect(() => {
		if (companyId) {
			// getAllGALKLabStudents(companyId, companyName);
			getTaggedGalkLabStudentList(companyId);
		}
	}, [companyId, taggedStudentList]);

	useEffect(() => {
		if (selectedJob) {
			const job = jobList.find((elm) => elm.jobId == selectedJob.jobId);
			setSelectedJob(job);
		}
	}, [jobList]);

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
	const resetSelectedJob = (job) => {
		resetError(false);
		setSelectedJob(job);
	};

	return (
		<>
			{isLoading && <Loading />}
			{jobList && (
				<div style={{ height: "100%", padding: "0 10px", overflowY: "auto" }}>
					<Card
						title={`${jobList.length} galk lab jobs found.`}
						extra={
							<div style={{ display: "flex", alignItems: "baseline" }}>
								<Button
									type="primary"
									onClick={() => setShowCreateModal(true)}
									disabled={isLoading}
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
								jobList
									.filter((job) => job.status !== "archived")
									.map((item, i) => (
										<Col key={i} span={24}>
											<JobCard
												jobDetails={item}
												index={i}
												editHandler={editJob}
												assignModal={setIsModalOpen}
												assignStudentModal={setIsStudentModalOpen}
												setSelectedJob={setSelectedJob}
												//setSelectedJob={resetSelectedJob}
												setJobProgressModalIsOpen={setJobProgressModalIsOpen}
												setAttendanceModuleIsOpen={setAttendanceModuleIsOpen}
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
			{isModalOpen && (
				<AssignMentors
					isModalOpen={isModalOpen}
					selectedJob={selectedJob}
					setIsModalOpen={setIsModalOpen}
				/>
			)}

			{isStudentModalOpen && (
				<AssignEngineers
					isModalOpen={isStudentModalOpen}
					selectedJob={selectedJob}
					setIsModalOpen={setIsStudentModalOpen}
				/>
			)}

			{jobProgressModalIsOpen && (
				<JobProgress
					thisModalControl={{
						isOpen: jobProgressModalIsOpen,
						setIsOpen: setJobProgressModalIsOpen,
					}}
					selectedJob={selectedJob}
				/>
			)}
			{attendanceModuleIsOpen && (
				<AttendanceModule
					thisModalControl={{
						isOpen: attendanceModuleIsOpen,
						setIsOpen: setAttendanceModuleIsOpen,
					}}
					selectedJob={selectedJob}
				/>
			)}
		</>
	);
};

const mapStateToProps = (state) => ({
	jobList: state.company.galkJobListToShow,
	isLoading: state.company.isGalkJobListLoading,
	companyId: state.company.companyToShow.id,
	companyName: state.company.companyToShow.name,
	taggedStudentList: state.company.companyToShow.taggedCandidatesForGalkLab,
});

export default connect(mapStateToProps, {
	getGalkJobListToShow,
	getAllGALKLabStudents,
	getGalkJobListToShow,
	resetError,
	getTaggedGalkLabStudentList,
})(JobList);
