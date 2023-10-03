import "./index.css";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getAllJobs } from "../../../actions/galkLabActions";
import Loading from "../../common/ApplicationLoading";
import { Card, Modal, Spin } from "antd";
import "./style.css";
import { getJobListLoadingStatus } from "../../../reducers/galkLabJobSelector";
import { getConfidentProjects } from "../../../actions/galkLabActions";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import ResultNotFound from "../../common/ResultNotFound";
import Records from "./record.json";

// const { Panel } = Collapse;
const steps = [
  "Select maxmam 5 project which you have confidence or experience",
  "Select maxmam 5 project which you have confidence or experience",
  "Under selecting for interview by company",
  "Shortlisted for interview by company",
];

const SecondarySelection1 = (props) => {
  const { getConfidentProjects,  user, isLoading, jobPostings } = props;

  useEffect(() => {
    if (user) getConfidentProjects(user?.id);
  }, [user, getConfidentProjects]);
  const [isLiked, setIsLiked] = useState({});

  const onLikeButtonClick = (itemId) => {
    setIsLiked((prevState) => ({
      ...prevState,
      [itemId]: !prevState[itemId],
    }));
  };
  const [showMore, setShowMore] = useState({});
  const getText = (description, itemId) => {
    if (description && description.length > 0 && showMore[itemId]) {
      return (
        <div style={{ marginTop: "25px" }}>
          <p
            style={{
              fontFamily: "Roboto, sans-serif",
              size: "24px",
              fontWeight: "700",
              marginBottom: "5px",
            }}
          >
            Internship Description
          </p>
          <p>{description}</p>
          <div className="description_button">
            <button
              style={{
                border: "none",
                background: "none",
                cursor: "pointer",
                color: "blue",
              }}
              onClick={() => setShowMore({ ...showMore, [itemId]: false })}
            >
              Close
            </button>
          </div>
        </div>
      );
    } else if (description && description.length > 0) {
      return (
        <>
          <p>{description.slice(0, 0)}</p>
          <div className="description_button">
            <button
              style={{
                border: "none",
                background: "none",
                cursor: "pointer",
                color: "blue",
              }}
              onClick={() => setShowMore({ ...showMore, [itemId]: true })}
            >
              See more detail
            </button>
          </div>
        </>
      );
    } else {
      return null; // Handle the case when description is undefined or an empty string
    }
  };

  const mystyle = {
    width: "327px",
    height: "8px",
    left: "286px",
    top: "224px",
    marginBottom: "32px",
    fontFamily: "Roboto, sans-serif",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: "24px",
    lineHeight: "28px",

    color: "#212121",
  };
  const newstyle = {
    // position: absolute;
    width: "887px",
    height: "20px",
    left: "286px",
    top: "264px",
    // marginBottom: "20px",
    fontFamily: "Roboto, sans-serif",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "160%",
    color: "#212121",
  };
  const ellipse = {
    boxSizing: "border-box",
    width: "25px",
    height: "25px",
    left: "286px",
    top: "297px",

    background: "#FFFFFF",

    border: "0.5px solid #E0E0E0",
  };
  const loadingJsx = (
    <div className="your-assignment-loading">
      <Spin size="large" />
    </div>
  );
  const resultNotFound = (
    <div className="your-assignment-noresult">
      <ResultNotFound infoText="Currently there is no GALK LAB project" />
    </div>
  );
  return (
    <>
      {!isLoading && jobPostings?.length === 0 ? resultNotFound : null}
      {isLoading || !jobPostings ? (
        loadingJsx
      ) : (
        <div className="big-box">
          <div className="match-job">Secondary selection</div>
          <p className="notify">
            There are 3 steps to be shortlisted for interview by company{" "}
          </p>
          <Box sx={{ width: "100%" }}>
            <Stepper activeStep={1} alternativeLabel>
              {steps.map((label, index) => (
                <Step key={index}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
          <div className="my-div">
            <div className="text-1">It takes 2 to 30 days.</div>
            <br />
            <div className="text-2">
              the projects you selected will be shortlisted by willings.
            </div>
          </div>

          <div className="my-div-1">
            <div className="text-3">
              The projects you have selected are below.
            </div>
          </div>
          <>
            {isLoading || !jobPostings ? null : (
              <>
                {jobPostings && jobPostings.length > 0 && (
                  <>
                    {jobPostings.map((item, index) => (
                      <Card
                        className="internshipJob_card_cardRoot"
                        size="small"
                        type="inner"
                        key={index}
                        title={
                          <>
                            <div>
                              <p style={mystyle}>{item.title}</p>
                              <div className="company_confidence">
                                <div className="company-address">
                                  <p style={newstyle}>
                                    {item.description}
                                  </p>
                                </div>
                                <div className="likes">
                                  <span
                                    onClick={() => onLikeButtonClick(item.jobId)}
                                  >
                                    {isLiked[item.jobId] ? (
                                      <i
                                        style={{
                                          fontSize: "18px",
                                          color: "blue",
                                        }}
                                        className="fa fa-thumbs-up"
                                      ></i>
                                    ) : (
                                      <i
                                        style={{ fontSize: "18px" }}
                                        className="fa fa-thumbs-up"
                                      ></i>
                                    )}
                                    <div
                                      className={`text-dark ${
                                        isLiked[item.jobId] ? "text-primary" : ""
                                      }`}
                                      style={{
                                        display: "inline",
                                        marginLeft: "5px",
                                      }}
                                    >
                                      Confidence
                                    </div>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </>
                        }
                        style={{ marginBottom: 15 }}
                        extra={
                          <div style={{ display: "flex" }}>
                            <span></span>
                          </div>
                        }
                      >
                        <>
                          <div className="jobCard_title">
                            Required technical skills:
                          </div>
                          {item.skills && item.skills.length > 0 ? (
                            <div className="internshipJob_card_skillRoot">
                              {item.skills.map((skill, i) => (
                                <div
                                  style={{
                                    color: "#FFFFFF",
                                    background: "#8B97A5",
                                    marginTop: "-5px",
                                    marginBottom: "0px",
                                  }}
                                  className="internshipJob_card_skill"
                                  key={i}
                                >
                                  {skill}
                                </div>
                              ))}
                            </div>
                          ) : (
                            "No skills"
                          )}
                        </>

                        <div
                          className="internshipJob_card_description"
                          style={{ color: "black" }}
                        >
                          {getText(item.description, item.jobId)}
                        </div>
                      </Card>
                    ))}
                  </>
                )}
              </>
            )}
          </>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  jobPostings: state.galkLab.confidentProjectsList,
  user: state.firebase.profile,
  isUserAuthenticated: state.firebase.auth.uid ? true : false,
  isLoading: getJobListLoadingStatus(state),
});

export default connect(mapStateToProps, {
  getAllJobs,
  getConfidentProjects
})(SecondarySelection1);
