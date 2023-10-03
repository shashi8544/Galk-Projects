import './index.css'
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getAllJobs } from "../../../actions/galkLabActions";
import Loading from "../../common/ApplicationLoading";
import Jobs from "./jobs";
import { getJobListLoadingStatus } from "../../../reducers/galkLabJobSelector";
import { Card, Collapse, Descriptions, Avatar, Spin, Row, Col, Empty } from "antd";
import ResultNotFound from '../../common/ResultNotFound';


const { Panel } = Collapse;

const YourAssignments = (props) => {
    const [attendanceModuleIsOpen, setAttendanceModuleIsOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null)
    const {
        getAllJobs,
        isUserAuthenticated,
        user,
        isLoading,
        jobPostings,
    } = props;

    useEffect(() => {
        if (user) getAllJobs();
    }, [user, getAllJobs]);

    // if (!isUserAuthenticated) {
    //   return <Redirect to="/" />;
    // }
    const loadingJsx = <div className='your-assignment-loading'>
        <Spin size='large' />
    </div>
    const resultNotFound = <div className='your-assignment-noresult'>
        <ResultNotFound infoText="Currently there is no GALK LAB project" />
    </div >
    if (!user.profileCompletionStatus) {
        return <Redirect to="/Profile" />;
    }

    return (
        <>
            {(!isLoading && jobPostings?.length == 0) ? resultNotFound : null}
            {(isLoading || !jobPostings) ? loadingJsx :
                <section className="your-assignment-container">
                    {jobPostings && jobPostings.length > 0 && (
                        <div className="your-assignment-page-header">
                            All ongoing GALK Lab projects:
                        </div>
                    )}
                    {(isLoading || !jobPostings) ? (
                        null
                    ) : (
                        <>
                            {jobPostings && jobPostings.length > 0 && (
                                <>
                                    {jobPostings.map(({ meta, jobs }, i) => (
                                        <Card key={i}>
                                            <Descriptions
                                                title={
                                                    <>
                                                        <Avatar
                                                            size={40}
                                                            src={meta.companyLogo}
                                                            style={{ marginRight: 10 }}
                                                        />
                                                        <span>
                                                            {meta.companyNameInEnglish
                                                                ? `${meta.companyName} / ${meta.companyNameInEnglish}`
                                                                : meta.companyName}
                                                        </span>
                                                    </>
                                                }
                                            >
                                                <Descriptions.Item label="Industry">
                                                    {meta.companyIndustry}
                                                </Descriptions.Item>
                                                {meta.companyWebsite && (
                                                    <Descriptions.Item label="Website">
                                                        <a rel='noreferrer' href={meta.companyWebsite} target="_blank">
                                                            {meta.companyWebsite}
                                                        </a>
                                                    </Descriptions.Item>
                                                )}
                                            </Descriptions>
                                            <Collapse accordion>
                                                <Panel header={`Expand to see job details`} key="1">
                                                    <Card type="inner">
                                                        <Row>
                                                            {jobs && jobs.length < 1 && (
                                                                <Col
                                                                    span={24}
                                                                    style={{
                                                                        display: "flex",
                                                                        flexDirection: "column",
                                                                        justifyContent: "center",
                                                                    }}
                                                                >
                                                                    <Empty />
                                                                </Col>
                                                            )}
                                                            {jobs &&
                                                                jobs
                                                                    .filter((job) => job.status !== "archived")
                                                                    .map((item, i) => (
                                                                        <Col key={i} span={24}>
                                                                            <Jobs
                                                                                jobDetails={item}
                                                                                index={i}
                                                                                setAttendanceModuleIsOpen={setAttendanceModuleIsOpen}
                                                                                setSelectedJob={setSelectedJob}
                                                                            />
                                                                        </Col>
                                                                    ))}
                                                        </Row>
                                                    </Card>
                                                </Panel>
                                            </Collapse>
                                        </Card>
                                    ))}

                                </>
                            )}
                        </>
                    )}
                </section>}
        </>
    );
};

const mapStateToProps = (state) => ({
    jobPostings: state.galkLab.allJobList,
    user: state.firebase.profile,
    isUserAuthenticated: state.firebase.auth.uid ? true : false,
    isLoading: getJobListLoadingStatus(state),
});

export default connect(mapStateToProps, {
    getAllJobs,
})(YourAssignments);
