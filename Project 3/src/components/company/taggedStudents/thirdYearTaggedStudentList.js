import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
	getTaggedThirdYearStudentList,
	getStudentDetails,
	resetStudentToShowDetails,
	requestStudentForInterview,
	updateTaggedStudents,
} from "../../../actions/companyActions";
import { getStudentMeta } from "../../../actions/actionHelper";
import Loading from "../../common/loading";
import Render from "../../common/auth/render";
import StudentCard from "./common/studentCard";
import StudentDetailsDialog from "./common/studentDetailsDialog";
import { AsyncSelect } from "../../../utils/components/inputFields";
import AGGrid from "../../../utils/components/AgGridTableExport";
import {
	checkIfStudentAvailable,
	checkIfStudentInterviewRequested,
	checkIfStudentSelected,
} from "../../../reducers/companySelector";
import { Row, Col, Empty, Button, Divider} from "antd";
import {
	CheckOutlined,
	StarFilled,
} from "@ant-design/icons";

const ThirdYearTaggedStudentList = ({
	studentList,
	isListLoading,
	getTaggedThirdYearStudentList,
	ifStudentAvailable,
	ifStudentInterviewRequested,
	ifStudentSelected,
	ifActionInProgress,
	getStudentDetails,
	resetStudentToShowDetails,
	requestStudentForInterview,
	isStudentToShowDetailsLoading,
	studentDetails,
	updateTaggedStudents,
	companyName,
	companyId,
}) => {
	const [showStudentDetails, setShowStudentDetails] = useState(false);
	const [showTagStudentForm, setShowTagStudentForm] = useState(false);
	const [studentToTagArray, setStudentToTagArray] = useState([]);

	useEffect(() => {
		getTaggedThirdYearStudentList();
	}, []);

	useEffect(() => {
		if (studentList && studentList.length > 0) {
			setStudentToTagArray(
				studentList.map((x) => ({
					value: x.id,
					label: `${x.name}, ${x.collegeName}, ${x.branchName}`,
					key: x.id,
				}))
			);
		}
	}, [studentList]);

	const showStudentDetailsHandler = (studentId) => {
		setShowStudentDetails(true);
		getStudentDetails(studentId);
	};

	const closeStudentDetailsHandler = () => {
		setShowStudentDetails(false);
		resetStudentToShowDetails();
	};

	const requestInterview = (e, studentId) => {
		stopEventPropagation(e);
		requestStudentForInterview(studentId);
	};

	const stopEventPropagation = (e) => {
		e.stopPropagation();
	};

	const fetchStudentList = async () => {
		return getStudentMeta().then((querySnapShot) => {
			let studentData = [];
			querySnapShot.forEach((doc) => studentData.push(doc.data()));

			let filtereByAlreadyTaggedStudents = [];
			studentData.forEach((stu) => {
				if (studentList.map((x) => x.id).findIndex((y) => y === stu.id) < 0) {
					filtereByAlreadyTaggedStudents.push(stu);
				}
			});

			return filtereByAlreadyTaggedStudents.map((student) => ({
				label: `${student.name}, ${student.collegeName}, ${student.branchName}`,
				value: student.id,
			}));
		});
	};

	const tagStudents = () => {
		updateTaggedStudents(
			studentToTagArray.map((x) => ({ label: x.label, key: x.key }))
		);
		setShowTagStudentForm(false);
	};

	return (
		<>
			{isListLoading && <Loading size="large" />}
			{studentList && studentList.length < 1 && <Empty />}
			<Row>
				<Col span={24}>
					<div style={{ display: "flex", justifyContent: "space-between" }}>
						{showTagStudentForm ? (
							<>
								<AsyncSelect
									mode="multiple"
									value={studentToTagArray}
									placeholder="Type name to select students..."
									fetchOptions={fetchStudentList}
									onChange={(newValue) => {
										setStudentToTagArray(newValue);
									}}
									style={{ width: "100%" }}
								/>
								<Button
									type="primary"
									onClick={tagStudents}
									style={{ marginTop: 20 }}
								>
									Save
								</Button>
							</>
						) : (
							<Button
								type="primary"
								onClick={() => setShowTagStudentForm(true)}
							>
								Edit tagged students
							</Button>
						)}
						{/* <ExportToExcel
							company={{
								name: companyName || "",
								id: companyId || "",
							}}
							studentList={studentList}
							documentName="StudentSummaryList"
						/> */}
						{studentList && (
							<AGGrid
								company={{
									name: companyName || "",
									id: companyId || "",
								}}
								studentList={studentList}
								documentName="StudentSummaryList"
							/>
						)}
					</div>
				</Col>
			</Row>
			<Divider />
			<Row>
				{studentList &&
					studentList.map((student, i) => (
						<Col key={i} span={12}>
							<StudentCard
								student={student}
								onClick={showStudentDetailsHandler}
							>
								<Render when={ifStudentAvailable(student.id)}>
									<Button
										type="primary"
										size="small"
										block
										onClick={(e) => requestInterview(e, student.id)}
										disabled={ifActionInProgress}
									>
										Request Interview
									</Button>
								</Render>
								<Render
									when={
										ifStudentInterviewRequested(student.id) &&
										!ifStudentSelected(student.id)
									}
								>
									<Button
										type="primary"
										size="small"
										block
										icon={<CheckOutlined />}
										style={{ backgroundColor: "#ff9900" }}
										onClick={stopEventPropagation}
									>
										Interview Requested
									</Button>
								</Render>
								<Render when={ifStudentSelected(student.id)}>
									<Button
										type="primary"
										size="small"
										block
										icon={<StarFilled />}
										style={{ backgroundColor: "#33cc33" }}
										onClick={stopEventPropagation}
									>
										Selected
									</Button>
								</Render>
							</StudentCard>
						</Col>
					))}
			</Row>
			{showStudentDetails && (
				<StudentDetailsDialog
					onCloseHandler={closeStudentDetailsHandler}
					studentDetails={studentDetails}
					isLoading={isStudentToShowDetailsLoading}
				/>
			)}
		</>
	);
};

const mapStateToProps = (state) => ({
	companyName: state.company.companyToShow.name,
	companyId: state.company.companyToShow.id,
	studentList: state.company.taggedThirdYearStudentList,
	isListLoading: state.company.isThirdYearStudentListLoading,
	studentDetails: state.company.studentToShowDetails,
	ifStudentAvailable: (id) => checkIfStudentAvailable(state, id),
	ifStudentInterviewRequested: (id) =>
		checkIfStudentInterviewRequested(state, id),
	ifStudentSelected: (id) => checkIfStudentSelected(state, id),
	ifActionInProgress: state.company.thirdYearStudentActionInProgress,
	isStudentToShowDetailsLoading: state.company.studentToShowDetailsLoading,
});

export default connect(mapStateToProps, {
	getTaggedThirdYearStudentList,
	getStudentDetails,
	resetStudentToShowDetails,
	requestStudentForInterview,
	updateTaggedStudents,
})(ThirdYearTaggedStudentList);
