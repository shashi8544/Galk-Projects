import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Skillset from "./Skillset";
import { evaluateCurrentTab } from "../../reducers/CandidateSelector";
import { Steps, Progress, Spin, Row, Col } from "antd";

const Step = Steps.Step;

const ProfileProgressContainer = (props) => {
	const { tabAndProgress, userProfile, isDataLoading } = props;

	const { currentTab, tabProgress } = tabAndProgress;

	const [_currentTab, setCurrentTab] = useState(currentTab);
	const [_tabProgress, setTabProgress] = useState(tabProgress);

	const nextStep = () => {
		setCurrentTab(_currentTab + 1);

		const updatedProgress = Math.round(((_currentTab + 1) / 7) * 100);

		if (_tabProgress < updatedProgress) {
			setTabProgress(updatedProgress);
		}
	};

	const prevStep = () => {
		setCurrentTab(_currentTab - 1);
	};
	return (
		<React.Fragment>
			<Row gutter={[10, 20]}>
				<Col span={24}>
					<div style={{ display: "flex" }}>
						{<div className="page-header my-2">Complete your profile</div>}
						{/* {isDataLoading && (
							<Spin size="small" style={{ marginTop: 30, marginLeft: 20 }} />
						)} */}
					</div>
				</Col>
				<Col span={24}>
					<Progress percent={_tabProgress} />
				</Col>
			</Row>
			<Row gutter={10}>
				<Col span={6}>
					<Steps size="small" current={_currentTab} direction="vertical">
						<Step title="Step 1" description="About you" />
						<Step title="Step 2" description="Skillset" />
						<Step title="Step 3" description="Education" />
						<Step title="Step 4" description="Projects" />
						<Step title="Step 5" description="Certificates" />
						<Step title="Step 6" description="Personal interest" />
						<Step title="Step 7" description="IntroductionVideo" />
						<Step title="Final" description="Complete" />
					</Steps>
				</Col>
				<Col span={18}>
					<React.Fragment>
						{(() => {
							switch (_currentTab) {
								case 0:
									return (
										<Skillset
											nextStep={nextStep}
											prevStep={prevStep}
											userProfile={userProfile}
										/>
									);
								case 1:
									return (
										<Skillset
											nextStep={nextStep}
											prevStep={prevStep}
											userProfile={userProfile}
										/>
									);
								case 2:
									return (
										<Skillset
											nextStep={nextStep}
											prevStep={prevStep}
											userProfile={userProfile}
										/>
									);
								case 3:
									return (
										<Skillset
											nextStep={nextStep}
											prevStep={prevStep}
											userProfile={userProfile}
										/>
									);
								case 4:
									return (
										<Skillset
											nextStep={nextStep}
											prevStep={prevStep}
											userProfile={userProfile}
										/>
									);
								case 5:
									return (
										<Skillset
											nextStep={nextStep}
											prevStep={prevStep}
											userProfile={userProfile}
										/>
									);
								case 6:
									return (
										<Skillset
											nextStep={nextStep}
											prevStep={prevStep}
											userProfile={userProfile}
										/>
									);
								case 7:
									return (
										<Skillset
											nextStep={nextStep}
											prevStep={prevStep}
											userProfile={userProfile}
										/>
									);
								default:
									return null;
							}
						})()}
					</React.Fragment>
				</Col>
			</Row>
		</React.Fragment>
	);
};

const mapStateToProps = (state) => ({
	tabAndProgress: evaluateCurrentTab(state),
	isDataLoading: state.user.isLoading,
});

export default connect(mapStateToProps, {})(ProfileProgressContainer);
