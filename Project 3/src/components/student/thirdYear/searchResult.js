import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import StudentCard from "../common/studentCard";
import StudentDetailsDialog from "../common/studentDetailsDialog";

import {
	getStudentDetails,
	resetStudentToShowDetails,
} from "../../../actions/studentAction";

import { withRouter, Link, useLocation } from "react-router-dom";

import { Card, Row, Col, Button, Empty, Input } from "antd";
import { EditOutlined } from "@ant-design/icons";

import "./thirdYearStudents.css";

// A custom hook that builds on useLocation to parse the query string
// function useQuery() {
// 	return new URLSearchParams(useLocation().search);
// }

// const { Option } = Select;

const SearchResult = ({
	match,
	allStudentList,
	getStudentDetails,
	resetStudentToShowDetails,
	studentDetails,
	isLoading,
}) => {
	// let query = useQuery();
	// console.log("PROPS:", query.get("studentId"));

	const [showStudentDetails, setShowStudentDetails] = useState(false);
	const [studentList, setStudentList] = useState(allStudentList);

	useEffect(() => {
		if (allStudentList) {
			setStudentList(allStudentList);
		}
	}, [allStudentList]);

	const showStudentDetailsHandler = (studentId) => {
		setShowStudentDetails(true);
		getStudentDetails(studentId);
	};

	const closeStudentDetailsHandler = () => {
		setShowStudentDetails(false);
		resetStudentToShowDetails();
	};

	const stopEventPropagation = (e) => {
		e.stopPropagation();
	};

	const onNameSearch = (e) => {
		let val = e.target.value.toLowerCase();
		let allStudent = allStudentList;

		setStudentList(
			allStudent.filter((x) => x.name.toLowerCase().includes(val))
		);
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
				bodyStyle={{ padding: 0 }}
				extra={
					<Input
						placeholder="Type name to search..."
						allowClear
						onChange={onNameSearch}
					/>
				}
			>
				<Row gutter={8} style={{ margin: 0 }}>
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
						<Col
							key={i}
							xs={24}
							sm={24}
							md={24}
							lg={16}
							xl={12}
							style={{ margin: "auto" }}
						>
							<StudentCard
								student={student}
								onClick={showStudentDetailsHandler}
							>
								<Link to={`${match.path}/${student.id}`}>
									<Button
										type="primary"
										size="small"
										block
										icon={<EditOutlined />}
										// onClick={stopEventPropagation}
									>
										Edit details
									</Button>
								</Link>
							</StudentCard>
						</Col>
					))}
				</Row>
			</Card>
			{showStudentDetails && (
				<StudentDetailsDialog
					onCloseHandler={closeStudentDetailsHandler}
					studentDetails={studentDetails}
					isLoading={isLoading}
				/>
			)}
		</>
	);
};

const mapStateToProps = (state) => ({
	allStudentList: state.student.thirdYearList,
	studentDetails: state.student.studentToShow,
	isLoading: state.student.studentToShowLoading,
});

export default connect(mapStateToProps, {
	getStudentDetails,
	resetStudentToShowDetails,
})(withRouter(SearchResult));
