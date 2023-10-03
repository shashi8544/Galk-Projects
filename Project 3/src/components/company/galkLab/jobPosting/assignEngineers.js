import { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import {
	assignEngineeorInProject,
	unAssignEngineeorFromProject,
	tagAndAssignEngineerInProject,
} from "../../../../actions/companyActions";
import {
	filterStudentBasedOnSkillArr_2,
	splitArrayByNoOfElement,
} from "../../../../actions/actionHelper";
import StudentDetailsDialog from "../../../student/common/studentDetailsDialog";
import { getSortedArray } from "../../../../actions/actionHelper";
import { database } from "../../../../utils/configs/firebaseConfig";
import Loading from "../../../common/loading";
import { Modal, Button, Avatar, Divider, Typography, Space ,Tag} from "antd";
import { PlusCircleOutlined, CheckOutlined } from "@ant-design/icons";
import "./assignEngineers.css";

const { Title } = Typography;

const AssignEngineers = ({
	isModalOpen,
	setIsModalOpen,
	assignEngineeorInProject,
	unAssignEngineeorFromProject,
	jobAssignProcessing,
	selectedJob,
	studentList,
	tagAndAssignEngineerInProject,
}) => {
	const [studentDetailModal, setStudentDetailsMoal] = useState(false);
	const [selectedStudent, setSelectedStudent] = useState(null);
	const [studentSuggestionsBasedOnNLP, setStudentSuggestionsBasedOnNLP] =
		useState(null);
	const [studentSuggestionsBasedSkills, setStudentSuggestionsBasedOnSkills] =
		useState(null);
	const [isListLoading, setIsListLoading] = useState(false);

	const handleOk = () => {
		setIsModalOpen(false);
		setStudentSuggestionsBasedOnNLP(null);
	};
	const handleView = (student) => {
		setStudentDetailsMoal(true);
		setSelectedStudent(student);
	};
	const closeStudentDetailsHandler = () => {
		setStudentDetailsMoal(false);
	};
	const handleAdd = (studentId) => {
		setSelectedStudent(studentId);
		if (isAssigned(studentId))
			unAssignEngineeorFromProject(selectedJob.jobId, studentId);
		else assignEngineeorInProject(selectedJob.jobId, studentId);
	};
	const isAssigned = (studentId) => {
		const index = selectedJob.candidateAssignedList.indexOf(studentId);
		if (index === -1) return false;
		return true;
	};
	const handleTagAndAssign = (studentId) => {
		setSelectedStudent(studentId);

		tagAndAssignEngineerInProject(selectedJob.jobId, studentId);
	};
	const studentListJsx = studentList?.map((elm) => {
		return (
			<div className="listContainer" key={elm.id}>
				<div className="avatar_container">
					<Avatar src={elm.img} />
				</div>
				<div className="student_details">
					<div className="student_name">{elm.name}</div>
					<div className="student_college">
						{elm.collegeName} , &nbsp;{elm.branchName}
					</div>
				</div>
				<div className="student_control">
					<button
						// disabled={isAssigned(elm.id)}
						onClick={() => handleAdd(elm.id)}
					>
						{jobAssignProcessing && selectedStudent === elm.id ? (
							<div className="loader"></div>
						) : isAssigned(elm.id) ? (
							<CheckOutlined style={{ fontSize: 20 }} />
						) : (
							<PlusCircleOutlined style={{ fontSize: 20 }} />
						)}
					</button>
					<button onClick={() => handleView(elm)}>View</button>
				</div>
			</div>
		);
	});

	const studentSuggestionListFromNLPJsx =()=> {
		if(studentSuggestionsBasedOnNLP){
			return getSortedArray(studentSuggestionsBasedOnNLP,"matchingScore","number","number").map(
				(elm) => {
					if (isAssigned(elm.id)) {
						return null;
					} else {
						return (
							<div className="listContainer" key={elm.id}>
								<div className="avatar_container">
									<Avatar src={elm.img} />
								</div>
								<div className="student_details">
									<div className="student_name">{elm.name}</div>
									<div className="student_college">
										{elm.collegeName} , &nbsp;{elm.branchName}
									</div>
								</div>
								<div className="student_control">
									<Button
										type="primary"
										disabled={isAssigned(elm.id)}
										onClick={() => handleTagAndAssign(elm.id)}
									>
										{jobAssignProcessing && selectedStudent === elm.id ? (
											<div className="loader"></div>
										) : isAssigned(elm.id) ? (
											<CheckOutlined style={{ fontSize: 20 }} />
										) : (
											<PlusCircleOutlined style={{ fontSize: 20 }} />
										)}
									</Button>
									<Button type="primary" onClick={() => handleView(elm)}>
										View
									</Button>
									<Tag>{elm.matchingScore}{" %"}</Tag>
								</div>
							</div>
						);
					}
				})
		}
		return null
	};

	const studentSuggestionListFromSkillJsx = studentSuggestionsBasedSkills?.map(
		(elm) => {
			if (isAssigned(elm.id)) {
				return null;
			} else {
				return (
					<div className="listContainer" key={elm.id}>
						<div className="avatar_container">
							<Avatar src={elm.img} />
						</div>
						<div className="student_details">
							<div className="student_name">{elm.name}</div>
							<div className="student_college">
								{elm.collegeName} , &nbsp;{elm.branchName}
							</div>
							<div>{elm.skills.toString()}</div>
						</div>
						<div className="student_control">
							<Button
								type="primary"
								disabled={isAssigned(elm.id)}
								onClick={() => handleTagAndAssign(elm.id)}
							>
								{jobAssignProcessing && selectedStudent === elm.id ? (
									<div className="loader"></div>
								) : isAssigned(elm.id) ? (
									<CheckOutlined style={{ fontSize: 20 }} />
								) : (
									<PlusCircleOutlined style={{ fontSize: 20 }} />
								)}
							</Button>
							<Button type="primary" onClick={() => handleView(elm)}>
								View
							</Button>
						</div>
					</div>
				);
			}
		}
	);

	const generateStudentSuggestionsBasedOnNLP = (e, jobId) => {
		setIsListLoading(true);
		e.preventDefault();

		axios
			.get(
				`https://us-central1-piit-52003.cloudfunctions.net/topStudentsWithFilters?jobID=${jobId}`
			)
			.then((response) => {
				const matchedStudentObject = JSON.parse(
					JSON.stringify(response.data)
				).response;

				const splittedBy10StudentArr = splitArrayByNoOfElement(
					Object.keys(matchedStudentObject),
					10
				);

				if (splittedBy10StudentArr.length > 0) {
					const arrLength = splittedBy10StudentArr.length;

					let counter = 0;

					splittedBy10StudentArr.forEach((x) => {
						counter = counter + 1;

						database
							.collection("StudentProfile")
							.where("id", "in", x)
							.get()
							.then((querySnapshot) => {
								let _allStudentArr = [];

								querySnapshot.forEach((doc) => {
									_allStudentArr.push({
										...doc.data(),
										matchingScore: Math.ceil(matchedStudentObject[doc.data().id]*100)
									});
								});

								setStudentSuggestionsBasedOnNLP(
									studentSuggestionsBasedOnNLP
										? [...studentSuggestionsBasedOnNLP, ..._allStudentArr]
										: [..._allStudentArr]
								);

								if (counter === arrLength) {
									setIsListLoading(false);
								}
							})
							.catch((err) => {
								console.log("NLP matched student load error:", err);
								setIsListLoading(false);
							});
					});
				} else {
					setStudentSuggestionsBasedOnNLP(null);
					setIsListLoading(false);
				}
			})
			.catch((ex) => {
				console.log("Error:", ex);
				setIsListLoading(false);
			});

		setStudentSuggestionsBasedOnSkills(null);
	};

	const generateStudentSuggestionsBasedOnSkill = (e, jobId) => {
		setIsListLoading(true);
		e.preventDefault();
		// const resData = JSON.parse(matchedStudents);
		const requiredTechnicalSkills = selectedJob ? selectedJob.skills : [];
		let allStudents = [];
		let filteredStudents = [];
		// console.log("SKILLSSET:", requiredTechnicalSkills);
		database
			.collection("StudentProfile")
			.where("active", "==", true)
			.get()
			.then((qry) => {
				qry.forEach((doc) => allStudents.push(doc.data()));
				filteredStudents = [
					...filterStudentBasedOnSkillArr_2(
						[...allStudents],
						[...requiredTechnicalSkills]
					),
				];
				setStudentSuggestionsBasedOnSkills(filteredStudents);
				setIsListLoading(false);
			})
			.catch((ex) => {
				setIsListLoading(false);
			});

		setStudentSuggestionsBasedOnNLP(null);
	};

	return (
		<>
			<Modal
				title={"Assign Engineers"}
				footer={[
					<Button key="submit" type="primary" onClick={handleOk}>
						Ok
					</Button>,
				]}
				width={900}
				visible={isModalOpen}
				onCancel={handleOk}
			>
				<Title level={5}>Tagged students list : </Title>
				<div className="modalContainer">{studentListJsx}</div>
				<Divider />
				<Title level={5}>Suggested students : </Title>
				<Space>
					<Button
						type="primary"
						onClick={(e) =>
							generateStudentSuggestionsBasedOnNLP(e, selectedJob.jobId)
						}
						disabled={studentSuggestionsBasedOnNLP ? true : false}
					>
						See student suggestions based on NLP
					</Button>
					<Button
						type="primary"
						onClick={(e) =>
							generateStudentSuggestionsBasedOnSkill(e, selectedJob.jobId)
						}
						disabled={studentSuggestionsBasedSkills ? true : false}
					>
						See student suggestions based on technical skills
					</Button>
				</Space>
				<div className="galkLab_studentSuggestion_container">
					{isListLoading && <Loading />}
					{studentSuggestionsBasedOnNLP && (
						<>{studentSuggestionListFromNLPJsx()}</>
					)}
					{studentSuggestionsBasedSkills && (
						<>{studentSuggestionListFromSkillJsx}</>
					)}
				</div>
			</Modal>
			{studentDetailModal && (
				<StudentDetailsDialog
					onCloseHandler={closeStudentDetailsHandler}
					studentDetails={selectedStudent}
					//isLoading={isLoading}
				/>
			)}
		</>
	);
};

const mapStateToProps = (state) => ({
	studentList: state.company.taggedGalkLabStudentList,
	jobList: state.company.galkJobListToShow,
	jobAssignProcessing: state.company.jobAssignProcessing,
});

export default connect(mapStateToProps, {
	assignEngineeorInProject,
	unAssignEngineeorFromProject,
	tagAndAssignEngineerInProject,
})(AssignEngineers);
