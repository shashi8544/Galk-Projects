import { connect } from "react-redux";
import React, { useState } from "react";
import { Card, Row, Col, Button, Empty } from "antd";

import CreateExtraCurricularModal from "./createExtraCurricularModal";
import EditExtraCurricularModal from "./editExtraCurricularModal";
import ExtraCurricularCard from "./extraCurricularCard";

import Loading from "../../../common/loading";

const ExtraCurricularList = ({ extraCurricularList, isLoading }) => {
	const [showEditModal, setShowEditModal] = useState(false);
	const [extraCurricularToEdit, setExtraCurricularToEdit] = useState(null);
	const [EditIndex, setEditIndex] = useState(null);
	const [showCreateModal, setShowCreateModal] = useState(false);

	const editExtraCurricular = (currIdx) => {
		setEditIndex(currIdx);
		setExtraCurricularToEdit(extraCurricularList[currIdx]);
		setShowEditModal(true);
	};

	const closeEditModal = () => {
		setExtraCurricularToEdit(null);
		setShowEditModal(false);
	};

	const closeCreateModal = () => {
		setShowCreateModal(false);
	};

	return (
		<>
			{isLoading && <Loading />}
			{extraCurricularList && (
				<div style={{ height: "100%", padding: "0 10px", overflowY: "auto" }}>
					<Card
						title="Hobbies & ExtraCurricular activities."
						extra={
							<div style={{ display: "flex", alignItems: "baseline" }}>
								<Button
									type="primary"
									onClick={() => setShowCreateModal(true)}
									disabled={isLoading}
								>
									{"+ Post a new activity"}
								</Button>
							</div>
						}
					>
						<Row>
							{extraCurricularList && extraCurricularList.length < 1 && (
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
							{extraCurricularList &&
								extraCurricularList.map((item, i) => (
									<Col key={i} span={24}>
										<ExtraCurricularCard
											extraCurricularDetails={item}
											index={i}
											editHandler={editExtraCurricular}
										/>
									</Col>
								))}
						</Row>
					</Card>
				</div>
			)}
			{showEditModal && (
				<EditExtraCurricularModal
					extraCurricularDetails={extraCurricularToEdit}
					editIndex={EditIndex}
					modalCloseHandler={closeEditModal}
				/>
			)}
			{showCreateModal && (
				<CreateExtraCurricularModal modalCloseHandler={closeCreateModal} />
			)}
		</>
	);
};

const mapStateToProps = (state) => ({
	extraCurricularList: state.firebase.profile.personalInterest || [],
	isLoading: state.firebase.profile.isLoading,
});

export default connect(mapStateToProps, {})(ExtraCurricularList);
