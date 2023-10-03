import React from "react";
import { connect } from "react-redux";
import ProfileProgressContainer from "./profileProgressContainer";
import StudentProfileDetails from './myProfile'
const MyProfile = ({ userProfile, firebase }) => {
	if (userProfile?.profileCompletionStatus === false)
		return <ProfileProgressContainer />
	return (
		<StudentProfileDetails />
	);
};
const mapStateToProps = (state) => ({
	userProfile: state.firebase.profile,
	firebase: state.firebase
});
export default connect(mapStateToProps, {})(MyProfile);
