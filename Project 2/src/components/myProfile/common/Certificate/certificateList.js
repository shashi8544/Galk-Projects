import React, { useState } from "react";
import { connect } from "react-redux";
import { Card, Row, Col, Button, Empty } from "antd";

import Loading from "../../../common/loading";
import CertificateCard from "./certificateCard";
import EditCertificateModal from "./editCertificateModal";
import CreateCertificateModal from "./createCertificateModal";

const CertificateList = ({ certificatesList, isLoading }) => {
	const [showEditModal, setShowEditModal] = useState(false);
	const [certificateToEdit, setCertificateToEdit] = useState(null);
	const [certificateToEditIndex, setCertificateToEditIndex] = useState(null);
	const [showCreateModal, setShowCreateModal] = useState(false);

	const editCertificate = (certIndex) => {
		setCertificateToEdit(certificatesList[certIndex]);
		setCertificateToEditIndex(certIndex);
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
			{certificatesList && (
				<div
					style={{
						height: "100%",
						padding: "0 10px",
						overflowY: "auto",
					}}
				>
					<Card
						title="Certificate details"
						extra={
							<div
								style={{
									display: "flex",
									alignItems: "baseline",
								}}
							>
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
							{certificatesList.length < 1 && (
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
							{certificatesList.map((item, i) => (
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
					certificateIndex={certificateToEditIndex}
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
	certificatesList: state.firebase.profile.certificates || [],
	isLoading: state.firebase.profile.isLoading,
});

export default connect(mapStateToProps, {})(CertificateList);
