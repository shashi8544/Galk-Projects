import React from "react";
import { connect } from "react-redux";

import ProfileInProgress from "./profileInProgress";
import ProfilePublished from "./profilePublished";

const MyProfile = ({ userProfile }) => {
	if (userProfile?.profileCompletionStatus === false)
		return <ProfileInProgress />;
	else return <ProfilePublished />;
};

const mapStateToProps = (state) => ({
	userProfile: state.firebase.profile,
});

export default connect(mapStateToProps, {})(MyProfile);
