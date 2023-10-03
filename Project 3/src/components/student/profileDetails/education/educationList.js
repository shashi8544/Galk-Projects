import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import CreateEducationModal from "./createEducationModal";
import EditEducationModal from "./editEducationModal";
import EducationCard from "./educationCard";
import Loading from "../../../common/loading";
import { Card, Row, Col, Button, Empty } from "antd";

const EducationList = ({ educationList, isLoading }) => {
	const [showEditModal, setShowEditModal] = useState(false);
	const [educationToEdit, setEducationToEdit] = useState(null);
	const [showCreateModal, setShowCreateModal] = useState(false);

	const editEducation = (eduIndex) => {
		setEducationToEdit(educationList[eduIndex]);
		setShowEditModal(true);
	};

	const closeEditModal = () => {
		setEducationToEdit(null);
		setShowEditModal(false);
	};

	const closeCreateModal = () => {
		setShowCreateModal(false);
	};

	return (
		<>
			{isLoading && <Loading />}
			{educationList && (
				<div style={{ height: "100%", padding: "0 10px", overflowY: "auto" }}>
					<Card
						title="Education details"
						extra={
							<div style={{ display: "flex", alignItems: "baseline" }}>
								<Button
									type="primary"
									onClick={() => setShowCreateModal(true)}
									disabled={isLoading}
								>
									{"+ Post a new education"}
								</Button>
							</div>
						}
					>
						<Row>
							{educationList && educationList.length < 1 && (
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
							{educationList &&
								educationList.map((item, i) => (
									<Col key={i} span={24}>
										<EducationCard
											educationDetails={item}
											index={i}
											editHandler={editEducation}
										/>
									</Col>
								))}
						</Row>
					</Card>
				</div>
			)}
			{showEditModal && (
				<EditEducationModal
					educationDetails={educationToEdit}
					modalCloseHandler={closeEditModal}
				/>
			)}
			{showCreateModal && (
				<CreateEducationModal modalCloseHandler={closeCreateModal} />
			)}
		</>
	);
};

const mapStateToProps = (state) => ({
	educationList: state.student.studentToShow.education || [],
	isLoading: state.student.studentToShowLoading,
});

export default connect(mapStateToProps, {})(EducationList);
