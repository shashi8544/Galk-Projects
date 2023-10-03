import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { isLoaded } from "react-redux-firebase";
// import Profile from "./components/profile";
import RestrictedRoute from "./components/common/RestrictedRoute";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import PasswordResetForm from "./components/auth/PasswordResetForm";
import ApplicationLoading from "./components/common/ApplicationLoading";
import Landing from "./components/landing/landing";
// import HomePage from "./components/home";
// import Header from "./components/header";
import ApplicationRoot from "./components/applicationRoot";
import InternshipRoot from "./components/applicationRoot/internshipRoot";
import AccountSettingRoot from "./components/applicationRoot/AccountSettingRoot";
import GALKLabRoot from "./components/applicationRoot/GALKLabRoot";
import Layout from "./components/common/layout/applicationLayout";
// import { Button } from "antd";

import "./App.less";

function AuthIsLoaded({ children, userProfile }) {
	const auth = useSelector((state) => state.firebase.auth);
	if (!isLoaded(auth) || userProfile.isLoaded === false)
		return (
			<div
				style={{
					height: "100vh",
					display: "flex",
					alignItems: 'center',
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
						{/* <RestrictedRoute path="/HomePage">
							<HomePage />
						</RestrictedRoute> */}
						{/* <RestrictedRoute path="/Profile">
							<Profile/>
						</RestrictedRoute> */}
						{/* <RestrictedRoute path="/MyProfile">
							<MyProfile/>
						</RestrictedRoute> */}
						<RestrictedRoute path="/Internship">
							<InternshipRoot />
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
