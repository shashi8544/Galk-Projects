import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getCompanyAccountType } from "../../../../../reducers/companySelector";
import Loading from "../../../../common/loading";
import { getShortenName } from "../../../../../utils/functions/javaScriptHelper";
import { displayRestrictionAccounts } from "../../../../../utils/constants";
import ProjectList from "./projectList";
import EducationList from "./educationList";
import CertificateList from "./certificateList";
import PersonalInterestList from "./personalInterestList";
import AdminComments from "./adminComments";
import GALKExamDetailsList from "./examDetailsList";

import { Divider, Modal, Tabs, Tooltip, Button } from "antd";
import { LockOutlined } from "@ant-design/icons";

import "./studentDetailsDialog.css";

const { TabPane } = Tabs;

const StudentDetailsDialog = ({
	onCloseHandler,
	companyAccountType,
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
				title={`${studentDetails && studentDetails.name} - ${studentDetails && studentDetails.id
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
									<img src={studentDetails.img} alt="candidateAvatar" />
									{!displayRestrictionAccounts.includes(companyAccountType) ? (
										<h3 className="studentDetails_name">
											{getShortenName({ name: studentDetails.name })}
										</h3>
									) : (
										<div style={{ display: "flex" }}>
											<LockOutlined />
											<h4 className="studentDetails_hazyName">XXXXX XXXXXX</h4>
										</div>
									)}
									{studentDetails.selfIntro && (
										<p>{studentDetails.selfIntro}</p>
									)}
									<ul className="studentDetails_container_top_topList studentDetails_text-center studentDetails_iq-mt-30">
										{studentDetails.JEERank && (
											<li>
												<Tooltip title="All India rank in IIT JEE Advanced">
													<p>Entrance Exam Rank</p>
													<h2>{studentDetails.JEERank || "-n/a-"}</h2>
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
													{studentDetails.collegeGrade || "Not available"}
												</h2>
											</Tooltip>
										</li>
									</ul>
									<div className="clearfix"></div>
									<Divider style={{ margin: "10px 0px" }} />
									<ul className="studentDetails_container_top_topList studentDetails_bottomUL studentDetails_text_center studentDetails_iq-mb-10">
										<li>
											<Tooltip title="GALK aptitute test score">
												<Tooltip title="GALK aptitute test score">
													<p>GALK test score</p>
													{studentDetails.GALKExamDetails &&
														studentDetails.GALKExamDetails.length > 0 ? (
														<Button
															type="link"
															onClick={(e) =>
																showExamDetails(
																	e,
																	studentDetails.GALKExamDetails
																)
															}
														>
															{studentDetails.testScore || "See details.."}
														</Button>
													) : (
														<h2>{studentDetails.testScore || "-n/a-"}</h2>
													)}
												</Tooltip>
											</Tooltip>
										</li>
										<li>
											<Tooltip title="GALK HR interview score">
												<p>HR interview score</p>
												<h2>{studentDetails.hrInterviewScore || "-n/a-"}</h2>
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
									<p style={{ textAlign: "center" }}>Technical skill set</p>
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
									<Divider style={{ margin: "10px 0px" }} />
									{studentDetails.adminComments &&
										typeof studentDetails.adminComments !== "object" && (
											<React.Fragment>
												<div className="clearfix" />
												<p>Comments from GALK Admin for this candidate</p>
												<h2 style={{ whiteSpace: "pre-wrap" }}>
													{studentDetails.adminComments}
												</h2>
												<Divider style={{ margin: "10px 0px" }} />
											</React.Fragment>
										)}
									{studentDetails.selfStrength && studentDetails.selfWeakness && (
										<React.Fragment>
											<div className="clearfix" />
											<p>Strength & Weaknesses</p>
											<h2 style={{ whiteSpace: "pre-wrap" }}>
												{studentDetails.selfStrength}
												{"\n"}
												{studentDetails.selfWeakness}
											</h2>
											<Divider style={{ margin: "10px 0px" }} />
										</React.Fragment>
									)}
									<div className="studentDetails_introvideo">
										{!displayRestrictionAccounts.includes(
											companyAccountType
										) ? (
											<video
												loop
												// autoPlay
												controls
												controlsList="nodownload"
												poster={studentDetails.img}
												onContextMenu={(e) => {
													e.preventDefault();
													return false;
												}}
											>
												<source
													src={studentDetails.video}
													type="video/mp4"
												></source>
												&gt; Your browser does not support HTML5 video.
											</video>
										) : (
											<video
												loop
												// autoPlay
												controlsList="nodownload"
												muted
												poster={studentDetails.img}
												onContextMenu={(e) => {
													e.preventDefault();
													return false;
												}}
												disabled
											>
												<source
													src={studentDetails.video}
													type="video/mp4"
												></source>
												&gt; Your browser does not support HTML5 video.
											</video>
										)}
									</div>
									<Divider style={{ margin: "10px 0px" }} />
								</div>
								<div className="studentDetails_experience_container">
									<Tabs size="small" type="card" defaultActiveKey="1">
										<TabPane tab="Education" key="1">
											<EducationList list={studentDetails.education} />
										</TabPane>
										<TabPane tab="Projects" key="2">
											<ProjectList list={studentDetails.project} />
										</TabPane>
										<TabPane tab="Certificates" key="3">
											<CertificateList list={studentDetails.certificate} />
										</TabPane>
										<TabPane tab="Extracurricular" key="4">
											<PersonalInterestList
												list={studentDetails.personalInterest}
											/>
										</TabPane>
										<TabPane tab="Admin Comments" key="5">
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
					title={`Exam details for ${studentDetails ? studentDetails.name : ""
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

const mapStateToProps = (state) => ({
	companyAccountType: getCompanyAccountType(state),
	isLoading: state.company.studentToShowDetailsLoading,
});

export default connect(mapStateToProps, {})(StudentDetailsDialog);
