import React, { useState } from "react";
import { connect } from "react-redux";

import StudentCard from "../taggedStudents/common/studentCard";
import StudentDetailsDialog from "../taggedStudents/common/studentDetailsDialog";

import {
	getStudentDetails,
	resetStudentToShowDetails,
	selectStudentForomInterviewPanel,
} from "../../../actions/companyActions";

import Render from "../../common/auth/render";

import {
	checkIfStudentInterviewRequested,
	checkIfStudentSelected,
} from "../../../reducers/companySelector";

import { Card, Row, Col, Button, Empty } from "antd";
import { CheckOutlined, StarFilled } from "@ant-design/icons";

// import "../student/thirdYear/thirdYearStudents.css";

const ThirdYear = ({
	studentList,
	getStudentDetails,
	resetStudentToShowDetails,
	ifStudentInterviewRequested,
	ifStudentSelected,
	selectStudentForomInterviewPanel,
	ifActionInProgress,
	studentDetails,
	isStudentDetailsLoading,
}) => {
	const [showStudentDetails, setShowStudentDetails] = useState(false);

	const showStudentDetailsHandler = (studentId) => {
		setShowStudentDetails(true);
		getStudentDetails(studentId);
	};

	const closeStudentDetailsHandler = () => {
		setShowStudentDetails(false);
		resetStudentToShowDetails();
	};

	const selectStudent = (e, studentId) => {
		stopEventPropagation(e);
		selectStudentForomInterviewPanel(studentId);
	};

	const stopEventPropagation = (e) => {
		e.stopPropagation();
	};

	return (
		<>
			<Card
				title={`${studentList.length} students found.`}
				size="small"
				style={{
					height: "100%",
					width: "100%",
					overflowY: "auto",
				}}
			>
				<Row gutter={16} style={{ margin: 0 }}>
					{studentList.length < 1 && (
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
					{studentList.map((student, i) => (
						<Col key={i} span={12}>
							<StudentCard
								student={student}
								onClick={showStudentDetailsHandler}
							>
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
										style={{ backgroundColor: "#cc99ff" }}
										onClick={(e) => selectStudent(e, student.id)}
										disabled={ifActionInProgress}
									>
										Select student
									</Button>
								</Render>
								<Render when={ifStudentSelected(student.id)}>
									<Button
										type="primary"
										size="small"
										block
										icon={<StarFilled />}
										style={{ backgroundColor: "#00cc66" }}
										onClick={stopEventPropagation}
										disabled={ifActionInProgress}
									>
										Selected
									</Button>
								</Render>
							</StudentCard>
						</Col>
					))}
				</Row>
			</Card>
			{showStudentDetails && (
				<StudentDetailsDialog
					onCloseHandler={closeStudentDetailsHandler}
					studentDetails={studentDetails}
					isLoading={isStudentDetailsLoading}
				/>
			)}
		</>
	);
};

const mapStateToProps = (state) => ({
	ifStudentInterviewRequested: (id) =>
		checkIfStudentInterviewRequested(state, id),
	ifStudentSelected: (id) => checkIfStudentSelected(state, id),
	ifActionInProgress: state.company.interviewPanelActionInProgress,
	studentDetails: state.company.studentToShowDetails,
	isStudentDetailsLoading: state.company.studentToShowDetailsLoading,
});

export default connect(mapStateToProps, {
	getStudentDetails,
	resetStudentToShowDetails,
	selectStudentForomInterviewPanel,
})(ThirdYear);
