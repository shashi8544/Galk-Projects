import React from "react";
import { isLoaded } from "react-redux-firebase";
import { connect, useSelector } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Landing from "./components/landing/landing";
import ApplicationRoot from "./components/applicationRoot";
import RestrictedRoute from "./components/common/RestrictedRoute";
import Layout from "./components/common/layout/applicationLayout";
import GALKLabRoot from "./components/applicationRoot/GALKLabRoot";
import PasswordResetForm from "./components/auth/PasswordResetForm";
import ApplicationLoading from "./components/common/ApplicationLoading";
import GALKRecruitRoot from "./components/applicationRoot/GALKRecruitRoot";
import AccountSettingRoot from "./components/applicationRoot/AccountSettingRoot";

import "./App.less";

function AuthIsLoaded({ children, userProfile }) {
	const auth = useSelector((state) => state.firebase.auth);
	if (!isLoaded(auth) || userProfile.isLoaded === false)
		return (
			<div
				style={{
					height: "100vh",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<ApplicationLoading />
			</div>
		);

	return children;
}

const App = ({ userProfile }) => {
	return (
		<BrowserRouter>
			<AuthIsLoaded userProfile={userProfile}>
				<Switch>
					<Route exact path="/" component={Landing} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/register" component={Register} />
					<Route exact path="/PasswordReset" component={PasswordResetForm} />
					<RestrictedRoute path="/Home">
						<ApplicationRoot />
					</RestrictedRoute>
					<Layout>
						<RestrictedRoute path="/GALKRecruit">
							<GALKRecruitRoot />
						</RestrictedRoute>
						<RestrictedRoute path="/GALKLab">
							<GALKLabRoot />
						</RestrictedRoute>
						<RestrictedRoute path="/AccountSetting">
							<AccountSettingRoot />
						</RestrictedRoute>
					</Layout>
				</Switch>
			</AuthIsLoaded>
		</BrowserRouter>
	);
};
const mapStateToProps = (state) => ({
	auth: state.firebase.auth,
	userProfile: state.firebase.profile,
});
export default connect(mapStateToProps, {})(App);
