import React from "react";
import HomeRoot from "./HomeRoot";
import RestrictedRoute from "../../utils/components/RestrictedRoute";
import { withRouter } from "react-router-dom";
import MentorRoot from "./MentorRoot";

const ApplicationRoot = ({ match, userType }) => {
	return (
		<>
			<RestrictedRoute exact path={`${match.path}`}>
				<HomeRoot userType={userType} />
			</RestrictedRoute>
		</>
	);
};

export default withRouter(ApplicationRoot);
