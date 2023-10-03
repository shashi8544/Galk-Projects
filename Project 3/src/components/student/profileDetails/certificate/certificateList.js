import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import CreateCertificateModal from "./createCertificateModal";
import EditCertificateModal from "./editCertificateModal";
import CertificateCard from "./certificateCard";
import Loading from "../../../common/loading";
import { Card, Row, Col, Button, Empty } from "antd";

const CertificateList = ({ certificateList, isLoading }) => {
	const [showEditModal, setShowEditModal] = useState(false);
	const [certificateToEdit, setCertificateToEdit] = useState(null);
	const [showCreateModal, setShowCreateModal] = useState(false);

	const editCertificate = (certIndex) => {
		setCertificateToEdit(certificateList[certIndex]);
		setShowEditModal(true);
	};

	const closeEditModal = () => {
		setCertificateToEdit(null);
		setShowEditModal(false);
	};

	const closeCreateModal = () => {
		setShowCreateModal(false);
	};

	return (
		<>
			{isLoading && <Loading />}
			{certificateList && (
				<div style={{ height: "100%", padding: "0 10px", overflowY: "auto" }}>
					<Card
						title="Certificate details"
						extra={
							<div style={{ display: "flex", alignItems: "baseline" }}>
								<Button
									type="primary"
									onClick={() => setShowCreateModal(true)}
									disabled={isLoading}
								>
									{"+ Post a new certificate"}
								</Button>
							</div>
						}
					>
						<Row>
							{certificateList && certificateList.length < 1 && (
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
							{certificateList &&
								certificateList.map((item, i) => (
									<Col key={i} span={24}>
										<CertificateCard
											certificateDetails={item}
											index={i}
											editHandler={editCertificate}
										/>
									</Col>
								))}
						</Row>
					</Card>
				</div>
			)}
			{showEditModal && (
				<EditCertificateModal
					certificateDetails={certificateToEdit}
					modalCloseHandler={closeEditModal}
				/>
			)}
			{showCreateModal && (
				<CreateCertificateModal modalCloseHandler={closeCreateModal} />
			)}
		</>
	);
};

const mapStateToProps = (state) => ({
	certificateList: state.student.studentToShow.certificate || [],
	isLoading: state.student.studentToShowLoading,
});

export default connect(mapStateToProps, {})(CertificateList);
