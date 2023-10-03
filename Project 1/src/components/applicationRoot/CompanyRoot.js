import React from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import RestrictedRoute from "../common/RestrictedRoute";
import AllJobs from "../Company/Alljobs";
import { Region } from "../common/layout/region";
const _intershipRoot = ({ match }) => {
	return (
		<>
			<RestrictedRoute path={`${match.path}/Jobs`}>Jobs
			<Region>
					<AllJobs />
				</Region>
			</RestrictedRoute>
		</>
	);
};

export default connect(null, {})(withRouter(_CompanyRoot));
