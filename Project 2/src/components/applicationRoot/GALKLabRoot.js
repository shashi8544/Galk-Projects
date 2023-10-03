import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { Region } from "../common/layout/region";
import MatchedJobs from "../GALKLab/MatchedJobs";
import RestrictedRoute from "../common/RestrictedRoute";
import Moreinternship from "../GALKLab/MatchedJobs/AllJobs";
import IndividualCompany from "../GALKLab/MatchedJobs/individualCompany";

const GALKLabRoot = ({ match }) => {
	return (
		<>
			<RestrictedRoute path={`${match.path}/Jobs`}>
				<Region>
					<MatchedJobs />
				</Region>
			</RestrictedRoute>
			<RestrictedRoute path={`${match.path}/CompanyDetails/:companyName`}>
				<Region>
					<IndividualCompany />
				</Region>
			</RestrictedRoute>
			<RestrictedRoute path={`${match.path}/AllJobs/:companyName`}>
				<Region>
					<Moreinternship />
				</Region>
			</RestrictedRoute>
		</>
	);
};

export default connect(null, {})(withRouter(GALKLabRoot));
