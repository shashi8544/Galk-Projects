import React, { useState } from "react";
import "./index.css";
import { Card, Collapse, Descriptions, Avatar } from "antd";
import JobCard from "./jobCard";
import AttendanceModule from "./attendanceModule";
const { Panel } = Collapse;

const CompanyList = ({
	company,
	assignStudentModal,
	setSelectedJob,
	selectedJob,
	setSelectedCompany,
	jobs,
}) => {
	const [attendanceModuleIsOpen, setAttendanceModuleIsOpen] = useState(false);

	return (
		<>
			<div className="mentor_companyList_companyCard">
				<Card onClick={() => setSelectedCompany(company)}>
					<Descriptions
						title={
							<>
								<Avatar
									size={40}
									src={company.logo}
									style={{ marginRight: 10 }}
								/>
								<span>
									{company.nameInEnglish
										? `${company.name} / ${company.nameInEnglish}`
										: company.name}
								</span>
							</>
						}
					>
						<Descriptions.Item label="Industry">
							{company.industry}
						</Descriptions.Item>
						{company.website && (
							<Descriptions.Item label="Website">
								<a href={company.website} target="_blank">
									{company.website}
								</a>
							</Descriptions.Item>
						)}
					</Descriptions>
					<Collapse accordion>
						<Panel header={`Expand to see job details`} key="1">
							<Card type="inner">
								{/* <JobPostings list={jobs} /> */}
								{jobs &&
									jobs.length &&
									jobs.map((job, index) => (
										<JobCard
											assignStudentModal={assignStudentModal}
											setSelectedJob={setSelectedJob}
											jobDetails={job}
											index={index}
											setAttendanceModuleIsOpen={setAttendanceModuleIsOpen}
										/>
									))}
							</Card>
							{attendanceModuleIsOpen && (
								<AttendanceModule
									thisModalControl={{
										isOpen: attendanceModuleIsOpen,
										setIsOpen: setAttendanceModuleIsOpen,
									}}
									selectedJob={selectedJob}
								/>
							)}
						</Panel>
					</Collapse>
				</Card>
			</div>
		</>
	);
};

export default CompanyList;
