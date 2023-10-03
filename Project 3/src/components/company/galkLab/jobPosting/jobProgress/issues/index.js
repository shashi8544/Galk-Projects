import React from "react";
import { connect } from "react-redux";
import Loading from "../../../../../common/loading";
import { Tabs, Empty } from "antd";
import OpenIssues from "./openIssues";
import ClosedIssues from "./closedIssues";

import "./style.css";

const { TabPane } = Tabs;
const Issues = ({ isLoading, companyId, repository, timelineControl }) => {
	return (
		<div className="galkLab_jobPosting_interviewPanel_container">
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
					className="galkLab_jobPosting_interviewPanel_tabPane"
				>
					<OpenIssues
						timelineControl={timelineControl}
						repository={repository}
					/>
				</TabPane>
				<TabPane
					tab="Closed"
					key="2"
					className="galkLab_jobPosting_interviewPanel_tabPane"
				>
					<ClosedIssues
						timelineControl={timelineControl}
						repository={repository}
					/>
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
