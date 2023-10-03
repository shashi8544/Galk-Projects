import React from "react";
import { Redirect } from "react-router-dom";
import commingSoonURL from "../../assets/images/commingSoon.png";

import newsIcon from "../../assets/images/NewsIcon.png";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import { Row, Col, Space } from "antd";
import "./style.css";

const LandingPage = ({ auth }) => {
	if (auth.uid) {
		return <Redirect to="/Home" />;
	}
	return null;
};

const mapStateToProps = (state) => ({
	auth: state.firebase.auth,
});

export default compose(
	firebaseConnect(),
	connect(mapStateToProps)
)(LandingPage);
