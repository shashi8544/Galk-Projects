import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import EditExamModal from "./editExamModal";
import ExamCard from "./examCard";
import Loading from "../../../common/loading";
import { Card, Row, Col, Empty } from "antd";

const ExamDetailsList = ({ examDetailsList, isLoading }) => {
	const [showEditModal, setShowEditModal] = useState(false);
	const [examToEdit, setExamToEdit] = useState(null);

	const editExam = (examIdx) => {
		setExamToEdit(examDetailsList[examIdx]);
		setShowEditModal(true);
	};

	const closeEditModal = () => {
		setExamToEdit(null);
		setShowEditModal(false);
	};

	return (
		<>
			{isLoading && <Loading />}
			{examDetailsList && (
				<div style={{ height: "100%", padding: "0 10px", overflowY: "auto" }}>
					<Card title="GALK Exam details">
						<Row>
							{examDetailsList && examDetailsList.length < 1 && (
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
							{examDetailsList &&
								examDetailsList.map((item, i) => (
									<Col key={i} span={24}>
										<ExamCard
											examDetails={item}
											index={i}
											editHandler={editExam}
										/>
									</Col>
								))}
						</Row>
					</Card>
				</div>
			)}
			{showEditModal && (
				<EditExamModal
					examDetails={examToEdit}
					modalCloseHandler={closeEditModal}
				/>
			)}
		</>
	);
};

const mapStateToProps = (state) => ({
	examDetailsList: state.student.studentToShow.GALKExamDetails || [],
	isLoading: state.student.studentToShowLoading,
});

export default connect(mapStateToProps, {})(ExamDetailsList);
