import React from "react";
import { Avatar, Typography, Select } from "antd";
import { BankOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { ApplicationModule } from "../../../utils/models/applicationModules";
import { setApplicationModule } from "../../../actions/appActions";
import "./leftTop.css";

const { Title, Text } = Typography;
const { Option } = Select;

const LeftTop = ({ userProfile, appModule, setApplicationModule, history }) => {
	const { logo, name, branchName, collegeName, img } = userProfile;

	const handleModuleChange = (value) => {
		if (value === ApplicationModule.GALKRecruit) {
			setApplicationModule(ApplicationModule.GALKRecruit);
			history.push("/GALKRecruit/ScreeningForm");
		} else if (value === ApplicationModule.GALKLab) {
			setApplicationModule(ApplicationModule.GALKLab);
			history.push("/GALKLab/Jobs");
		} else if (value === ApplicationModule.AccountSetting) {
			setApplicationModule(ApplicationModule.AccountSetting);
			history.push("/AccountSetting/Myprofile");
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
			<Avatar
				style={{ backgroundColor: "#083b6e", marginBottom: 10 }}
				shape="square"
				size={70}
				icon={!logo && <BankOutlined />}
				src={img || logo}
			/>
			<Title level={4} style={{ color: "#f2f2f2" }}>
				{name}
			</Title>
			<Text type="secondary" style={{ color: "#f3f3f3" }}>
				{`${branchName} & ${collegeName}`}
			</Text>
			<Select
				value={appModule}
				onChange={handleModuleChange}
				className="appModule_dropdown_root"
			>
				<Option
					value={ApplicationModule.GALKRecruit}
					className="appModule_dropdown_option"
				>
					{"GALK Recruit"}
				</Option>
				<Option
					value={ApplicationModule.GALKLab}
					className="appModule_dropdown_option"
				>
					{"GALK Lab"}
				</Option>
				<Option
					value={ApplicationModule.AccountSetting}
					className="appModule_dropdown_option"
				>
					{"Account Setting"}
				</Option>
			</Select>
		</div>
	);
};

const mapStateToProps = (state) => ({
	userProfile: state.firebase.profile,
	appModule: state.app.appModule,
});

export default connect(mapStateToProps, { setApplicationModule })(
	withRouter(LeftTop)
);
