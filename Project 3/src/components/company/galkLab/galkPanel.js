import React from "react";
import GalkLabJobPostings from "./jobPosting";
import TaggedGalkLabStudents from "./taggedStudents"; // requires conversion
import StudentsPerformance from "./studentsPerformance"; // requires conversion
import ChatRoom from "./chatRoom"; // requires conversion

import { connect } from "react-redux";
import Loading from "../../common/loading";
import { Tabs, Empty } from "antd";
import "./style.css";

const { TabPane } = Tabs;
const GalkPanel = ({
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
                    <GalkLabJobPostings />
                </TabPane>
                <TabPane tab="Tagged students" key="2" className="interviewPanel_tabPane">
                    <TaggedGalkLabStudents />
                </TabPane>
                <TabPane tab="Students performance" key="3" className="interviewPanel_tabPane">
                    <StudentsPerformance />
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
})(GalkPanel);

