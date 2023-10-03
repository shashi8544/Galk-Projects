import React from "react";
import { Redirect, withRouter } from "react-router-dom";
import RestrictedRoute from "../common/RestrictedRoute";
import { Region } from "../common/layout/region";
import MyProfile from "../myProfile";
import { connect } from "react-redux";

const AccountSettingRoot = ({ match }) => {
	return (
		<>
			<Redirect exact to={`${match.path}/Myprofile`} />
			<RestrictedRoute path={`${match.path}/Myprofile`}>
				<Region>
					<MyProfile />
				</Region>
			</RestrictedRoute>
		</>
	);
};
const mapStateToProps = (state) => ({
	activeStep: state.profile.activeStep,
	userProfile: state.firebase.profile,
});
export default connect(mapStateToProps, {})(withRouter(AccountSettingRoot));
