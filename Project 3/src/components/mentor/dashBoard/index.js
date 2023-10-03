import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Region } from "../../common/layout/region";
import Loading from "../../common/loading";
import {
	getAllJobs,
	getAllGALKLabStudents,
} from "../../../actions/mentorAction";
import "./index.css";
import CompanyList from "./companyList";
import AssignEngineeors from "./assignEngineers";
const Dashboard = ({
	getAllJobs,
	isLoading,
	allJobs,
	mentorId,
	getAllGALKLabStudents,
}) => {
	const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
	const [selectedJob, setSelectedJob] = useState(null);
	const [selectedCompany, setSelectedCompany] = useState(null);
	useEffect(() => {
		if (mentorId) {
			getAllJobs(mentorId);
			getAllGALKLabStudents();
		}
	}, [mentorId]);
	return (
		<>
			<Region>
				<div className="mentor_index_container">
					{isLoading && <Loading size="large" />}

					{allJobs && allJobs.length && !isLoading && (
						<>
							<div className="mentor_index_header">
								Available GALK Lab Program grouped by company :
							</div>
							<div className="mentor_index_content">
								{allJobs.map((job) => (
									<CompanyList
										assignStudentModal={setIsStudentModalOpen}
										setSelectedJob={setSelectedJob}
										selectedJob={selectedJob}
										company={job.companyData}
										setSelectedCompany={setSelectedCompany}
										jobs={job.jobs}
									/>
								))}
							</div>
						</>
					)}

					{!isLoading && !(allJobs && allJobs.length) && (
						<div className="mentor_index_result_not_found">
							<span>
								Dont worry !! Available GalkLab programs will appear here as
								soon as you are assigned with any of the GALK Lab Project.
							</span>
						</div>
					)}
				</div>
			</Region>
			{isStudentModalOpen && (
				<AssignEngineeors
					isModalOpen={isStudentModalOpen}
					selectedJob={selectedJob}
					company={selectedCompany}
					setIsModalOpen={setIsStudentModalOpen}
				/>
			)}
		</>
	);
};

const mapStateToProps = (state) => ({
	isLoading: state.mentor.loading,
	allJobs: state.mentor.allJobs,
	mentorId: state.firebase.auth?.uid,
});

export default connect(mapStateToProps, { getAllJobs, getAllGALKLabStudents })(
	Dashboard
);
