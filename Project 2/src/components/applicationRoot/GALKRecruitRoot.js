import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { Region } from "../common/layout/region";
import RestrictedRoute from "../common/RestrictedRoute";
import ScreeningForm from "../GALKRecruit/ScreeningForm";
import SecondarySelection from "../GALKRecruit/SecondarySelection";
import SecondarySelection1 from "../GALKRecruit/SecondarySelection1";
import SecondarySelection2 from "../GALKRecruit/SecondarySelection2";
import SecondarySelection3 from "../GALKRecruit/SecondarySelection3";
import SecondarySelection4 from "../GALKRecruit/SecondarySelection4";
import SecondarySelection6 from "../GALKRecruit/SecondarySelection6";
import IndividualCompany from "../GALKRecruit/companyDetails";

const GALKRecruitRoot = ({ match }) => {
	return (
		<>
			<RestrictedRoute path={`${match.path}/ScreeningForm`}>
				<Region>
					<ScreeningForm />
				</Region>
			</RestrictedRoute>
			<RestrictedRoute path={`${match.path}/SecondarySelection`}>
				<Region>
					<SecondarySelection />
				</Region>
			</RestrictedRoute>
			<RestrictedRoute path={`${match.path}/SecondarySelection1`}>
				<Region>
					<SecondarySelection1 />
				</Region>
			</RestrictedRoute>
			<RestrictedRoute path={`${match.path}/SecondarySelection2`}>
				<Region>
					<SecondarySelection2 />
				</Region>
			</RestrictedRoute>
			<RestrictedRoute path={`${match.path}/SecondarySelection3`}>
				<Region>
					<SecondarySelection3 />
				</Region>
			</RestrictedRoute>
			<RestrictedRoute path={`${match.path}/SecondarySelection4`}>
				<Region>
					<SecondarySelection4 />
				</Region>
			</RestrictedRoute>
			<RestrictedRoute path={`${match.path}/SecondarySelection6`}>
				<Region>
					<SecondarySelection6 />
				</Region>
			</RestrictedRoute>
			<RestrictedRoute path={`${match.path}/CompanyDetails`}>
                <Region>
                    <IndividualCompany/>
                </Region>
            </RestrictedRoute>
		</>
	);
};

export default connect(null, {})(withRouter(GALKRecruitRoot));