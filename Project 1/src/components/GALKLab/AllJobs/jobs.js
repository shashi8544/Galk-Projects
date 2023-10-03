import React from "react";
import { connect } from "react-redux";
import { Card, Modal, } from "antd";

import {
    EnvironmentOutlined,
    PaperClipOutlined,
    ExclamationCircleOutlined,
    CalendarFilled,
} from "@ant-design/icons";
import "./style.css";

const { confirm } = Modal;

const Jobs = ({
    jobDetails,
    index,
    editHandler,
}) => {
    const {
        title,
        attachmentURL,
        skills,
        optionalSkills,
        createDate,
        location,
        status,
        description,
        jobId,
    } = jobDetails;

    return (
        <Card
            className="internshipJob_card_cardRoot"
            size="small"
            type="inner"
            title={`#${index + 1} ${title}`}
            style={{ marginBottom: 15 }}
            extra={
                <div style={{ display: "flex" }}>

                    <span>

                    </span>

                </div>
            }
            actions={[

                <div style={{ display: "flex", justifyContent: "center" }} key={2}>
                    <PaperClipOutlined style={{ fontSize: 20, marginRight: 10 }} />
                    {attachmentURL ? (
                        <span>
                            <a href={attachmentURL} target="blank">
                                Has attachment
                            </a>
                        </span>
                    ) : (
                        <span>Not available</span>
                    )}
                </div>,
                <div style={{ display: "flex", justifyContent: "center" }} key={3}>
                    <EnvironmentOutlined style={{ fontSize: 20, marginRight: 10 }} />
                    <span>Location: {location || "Not available"} </span>
                </div>,
                <div style={{ display: "flex", justifyContent: "center" }} key={4}>
                    <span
                        className="internshipJob_card_createDate"
                        style={{ marginRight: 10 }}
                    >
                        Posted on:
                    </span>
                    {createDate}
                </div>,
            ]}
        >
            <>
                <div className="jobCard_title">Required technical skills:</div>
                {skills && skills.length > 0 ? (
                    <div className="internshipJob_card_skillRoot">
                        {skills.map((skill, i) => (
                            <div className="internshipJob_card_skill" key={i}>
                                {skill}
                            </div>
                        ))}
                    </div>
                ) : (
                    "No skills"
                )}
            </>
            {optionalSkills && optionalSkills.length > 0 && (
                <>
                    <div className="jobCard_title">Preferred technical skills:</div>
                    <div className="internshipJob_card_skillRoot">
                        {optionalSkills.map((skill, i) => (
                            <div className="internshipJob_card_skill" key={i}>
                                {skill}
                            </div>
                        ))}
                    </div>
                </>
            )}
            <div className="internshipJob_card_description">{description}</div>
        </Card>
    );
};

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps, {})(Jobs);
