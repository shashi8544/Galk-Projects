import React, { useState, useEffect } from "react";
import Loading from "../../common/loading";
import { getShortenName } from "../../../utils/functions/javaScriptHelper";
import ProjectList from "./projectList";
import EducationList from "./educationList";
import CertificateList from "./certificateList";
import PersonalInterestList from "./personalInterestList";
import AdminComments from "./adminComments";
import defaultStudentPic from "../../../assets/images/defaultStudentPic.jpeg";
import GALKExamDetailsList from "./examDetailsList";

import { Divider, Modal, Tabs, Tooltip, Button } from "antd";

import "./studentDetailsDialog.css";

const { TabPane } = Tabs;

const StudentDetailsDialog = ({
	onCloseHandler,
	studentDetails,
	isLoading,
}) => {
	const [examDetails, setExamDetails] = useState(null);
	const [showExamStat, setShowExamStat] = useState(false);

	useEffect(() => {
		return () => {
			setExamDetails(null);
		};
	}, []);

	const showExamDetails = (e, examDetails) => {
		e.preventDefault();
		setExamDetails(examDetails);
		setShowExamStat(true);
	};

	return (
		<>
			<Modal
				title={`${studentDetails && studentDetails.name}-> ${
					studentDetails && studentDetails.id
				}`}
				centered
				visible={true}
				onOk={onCloseHandler}
				onCancel={onCloseHandler}
				width={800}
			>
				<div style={{ width: "100%", height: "60vh", overflowY: "scroll" }}>
					{isLoading && <Loading />}
					{!isLoading && studentDetails && studentDetails.id && (
						<React.Fragment>
							<div className="studentDetails_container">
								<div className="studentDetails_container_top">
									<img
										src={studentDetails.img || defaultStudentPic}
										alt="candidateAvatar"
									/>
									<h3 className="studentDetails_name">
										{getShortenName({ name: studentDetails.name })}
									</h3>
									<ul className="studentDetails_container_top_topList studentDetails_text-center studentDetails_iq-mt-30">
										{studentDetails.JEERank && (
											<li>
												<Tooltip title="All India rank in IIT JEE Advanced">
													<p>Entrance Exam Rank</p>
													<h2>
														{`${studentDetails.JEERank}/around 150,000` ||
															"-n/a-"}
													</h2>
												</Tooltip>
											</li>
										)}
										<li>
											<p>Collage Name</p>
											<h2>{studentDetails.collegeName}</h2>
										</li>
										<li>
											<p>Branch Name</p>
											<h2>{studentDetails.branchName}</h2>
										</li>
									</ul>
									<div className="clearfix"></div>
								</div>
								<div className="clearfix"></div>
								<div className="studentDetails_w-100 studentDetails_bottomList studentDetails_iq-mt-10">
									<ul className="studentDetails_container_top_topList studentDetails_bottomUL studentDetails_text_center studentDetails_iq-mb-10">
										<li>
											<p>Student Gender</p>
											<h2>{studentDetails.gender}</h2>
										</li>
										<li>
											<p>Certificates achieved</p>
											<h2>{studentDetails.certificate.length}</h2>
										</li>
										<li>
											<p>Project completed</p>
											<h2>{studentDetails.project.length}</h2>
										</li>
										<li>
											<Tooltip title="CGPA secured in college">
												<p>Grade Obtained</p>
												<h2>
													{`${studentDetails.collegeGrade}/10` ||
														"Not available"}
												</h2>
											</Tooltip>
										</li>
									</ul>
									<div className="clearfix"></div>
									<Divider style={{ margin: "10px 0px" }} />
									<ul className="studentDetails_container_top_topList studentDetails_bottomUL studentDetails_text_center studentDetails_iq-mb-10">
										<li>
											<Tooltip title="GALK aptitute test score">
												<p>GALK test score</p>
												{studentDetails.GALKExamDetails &&
												studentDetails.GALKExamDetails.length > 0 ? (
													<Button
														type="link"
														onClick={(e) =>
															showExamDetails(e, studentDetails.GALKExamDetails)
														}
													>
														{`${studentDetails.testScore}/100` ||
															"See details.."}
													</Button>
												) : (
													<h2>
														{studentDetails.testScore
															? `${studentDetails.testScore}/100`
															: "-n/a-"}
													</h2>
												)}
											</Tooltip>
										</li>
										<li>
											<Tooltip title="GALK HR interview score">
												<p>HR interview score</p>
												<h2>
													{studentDetails.hrInterviewScore
														? `${studentDetails.hrInterviewScore}/45`
														: "-n/a-"}
												</h2>
											</Tooltip>
										</li>
										<li>
											<Tooltip title="Minor subject taken in 3rd year">
												<p>Minor degree</p>
												<h2>{studentDetails.minorDegree || "-n/a-"}</h2>
											</Tooltip>
										</li>
									</ul>
									<div className="clearfix"></div>
									<Divider style={{ margin: "10px 0px" }} />
									<p style={{ textAlign: "center" }}>
										Primary Technical skills
									</p>
									<ul
										className="candidateDetails_experience_project_skills"
										style={{
											display: "flex",
											justifyContent: "center",
											flexWrap: "wrap",
										}}
									>
										{studentDetails.skills.map((skill, index) => (
											<React.Fragment>
												{typeof skill === "object" ? (
													<li key={skill.key}>{skill.label}</li>
												) : (
													<li key={index}>{skill}</li>
												)}
											</React.Fragment>
										))}
									</ul>
									{studentDetails.secondarySkills &&
										studentDetails.secondarySkills.length > 0 && (
											<>
												<p style={{ textAlign: "center" }}>
													Secondary Technical skills
												</p>
												<ul
													className="candidateDetails_experience_project_skills"
													style={{
														display: "flex",
														justifyContent: "center",
														flexWrap: "wrap",
													}}
												>
													{studentDetails.secondarySkills.map(
														(skill, index) => (
															<li key={index}>{skill}</li>
														)
													)}
												</ul>
											</>
										)}
									<Divider style={{ margin: "10px 0px" }} />

									{studentDetails.selfIntro && (
										<>
											<p>Self Introduction</p>
											<h2 style={{ whiteSpace: "pre-wrap", marginBottom: 10 }}>
												{studentDetails.selfIntro}
											</h2>
										</>
									)}
									<Divider style={{ margin: "10px 0px" }} />
									{studentDetails.whyInJapan && (
										<>
											<p>Why Japan ?</p>
											<h2 style={{ whiteSpace: "pre-wrap", marginBottom: 10 }}>
												{studentDetails.whyInJapan}
											</h2>
										</>
									)}
									{/* <Divider style={{ margin: "10px 0px" }} />
									{studentDetails.myStrength && (
										<Table columns={[{title:'Strength',dataIndex:'title'},{title:'Description',dataIndex:'description'}]} dataSource={studentDetails.myStrength.map((x,i)=>({key:i}))} size="small" />
									)} */}
									<Divider style={{ margin: "10px 0px" }} />
									<div className="studentDetails_introvideo">
										<video
											preload="none"
											controls
											poster={studentDetails.img}
											onContextMenu={(e) => {
												e.preventDefault();
												return false;
											}}
										>
											<source src={studentDetails.video} type="video/mp4" />
											&gt; Your browser does not support HTML5 video.
										</video>
									</div>
									<Divider style={{ margin: "10px 0px" }} />
								</div>
								<div className="studentDetails_experience_container">
									<Tabs size="small" type="card" defaultActiveKey="1">
										<TabPane tab="Willings Comments" key="1">
											<AdminComments comment={studentDetails.adminComments} />
										</TabPane>
										<TabPane tab="Coding Test" key="2">
											<EducationList list={studentDetails.education} />
										</TabPane>
										<TabPane tab="Education" key="3">
											<EducationList list={studentDetails.education} />
										</TabPane>
										<TabPane tab="Projects" key="4">
											<ProjectList list={studentDetails.project} />
										</TabPane>
										<TabPane tab="Certificates" key="5">
											<CertificateList list={studentDetails.certificate} />
										</TabPane>
										<TabPane tab="Extracurricular" key="6">
											<PersonalInterestList
												list={studentDetails.personalInterest}
											/>
										</TabPane>
										<TabPane tab="Personal Information" key="7">
											<AdminComments comment={studentDetails.adminComments} />
										</TabPane>
									</Tabs>
								</div>
							</div>
						</React.Fragment>
					)}
				</div>
			</Modal>
			{showExamStat && (
				<Modal
					title={`Exam details for ${
						studentDetails ? studentDetails.name : ""
					}`}
					centered
					visible={true}
					onOk={() => setShowExamStat(false)}
					onCancel={() => setShowExamStat(false)}
					width={800}
				>
					{examDetails && <GALKExamDetailsList examDetailsList={examDetails} />}
				</Modal>
			)}
		</>
	);
};

export default StudentDetailsDialog;
