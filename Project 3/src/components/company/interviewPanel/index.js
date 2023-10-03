import React, { useEffect } from "react";
import { connect } from "react-redux";
import ThirdYear from "./thirdYear";
import GalkLab from "./galkLab.js";
import {
	getStudentListInInterviewPanel,
	getGalkLabStudentListInInterviewPanel,
} from "../../../actions/companyActions";
import Loading from "../../common/loading";
import { Tabs } from "antd";
import "./style.css";

const { TabPane } = Tabs;

const InterviewPanel = ({
	isLoading,
	companyId,
	thirdYearStudentList,
	galkLabStudentList,
	getStudentListInInterviewPanel,
	getGalkLabStudentListInInterviewPanel,
}) => {
	useEffect(() => {
		getStudentListInInterviewPanel();
		getGalkLabStudentListInInterviewPanel();
	}, []);

	return (
		<div>
			{isLoading && <Loading size="large" />}
			{!isLoading && thirdYearStudentList && (
				<ThirdYear studentList={thirdYearStudentList} />
			)}
			{/* {galkLabStudentList && (
				<GalkLab studentList={galkLabStudentList} />
			)} */}
			{/* /* <Tabs
				size="large"
				type="card"
				defaultActiveKey="1"
				centered
				className="interviewPanel_tabs"
			>
				<TabPane tab="Internship" key="1" className="interviewPanel_tabPane">
					{thirdYearStudentList && (
						<ThirdYear studentList={thirdYearStudentList} />
					)}
				</TabPane>
				{/* <TabPane tab="GALK Lab" key="2" className="interviewPanel_tabPane">
						{galkLabStudentList && (
							<GalkLab studentList={galkLabStudentList} />
						)}
					</TabPane>
				</Tabs> */}
		</div>
	);
};

const mapStateToProps = (state) => ({
	companyId: state.company.companyToShow.id,
	isLoading: state.company.isInterviewPanelListLoading,
	thirdYearStudentList: state.company.interviewPanelThirdYearList,
	galkLabStudentList: state.company.interviewPanelGALKLabList,
});

export default connect(mapStateToProps, {
	getStudentListInInterviewPanel,
	getGalkLabStudentListInInterviewPanel,
})(InterviewPanel);
