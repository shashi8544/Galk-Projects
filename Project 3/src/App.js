import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import { isLoaded, isEmpty } from "react-redux-firebase";

import LandingPage from "./components/landing";
import PublicHeader from "./components/header/publicHeader";
import RestrictedRoute from "./utils/components/RestrictedRoute";
import Layout from "./components/common/layout/applicationLayout";
import SignInForm from "./components/auth/SignInForm";

import ApplicationRoot from "./components/applicationRoot";
import CompanyRoot from "./components/applicationRoot/companyRoot";
import StudentRoot from "./components/applicationRoot/studentRoot";
import AccountManagementRoot from "./components/applicationRoot/AccountManagementRoot";
import MentorRoot from "./components/applicationRoot/MentorRoot";
import { setUserType } from "./actions/authActions";
import { CompanyAccountType } from "./utils/constants";

import "./App.less";

const App = ({ auth, userType, setUserType }) => {
	useEffect(() => {
		if (!userType && auth.isLoaded && !auth.isEmpty) {
			setUserType(auth.uid);
		}
	}, [userType, auth]);

	if (auth.isLoaded) {
		return (
			<BrowserRouter>
				{!(isLoaded(auth) && !isEmpty(auth)) && <PublicHeader />}
				<Switch>
					<Route exact path="/" component={LandingPage} />
					<Route path="/SignIn" component={SignInForm} />
					<RestrictedRoute path="/Home">
						<ApplicationRoot userType={userType} />
					</RestrictedRoute>
					<Layout>
						{userType === CompanyAccountType.GALKAdmin && (
							<>
								<RestrictedRoute path="/Company">
									<CompanyRoot />
								</RestrictedRoute>
								<RestrictedRoute path="/Student">
									<StudentRoot />
								</RestrictedRoute>
								<RestrictedRoute path="/Management">
									<AccountManagementRoot />
								</RestrictedRoute>
							</>
						)}
						{userType === CompanyAccountType.Mentor && (
							<RestrictedRoute path="/Mentor">
								<MentorRoot />
							</RestrictedRoute>
						)}
					</Layout>
				</Switch>
			</BrowserRouter>
		);
	}
	return null;
};

const mapStateToProps = (state) => ({
	auth: state.firebase.auth,
	userType: state.auth.loggedInUserType,
});

export default compose(
	firebaseConnect(),
	connect(mapStateToProps, { setUserType })
)(App);
