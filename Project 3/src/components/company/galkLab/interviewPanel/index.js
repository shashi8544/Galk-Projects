import React, { useEffect } from "react";
import { connect } from "react-redux";
import GalkLab from "./galkLab.js";
import {
	getStudentListInInterviewPanel,
	getGalkLabStudentListInInterviewPanel,
} from "../../../../actions/companyActions";
import Loading from "../../../common/loading";
import "./style.css";


const InterviewPanel = ({
	isLoading,
	// companyId,
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
			{galkLabStudentList && (
				<GalkLab studentList={galkLabStudentList} />
			)}
		</div>
	);
};

const mapStateToProps = (state) => ({
	// companyId: state.company.companyToShow.id,
	isLoading: state.company.isInterviewPanelListLoading,
	thirdYearStudentList: state.company.interviewPanelThirdYearList,
	galkLabStudentList: state.company.interviewPanelGALKLabList,
});

export default connect(mapStateToProps, {
	getStudentListInInterviewPanel,
	getGalkLabStudentListInInterviewPanel,
})(InterviewPanel);
