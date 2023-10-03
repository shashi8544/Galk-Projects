import React from "react";
import HomeRoot from "./HomeRoot";
import RestrictedRoute from "../common/RestrictedRoute";
import { withRouter } from "react-router-dom";

const ApplicationRoot = ({ match }) => {
	return (
		<>
			<RestrictedRoute exact path={`${match.path}`}>
				<HomeRoot />
			</RestrictedRoute>
		</>
	);
};

export default withRouter(ApplicationRoot);
