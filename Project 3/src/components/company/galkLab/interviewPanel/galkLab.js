import React, { useState } from "react";
import { connect } from "react-redux";

import StudentCard from "../taggedStudents/common/studentCard";
import StudentDetailsDialog from "../taggedStudents/common/studentDetailsDialog";

import {
	getStudentDetails,
	resetStudentToShowDetails,
	selectGALKLabStudentFromInterviewPanel,
} from "../../../../actions/companyActions";

import Render from "../../../common/auth/render";

import {
	checkIfGALKStudentInterviewRequested,
	checkIfGALKLabStudentSelected,
} from "../../../../reducers/companySelector";

import { Card, Row, Col, Button, Empty } from "antd";
import { CheckOutlined, StarFilled } from "@ant-design/icons";

// import "../student/thirdYear/thirdYearStudents.css";

const GalkLab = ({
	studentList,
	getStudentDetails,
	resetStudentToShowDetails,
	ifGALKLabStudentInterviewRequested,
	ifGALKLabStudentSelected,
	selectGALKLabStudentFromInterviewPanel,
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

	const selectGALKLabStudent = (e, studentId) => {
		stopEventPropagation(e);
		selectGALKLabStudentFromInterviewPanel(studentId);
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
										ifGALKLabStudentInterviewRequested(student.id) &&
										!ifGALKLabStudentSelected(student.id)
									}
								>
									<Button
										type="primary"
										size="small"
										block
										icon={<CheckOutlined />}
										style={{ backgroundColor: "#cc99ff" }}
										onClick={(e) => selectGALKLabStudent(e, student.id)}
										disabled={ifActionInProgress}
									>
										Select student
									</Button>
								</Render>
								<Render when={ifGALKLabStudentSelected(student.id)}>
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
	ifGALKLabStudentInterviewRequested: (id) =>
		checkIfGALKStudentInterviewRequested(state, id),
	ifGALKLabStudentSelected: (id) => checkIfGALKLabStudentSelected(state, id),
	ifActionInProgress: state.company.interviewPanelActionInProgress,
	studentDetails: state.company.studentToShowDetails,
	isStudentDetailsLoading: state.company.studentToShowDetailsLoading,
});

export default connect(mapStateToProps, {
	getStudentDetails,
	resetStudentToShowDetails,
	selectGALKLabStudentFromInterviewPanel,
})(GalkLab);
