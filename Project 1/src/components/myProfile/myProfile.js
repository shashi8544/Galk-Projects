import React, { useEffect, useState } from "react";
import { Region } from "../common/layout/region";
import { connect, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import BasicInfo from "./basicInfo";
import Education from "./Education";
import Job from "./Job";
import Project from './Project/ProjectPublish/index'
import CertificateList from "./Certificate/certificateList";
import ExtraCurricular from './ExtraCurricular'

import { Card, Button, Tabs, Modal } from "antd";

const { TabPane } = Tabs;

const StudentProfileDetails = ({
    studentDetails,
}) => {
    return (

        <Card
            style={{
                height: "100%",
                width: "100%",
                overflowY: "auto",
            }}
        >
            {studentDetails && (
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Basic Information" key="1">
                        <BasicInfo student={studentDetails} />
                    </TabPane>
                    <TabPane tab="Education" key="2">
                        <Education student={studentDetails} />
                    </TabPane>
                    {studentDetails.status == "graduate" && 
                        <TabPane tab="Job" key="3">
                            <Job student={studentDetails} />
                        </TabPane>
                    }
                    <TabPane tab="Project" key="4">
                        <Project/>
                    </TabPane>
                    <TabPane tab="Certificate" key="5">
                        <CertificateList/>
                    </TabPane>
                    <TabPane tab="ExtraCurricular" key="6">
                        <ExtraCurricular/>
                    </TabPane>
                </Tabs>
            )}
        </Card>
    );
};

const mapStateToProps = (state) => ({
    studentDetails: state.firebase.profile,
});

export default connect(mapStateToProps, {})(withRouter(StudentProfileDetails));
