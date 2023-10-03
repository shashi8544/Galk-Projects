import React, { useState, useEffect } from "react";
import { Region } from "../common/layout/region";

import BasicInfo from "./basicInfo";
// import InternshipJobPostings from "./jobPosting";
import InternshipPanel from "./internshipPanel";
import GalkPanel from "./galkLab/galkPanel";
import TaggedThirdYearStudents from "./taggedStudents";
import InterviewPanel from "./interviewPanel";
import ChatRoom from "./chatRoom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
	getCompanyDetailsById,
	resetComapnyToShowDetails,
} from "../../actions/companyActions";
import { Card, Button, Modal, Divider, Tabs } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import "./style.css";
import AdminActivity from "./adminActivity";

const { TabPane } = Tabs;

const CompanyDetails = ({
	history,
	match,
	location,
	getCompanyDetailsById,
	companyDetails,
	resetComapnyToShowDetails,
}) => {
	const [showStudentView, setShowStudentView] = useState(false);

	const companyId = match.params.profileId;

	useEffect(() => {
		if (companyId) {
			getCompanyDetailsById(companyId);
		}
	}, [companyId]);

	useEffect(() => {
		return () => {
			resetComapnyToShowDetails();
		};
	}, []);

	return (
		<Region>
			<Card
				title={`Company profile-> ${companyDetails && companyDetails.name}(ID:${companyDetails && companyDetails.id
					})`}
				style={{
					height: "100%",
					width: "100%",
					overflowY: "auto",
				}}
				extra={
					<>
						<Button
							style={{ marginRight: 20 }}
							onClick={() => history.goBack()}
							icon={<ArrowLeftOutlined />}
						>
							Back
						</Button>
						<Button type="primary" onClick={() => setShowStudentView(true)}>
							Check student view
						</Button>
					</>
				}
			>
				{companyDetails && (
					<Tabs defaultActiveKey="1">
						<TabPane tab="Manage Information" key="1">
							<BasicInfo company={companyDetails} />
						</TabPane>
						<TabPane tab="Internship" key="2">
							<InternshipPanel />
						</TabPane>
						<TabPane tab="GALK Lab" key="3">
							<GalkPanel />
						</TabPane>
						<TabPane tab="ADMIN activity" key="5">
							<AdminActivity />
						</TabPane>
					</Tabs>
				)}

				{/* {showStudentView && (
					<Modal
						title="Student view"
						centered
						visible={true}
						onOk={() => {
							setShowStudentView(false);
						}}
						onCancel={() => {
							setShowStudentView(false);
						}}
						footer={[
							<Button
								key="Ok"
								type="primary"
								onClick={() => setShowStudentView(false)}
							>
								Ok
							</Button>,
						]}
						width={1000}
					>
						<div className="studentView_companyProfile_container">
							<div className="studentView_companyProfile_container_grid">
								<div
									className="studentView_grid_profileTop"
									style={{
										background: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),url(${
											company.coverPhoto
												? company.coverPhoto
												: defaultCompanyCoverPhoto
										}) no-repeat center center/cover`,
									}}
								>
									<div className="actionContainer">
										<img
											src={company.logo ? company.logo : defaultCompanyLogoURL}
											alt=""
										/>
									</div>

									<span className="profileTop_companyName">
										{company.nameInEnglish
											? company.nameInEnglish
											: company.name}
									</span>

									<div className="actionContainer">
										<div>
											<span className="profileTop_industry">
												{company.industry}
											</span>
											<br />
											<span className="profileTop_address">
												{company.address}{" "}
												<EnvironmentOutlined style={{ fontSize: 18 }} />
											</span>
										</div>
										<span className="profileTop_website">
											<a href={company.website} target="_blank">
												{company.website}
											</a>{" "}
											<GlobalOutlined style={{ fontSize: 18, marginLeft: 5 }} />
										</span>
									</div>
								</div>
								<div className="studentView_grid_profileAbout">
									<h2>Company Information</h2>
									<p>
										{company.description}
										<br />
										<br />
										<strong>Founder:</strong> {company.founder}
										<br />
										<strong>No of Employee:</strong> {company.size}
									</p>
									{company.do && (
										<>
											<Divider />
											<h2>What we do</h2>
											<p>{company.do}</p>
										</>
									)}
								</div>
							</div>
						</div>
					</Modal>
				)} */}
			</Card>
		</Region>
	);
};

const mapStateToProps = (state) => ({
	companyDetails: state.company.companyToShow,
});

export default connect(mapStateToProps, {
	getCompanyDetailsById,
	resetComapnyToShowDetails,
})(withRouter(CompanyDetails));
