import React from "react";
import { Select } from "antd";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { ApplicationModule } from "../../../utils/models/applicationModules";
import { setApplicationModule } from "../../../actions/appActions";
import { CompanyAccountType } from "../../../utils/constants";
import "./leftTop.css";

const { Option } = Select;

const LeftTop = ({ appModule, setApplicationModule, history, userType }) => {
	const handleModuleChange = (value) => {
		if (value === ApplicationModule.Company) {
			setApplicationModule(ApplicationModule.Company);
			history.push("/Company/Dashboard");
		} else if (value === ApplicationModule.Student) {
			setApplicationModule(ApplicationModule.Student);
			history.push("/Student/Dashboard");
		} else if (value === ApplicationModule.AccountManagement) {
			setApplicationModule(ApplicationModule.AccountManagement);
			history.push("/Management/GALKNews");
		} else if (value === ApplicationModule.GalkLabMentor) {
			setApplicationModule(ApplicationModule.GalkLabMentor);
			history.push("/Mentor/Dashboard");
		}
	};

	return (
		<div
			style={{
				width: "100%",
				textAlign: "center",
				marginTop: 20,
			}}
		>
			<Select
				value={appModule}
				onChange={handleModuleChange}
				className="appModule_dropdown_root"
			>
				{userType === CompanyAccountType.GALKAdmin && (
					<>
						<Option
							value={ApplicationModule.Company}
							className="appModule_dropdown_option"
						>
							Company
						</Option>
						<Option
							value={ApplicationModule.Student}
							className="appModule_dropdown_option"
						>
							Student
						</Option>
						<Option
							value={ApplicationModule.AccountManagement}
							className="appModule_dropdown_option"
						>
							Account Management
						</Option>
					</>
				)}
				{userType === CompanyAccountType.Mentor && (
					<Option
						value={ApplicationModule.GalkLabMentor}
						className="appModule_dropdown_option"
					>
						GALK Mentor
					</Option>
				)}
			</Select>
		</div>
	);
};

const mapStateToProps = (state) => ({
	appModule: state.app.appModule,
	userType: state.auth.loggedInUserType,
});

export default connect(mapStateToProps, { setApplicationModule })(
	withRouter(LeftTop)
);
