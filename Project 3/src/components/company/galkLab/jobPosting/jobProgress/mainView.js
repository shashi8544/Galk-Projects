import React, { useState } from "react";
import { connect } from "react-redux";
import Loading from "../../../../common/loading";
import { Tabs } from "antd";
import Issues from "./issues";
import Open from "./pulls/open";
import Pulls from "./pulls";
import Timeline from "./timeline";
import { resetTimeline } from "../../../../../actions/jobProgressActions";
import "./style.css";

const { TabPane } = Tabs;

const MainView = ({ isLoading, companyId, repository, resetTimeline }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedIssue, setSelectedIssue] = useState(null);
	const timelineControl = {
		isOpen,
		setIsOpen,
		selectedIssue,
		setSelectedIssue,
		resetTimeline,
	};
	return (
		<>
			<div className="galkLab_jobPosting_interviewPanel_container">
				{isLoading && <Loading size="large" />}
				<Tabs
					size="small"
					defaultActiveKey="1"
					centered={false}
					className="galkLab_jobPosting_interviewPanel_tabs"
				>
					<TabPane
						tab="Issues"
						key="1"
						className="galkLab_jobPosting_interviewPanel_tabPane"
					>
						<Issues timelineControl={timelineControl} repository={repository} />
					</TabPane>
					<TabPane
						tab="Pull requests"
						key="2"
						className="galkLab_jobPosting_interviewPanel_tabPane"
					>
						<Pulls timelineControl={timelineControl} repository={repository} />
					</TabPane>
				</Tabs>
			</div>
			{<Timeline thisModalControl={timelineControl} />}
		</>
	);
};

const mapStateToProps = (state) => ({
	companyId: state.company.companyToShow.id,
	isLoading: state.company.isInterviewPanelListLoading,
});

export default connect(mapStateToProps, { resetTimeline })(MainView);
