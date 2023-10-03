import React from "react";
import { connect } from "react-redux";
import Loading from "../../../../../common/loading";
import { Tabs, Empty } from "antd";
import "./style.css";
import Open from "./open";
import Closed from "./closed";

const { TabPane } = Tabs;
const Issues = ({ isLoading, companyId, repository, timelineControl }) => {
	return (
		<div className="galkLab_jobpostings_pulls_interviewPanel_container">
			{isLoading && <Loading size="large" />}
			<Tabs
				size="small"
				defaultActiveKey="1"
				centered
				className="interviewPanel_tabs"
				style={{ height: "100%" }}
			>
				<TabPane
					tab="Open"
					key="1"
					className="galkLab_jobPosting_pulls_interviewPanel_tabPane"
				>
					<Open timelineControl={timelineControl} repository={repository} />
				</TabPane>
				<TabPane
					tab="Closed"
					key="2"
					className="galkLab_jobPosting_pulls_interviewPanel_tabPane"
				>
					<Closed timelineControl={timelineControl} repository={repository} />
				</TabPane>
			</Tabs>
		</div>
	);
};

const mapStateToProps = (state) => ({
	companyId: state.company.companyToShow.id,
	isLoading: state.company.isInterviewPanelListLoading,
});

export default connect(mapStateToProps, {})(Issues);
