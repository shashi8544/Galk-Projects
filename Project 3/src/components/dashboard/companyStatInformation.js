import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getDashboardCompanyStat } from "../../actions/dashboardActions";
import { Card, List, Skeleton } from "antd";

import "./dashboardStyles.css";

const CompanyStatInformation = ({
	isLoading,
	getDashboardCompanyStat,
	companyStatData,
	companyId,
}) => {
	useEffect(() => {
		if (companyId) {
			getDashboardCompanyStat(companyId);
		}
	}, [companyId]);

	if (companyStatData) {
		var {
			totalRecruiterCount,
			totalInternshipJobCount,
			totalStudentInInterviewPanelCount,
			totalStudentSelectedCount,
		} = companyStatData;
	}

	return (
		<Card
			className="dashboard-basicInformation-card-container"
			title="Company Statistics"
		>
			{companyStatData && (
				<>
					<List>
						<List.Item>
							<List.Item.Meta
								title="No. of Recruiters"
								description="companies who are recruiting from GALK."
							/>
							{isLoading ? (
								<Skeleton.Input style={{ width: 40 }} active={true} />
							) : (
								<span className="dashboard_companyStat_card_count">
									{totalRecruiterCount}
								</span>
							)}
						</List.Item>
						<List.Item>
							<List.Item.Meta
								title="No. of Jobs you created"
								description="Internship jobs what you have created to offer."
							/>
							{isLoading ? (
								<Skeleton.Input style={{ width: 40 }} active={true} />
							) : (
								<span className="dashboard_companyStat_card_count">
									{totalInternshipJobCount}
								</span>
							)}
						</List.Item>
						<List.Item>
							<List.Item.Meta
								title="No. of students in your Interview panel"
								description="Includes eligible Interns and Fulltime candidates."
							/>
							{isLoading ? (
								<Skeleton.Input style={{ width: 40 }} active={true} />
							) : (
								<span className="dashboard_companyStat_card_count">
									{totalStudentInInterviewPanelCount}
								</span>
							)}
						</List.Item>
						<List.Item>
							<List.Item.Meta
								title="No. of Selected students"
								description="Total number of Internship and Fulltime job offered till date."
							/>
							{isLoading ? (
								<Skeleton.Input style={{ width: 40 }} active={true} />
							) : (
								<span className="dashboard_companyStat_card_count">
									{totalStudentSelectedCount}
								</span>
							)}
						</List.Item>
					</List>
				</>
			)}
		</Card>
	);
};

const mapStateToProps = (state) => ({
	isLoading: state.dashboard.isCompanyStatInformationLoading,
	companyStatData: state.dashboard.companyStatInformation,
	companyId: state.firebase.profile.companyId,
});

export default connect(mapStateToProps, { getDashboardCompanyStat })(
	CompanyStatInformation
);
