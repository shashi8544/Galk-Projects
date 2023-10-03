import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getCompanyAccountType } from "../../../../../reducers/companySelector";
import Loading from "../../../../common/loading";
import { getShortenName } from "../../../../../utils/functions/javaScriptHelper";
import { displayRestrictionAccounts } from "../../../../../utils/constants";
import { updateStudentPerformanceRating } from "../../../../../actions/mentorAction";
import ProjectList from "./projectList";
import EducationList from "./educationList";
import CertificateList from "./certificateList";
import PersonalInterestList from "./personalInterestList";
import AdminComments from "./adminComments";
import moment from 'moment';
import GALKExamDetailsList from "./examDetailsList";

import { Divider, Modal, Tabs, Tooltip, Form, Input, InputNumber, Button, Select, DatePicker } from "antd";
import { LockOutlined } from "@ant-design/icons";

import "./studentDetailsDialog.css";

const { Option } = Select;
const { TabPane } = Tabs;

const currentDate = new Date().toLocaleString("en-US", { day : '2-digit'})
const currentMonth = new Date().getMonth() + 1
const currentYear = new Date().getFullYear()
var dateKey = currentYear + "/" + currentMonth + "/" + currentDate

// TODO Update indicators name
const performanceIndicators = [
	{"name": "Indicator 1"},
	{"name": "Indicator 2"},
	{"name": "Indicator 3"},
	{"name": "Indicator 4"},
	{"name": "Indicator 5"},
]

// TODO Update comments
const comments = [
	"Comment 1",
	"Comment 2",
	"Comment 3",
	"Comment 4",
	"Comment 5",
]

const StudentDetailsDialog = ({
	onCloseHandler,
	companyAccountType,
	studentDetails,
	isLoading,
	updateStudentPerformanceRating
}) => {
	const [form] = Form.useForm();
	const [examDetails, setExamDetails] = useState(null);
	const [showExamStat, setShowExamStat] = useState(false);

	const [performanceIndicatorForm, setPerformanceIndicatorForm] = useState(showPerformanceIndicators())
	
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

	const updatePerformanceRating = (studentDetails, ratings, onCloseHandler) => {
		if (ratings.comments == undefined) ratings.comments = ""
		else {
			for (var i in comments){
				if (ratings.comments == comments[i]){
					ratings.comments = i
					break
				}
			}
		}
		updateStudentPerformanceRating(studentDetails, dateKey, ratings)
		onCloseHandler();
	};

	function showPerformanceIndicators() {
		const row = [];
		for (var i = 0; i < performanceIndicators.length; i++) {
			const j = i
			row.push(
				<>
					{/* Integer Input */}
					<Form.Item
						label = {performanceIndicators[j]["name"]}
						name = {performanceIndicators[j]["name"]}
						rules = {[{ required: true }]}
					>
						<InputNumber
							min={0} max={10} step={1} precision={0}
							style={{ width: 200 }} placeholder="Your rating"
							defaultValue={
								studentDetails
									? "studentsRatingForGalkLab" in studentDetails 
										? dateKey in studentDetails.studentsRatingForGalkLab
											? studentDetails.studentsRatingForGalkLab[dateKey][performanceIndicators[j]["name"]]
											: undefined
										: undefined
									: undefined
							}
						/>
					</Form.Item>
					<Divider style={{ margin: "10px 0px" }} />
				</>
			);
		}
		return row;	
	}

	const updateRatingDate = (value) => {
		const ratingDate = value._d.toLocaleString("en-US", { day : '2-digit'})
		const ratingMonth = value._d.toLocaleString("en-US", { month : '2-digit'})
		const ratingYear = value._d.getFullYear()
		
		dateKey = ratingYear+"/"+ratingMonth+"/"+ratingDate
	
		setPerformanceIndicatorForm(showPerformanceIndicators())
	}
	
	return (
		<>
			<Modal
				title={
					<div style={{ display: "flex" }}>
						{studentDetails && studentDetails.name} - {studentDetails && studentDetails.id}

						<div style={{ marginLeft: "auto" }}>
							<Form.Item
							name={"date"} label={"Date"}
							>
								<DatePicker
									// picker="week"
									defaultValue={moment(currentDate + "-" + currentMonth + "-" + currentYear, 'DD-MM-YYYY')}
									onChange={(value)=>{updateRatingDate(value)}}
								/>
							</Form.Item>
						</div>
						&nbsp;&nbsp;&nbsp;&nbsp;
					</div>
				}
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
									<p style={{ textAlign: "center" }}>Student Performance Indicators</p>
									<Divider style={{ margin: "10px 0px" }} />

									{/* Calling function */}
									<Form
										form={form}
										layout={"inline"}
										onFinish={(formValues) => {
											updatePerformanceRating(studentDetails, formValues, onCloseHandler)
										}}
									>
										{performanceIndicatorForm}
										<Form.Item
											name={"comments"} label={"Comments"}
											style={{ width: 200 }}
										>
											<Select
												placeholder="Any comments..."
											>
												{comments &&
													comments.map((comment, i) => (
														<Option key={i} value={comment}>
															{comment}
														</Option>
													))}
											</Select>
										</Form.Item>
										<Divider style={{ margin: "10px 0px" }} />

										<Form.Item style={{ marginTop: 20 }}>
											<Button
												type="primary"
												htmlType="submit"
												block
											>
												Submit
											</Button>
										</Form.Item>
									</Form>
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
	isLoading: state.company.studentToShowDetailsLoading
});

export default connect(mapStateToProps, {updateStudentPerformanceRating})(StudentDetailsDialog);
