import React from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import RestrictedRoute from "../../utils/components/RestrictedRoute";
import CompanyList from "../company";
import CompanyDetails from "../company/companyDetails";
import CompanyDashboard from "../company/dashboard";
import QuickInterview from "../company/quickInterview";
import EditQuestion from "../company/editQuestion";
import { Region } from "../common/layout/region";
const _intershipRoot = ({ match }) => {
	return (
		<>
			<Redirect
				from={`${match.path}`}
				to={`${match.path}/Dashboard`}
			/>
			<RestrictedRoute path={`${match.path}/Dashboard`}>
				<CompanyDashboard />
			</RestrictedRoute>
			<RestrictedRoute path={`${match.path}/QuickInterview`}>
				{/* <Region> */}
					<QuickInterview />
				{/* </Region> */}
			</RestrictedRoute>
			<RestrictedRoute exact path={`${match.path}/ProfileList`}>
				<CompanyList />
			</RestrictedRoute>
			<RestrictedRoute path={`${match.path}/EditQuestion`}>
				<EditQuestion />
			</RestrictedRoute>
			<RestrictedRoute path={`${match.path}/ProfileList/:profileId`}>
				<CompanyDetails />
			</RestrictedRoute>
			
		</>
	);
};

export default connect(null, {})(withRouter(_intershipRoot));
