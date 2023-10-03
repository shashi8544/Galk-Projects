import React from "react";
import InternshipJobPostings from "./jobPosting";
import TaggedThirdYearStudents from "./taggedStudents";
import InterviewPanel from "./interviewPanel";
import ChatRoom from "./chatRoom";

import { connect } from "react-redux";
import Loading from "../common/loading";
import { Tabs, Empty } from "antd";
import "./style.css";

const { TabPane } = Tabs;
const InternshipPanel = ({
    isLoading,
    companyId,
}) => {
    return (
        <div className="interviewPanel-container">
            {isLoading && <Loading size="large" />}
            <Tabs
                size="small"
                defaultActiveKey="1"
                centered
                className="interviewPanel_tabs"
            >
                <TabPane tab="Job postings" key="1" className="interviewPanel_tabPane">
                    <InternshipJobPostings />
                </TabPane>
                <TabPane tab="Tagged students" key="2" className="interviewPanel_tabPane">
                    <TaggedThirdYearStudents />
                </TabPane>
                <TabPane tab="Interview Panel" key="3" className="interviewPanel_tabPane">
                    <InterviewPanel />
                </TabPane>
                <TabPane tab="Chat Room" key="4" className="interviewPanel_tabPane">
                    <ChatRoom companyId={companyId} />
                </TabPane>
                <TabPane tab="Activity Log" key="5" className="interviewPanel_tabPane">
                    <Empty />
                </TabPane>
            </Tabs>
        </div>
    );
};

const mapStateToProps = (state) => ({
    companyId: state.company.companyToShow.id,
    isLoading: state.company.isInterviewPanelListLoading,
});

export default connect(mapStateToProps, {
})(InternshipPanel);

