import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getDashboardAnalytic } from "../../actions/dashboardActions";
import SuccessfulPlacementchart from "./totalPlacemnetChart";
import { Card } from "antd";

const AnalyticInformation = ({
	isLoading,
	GALKAnalytic,
	getDashboardAnalytic,
	companyId,
}) => {
	useEffect(() => {
		if (companyId) {
			getDashboardAnalytic(companyId);
		}
	}, [companyId]);

	return (
		<Card
			className="dashboard-bottom-card-container"
			title="Analytic Information"
		>
			{GALKAnalytic && (
				<SuccessfulPlacementchart dataList={GALKAnalytic.placemnetArr} />
			)}
		</Card>
	);
};

const mapStateToProps = (state) => ({
	isLoading: state.dashboard.isGALKAnalyticLoading,
	GALKAnalytic: state.dashboard.GALKAnalytic,
	companyId: state.firebase.profile.companyId,
});

export default connect(mapStateToProps, { getDashboardAnalytic })(
	AnalyticInformation
);
