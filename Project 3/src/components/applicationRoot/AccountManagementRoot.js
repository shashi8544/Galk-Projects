import React from "react";
import { Redirect, withRouter } from "react-router-dom";
import RestrictedRoute from "../../utils/components/RestrictedRoute";
import StudentImport from "../management/dataImport/studentProfileImport";
import GALKInfoContainer from "../management/GALKInformation";
import DataImport from "../management/dataImport";
import ChatPool from "../management/chatPool";
import EmailTemplate from "../management/emailManagement";
import TestDBSync from "../management/dbManagement";

const AccountSettingRoot = ({ match }) => {
	return (
		<>
			<Redirect
				exact
				// from={`${props.match.path}`}
				to={`${match.path}/GALKInformation`}
			/>
			<RestrictedRoute path={`${match.path}/GALKInformation`}>
				<GALKInfoContainer />
			</RestrictedRoute>
			<RestrictedRoute path={`${match.path}/DataImport`}>
				<DataImport />
			</RestrictedRoute>
			<RestrictedRoute path={`${match.path}/StudentImport`}>
				<StudentImport />
			</RestrictedRoute>
			<RestrictedRoute path={`${match.path}/CompanyImport`}>
				<div>Company import</div>
			</RestrictedRoute>
			<RestrictedRoute path={`${match.path}/EmailTemplate`}>
				<EmailTemplate />
			</RestrictedRoute>
			<RestrictedRoute path={`${match.path}/DBManagement`}>
				<TestDBSync />
			</RestrictedRoute>
		</>
	);
};

export default withRouter(AccountSettingRoot);
