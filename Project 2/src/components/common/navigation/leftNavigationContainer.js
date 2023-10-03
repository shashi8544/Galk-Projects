import React from "react";
import { connect } from "react-redux";
import { profileProgressSteps } from "../../../utils/constants";
import { graduateProfileProgressSteps } from "../../../utils/constants";
import { Divider, Space, Steps } from "antd";
import "./leftNavigationContainer.css";
import LeftTop from "./leftTop";
import LeftBottom from "./leftBottom";
const { Step } = Steps;

const LeftNavigationContainer = ({ activeStep, userProfile }) => {
	const jsxforProfileCompletion = (
		<Steps direction="vertical" current={activeStep - 1} size="small">
			{userProfile.status !== "graduate" &&
				profileProgressSteps.map((step, i) => (
					<Step
						key={`ProgressStep_${i}`}
						title={`Step ${step.step}`}
						description={step.title}
					/>
				))}

			{userProfile.status === "graduate" &&
				graduateProfileProgressSteps.map((step, i) => (
					<Step
						key={`ProgressStep_${i}`}
						title={`Step ${step.step}`}
						description={step.title}
					/>
				))}
		</Steps>
	);
	const leftPanelJsx = (
		<Space direction="vertical" style={{ width: "100%" }}>
			<LeftTop />
			<Divider style={{ border: "1px solid #000", margin: "16px 0 0 0" }} />
			<LeftBottom />
		</Space>
	);
	return (
		<div className="leftNav_container">
			{userProfile?.profileCompletionStatus
				? leftPanelJsx
				: jsxforProfileCompletion}
		</div>
	);
};

const mapStateToProps = (state) => ({
	activeStep: state.profile.activeStep,
	userProfile: state.firebase.profile,
});

export default connect(mapStateToProps, {})(LeftNavigationContainer);
