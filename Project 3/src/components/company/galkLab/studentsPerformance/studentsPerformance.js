import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Modal } from "antd";
import {
	getTaggedGalkLabStudentList,
	getStudentDetails,
	resetStudentToShowDetails,
	requestStudentForInterview,
	updateTaggedGalkLabStudents,
} from "../../../../actions/companyActions";
import { getStudentMeta } from "../../../../actions/actionHelper";
import Loading from "../../../common/loading";
import Render from "../../../common/auth/render";
import StudentCard from "./common/studentCard";
import StudentDetailsDialog from "./common/studentDetailsDialog";
import { AsyncSelect } from "../../../../utils/components/inputFields";
// import ExportToExcel from "../../../utils/components/ExportToExcel";
import AGGrid from "../../../../utils/components/AgGridTableExport";
import { Row, Col, Empty, Button, Divider, Space, Spin } from "antd";
import MatchStudents from "../matchStudents/matchStudents";

const StudentsPerformance = ({
	studentList,
	isListLoading,
	getTaggedGalkLabStudentList,
	getStudentDetails,
	resetStudentToShowDetails,
	isStudentToShowDetailsLoading,
	studentDetails,
	updateTaggedGalkLabStudents,
	companyName,
	companyId,
}) => {
	const [showStudentDetails, setShowStudentDetails] = useState(false);
	const [showTagStudentForm, setShowTagStudentForm] = useState(false);
	const [studentToTagArray, setStudentToTagArray] = useState([]);

	useEffect(() => {
		getTaggedGalkLabStudentList();
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

	const [showMatchedStudentsModal, setShowMatchedStudentsModal] =
		useState(false);
	const openMachedStudentsModal = () => {
		setShowMatchedStudentsModal(true);
	};

	const showStudentDetailsHandler = (studentId) => {
		setShowStudentDetails(true);
		getStudentDetails(studentId);
	};

	const closeStudentDetailsHandler = () => {
		setShowStudentDetails(false);
		resetStudentToShowDetails();
	};
	// const stopEventPropagation = (e) => {
	// 	e.stopPropagation();
	// };

	// const fetchStudentList = async () => {
	// 	return getStudentMeta().then((querySnapShot) => {
	// 		let studentData = [];
	// 		querySnapShot.forEach((doc) => studentData.push(doc.data()));

	// 		let filtereByAlreadyTaggedStudents = [];
	// 		studentData.forEach((stu) => {
	// 			if (studentList.map((x) => x.id).findIndex((y) => y === stu.id) < 0) {
	// 				if (stu.subscribedInGalkLab) filtereByAlreadyTaggedStudents.push(stu);
	// 			}
	// 		});

	// 		return filtereByAlreadyTaggedStudents.map((student) => ({
	// 			label: `${student.name}, ${student.collegeName}, ${student.branchName}`,
	// 			value: student.id,
	// 		}));
	// 	});
	// };

	// const tagStudents = () => {
	// 	 (
	// 		studentToTagArray.map((x) => ({ label: x.label, key: x.key }))
	// 	);
	// 	setShowTagStudentForm(false);
	// };
	return (
		<>
			{isListLoading && <Loading size="large" />}
			{showMatchedStudentsModal && (
				<Modal
					visible={true}
					onCancel={() => setShowMatchedStudentsModal(false)}
					okButtonProps={{ style: { display: "none" } }}
					cancelButtonProps={{ style: { display: "none" } }}
					width={"1200px"}
				>
					<MatchStudents />
				</Modal>
			)}

			<Row>
				<Col span={24}>
					<div style={{ display: "flex", justifyContent: "space-evenly" }}>
						{/* {showTagStudentForm ? (
							<div
								style={{
									display: "flex",
									justifyContent: "space-evenly",
								}}
							>
								<AsyncSelect
									mode="multiple"
									value={studentToTagArray}
									placeholder="Type name to select students..."
									fetchOptions={fetchStudentList}
									onChange={(newValue) => {
										setStudentToTagArray(newValue);
									}}
									style={{ width: "50%" }}
								/>
								<Button type="primary" onClick={tagStudents}>
									Save
								</Button>
							</div>
						) : (
							<Button
								type="primary"
								onClick={() => setShowTagStudentForm(true)}
							>
								Edit tagged students
							</Button>
						)} */}
						<Button type="primary" onClick={openMachedStudentsModal} disabled>
							Show matching students
						</Button>
						<div>
							{studentList && studentList.length > 0 && (
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
					</div>
				</Col>
			</Row>
			<Divider />
			<Row>
				<Col span={24}>
					{studentList && studentList.length < 1 && <Empty />}
				</Col>
			</Row>

			<Row>
				{studentList &&
					studentList.map((student, i) => (
						<Col key={i} span={12}>
							<StudentCard
								student={student}
								onClick={showStudentDetailsHandler}
								removeTagOption={false}
							></StudentCard>
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
	studentList: state.company.taggedGalkLabStudentList,
	isListLoading: state.company.isGalkStudentListLoading,
	studentDetails: state.company.studentToShowDetails,
	isStudentToShowDetailsLoading: state.company.studentToShowDetailsLoading,
});

export default connect(mapStateToProps, {
	getTaggedGalkLabStudentList,
	getStudentDetails,
	resetStudentToShowDetails,
	requestStudentForInterview,
	updateTaggedGalkLabStudents,
})(StudentsPerformance);
