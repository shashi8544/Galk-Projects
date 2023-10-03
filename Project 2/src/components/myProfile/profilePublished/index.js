import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Card, Tabs } from "antd";

import BasicInfo from "./basicInfo";
import Education from "../common/Education";
import Job from "../common/Job";
import Project from "../common/Project";
import CertificateList from "../common/Certificate/certificateList";
import ExtraCurricular from "../common/ExtraCurricular";

const { TabPane } = Tabs;

const ProfilePublished = ({ studentDetails }) => {
	return (
		<Card
			style={{
				height: "100%",
				width: "100%",
				overflowY: "auto",
			}}
		>
			{studentDetails && (
				<Tabs defaultActiveKey="1">
					<TabPane tab="Basic Information" key="1">
						<BasicInfo student={studentDetails} />
					</TabPane>
					<TabPane tab="Education" key="2">
						<Education student={studentDetails} />
					</TabPane>
					{studentDetails.status === "graduate" && (
						<TabPane tab="Job" key="3">
							<Job student={studentDetails} />
						</TabPane>
					)}
					<TabPane tab="Project" key="4">
						<Project />
					</TabPane>
					<TabPane tab="Certificate" key="5">
						<CertificateList />
					</TabPane>
					<TabPane tab="ExtraCurricular" key="6">
						<ExtraCurricular />
					</TabPane>
				</Tabs>
			)}
		</Card>
	);
};

const mapStateToProps = (state) => ({
	studentDetails: state.firebase.profile,
});

export default connect(mapStateToProps, {})(withRouter(ProfilePublished));
