import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

const homeContainer = (props) => {
	const { isAppLoading, isUserAuthenticated, user } = props;

	if (!isUserAuthenticated) {
		return <Redirect to="/" />;
	}
	if (user) {
		if (!user.profileCompletionStatus) {
			return <Redirect to="/Profile" />;
		}
	}
	return <div>HOME PAGE</div>;
};

const mapStateToProps = (state) => ({
	user: state.firebase.profile,
	isUserAuthenticated: state.firebase.auth.uid ? true : false,
	isAppLoading: state.app.isLoading,
});

export default connect(mapStateToProps, {})(homeContainer);
