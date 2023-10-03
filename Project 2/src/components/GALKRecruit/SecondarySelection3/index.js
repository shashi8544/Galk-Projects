import "./index.css";
import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getAllJobs } from "../../../actions/galkLabActions";
import Loading from "../../common/ApplicationLoading";
import { Card, Modal,Spin} from "antd";
import "./style.css";
import { getJobListLoadingStatus } from "../../../reducers/galkLabJobSelector";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import ResultNotFound from "../../common/ResultNotFound";
import { getShortlistedProjectsByCompany } from "../../../actions/galkLabActions";
import Records from "./record.json";
import Layer_1 from "./images/Layer_1.png";
import InterviewPopup from "./popup";
import Schedule from "./schedule.json";
import img2 from "./images/Group 562.png";
import img1 from "./images/location.png";
const interviewDate = Schedule.interview.date;
const interviewTime = Schedule.interview.time;
const zoomLink = Schedule.interview.zoom_link;
const steps = [
  "Select maxmam 5 project which you have confidence or experience",
  "Select maxmam 5 project which you have confidence or experience",
  "Under selecting for interview by company",
  "Shortlisted for interview by company",
];


const SecondarySelection3 = (props) => {
  const { getShortlistedProjectsByCompany, user, isLoading, jobPostings } =
    props;
  useEffect(() => {
    if (user) getShortlistedProjectsByCompany(user?.id);
  }, [user, getShortlistedProjectsByCompany]);
  const [showMore, setShowMore] = useState({});
  const getText = (description, itemId) => {
    if (description.length > 0 && showMore[itemId]) {
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
    } else if (description.length > 0) {
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
            You can notify the company that you are interested through clicking
            the like button.
          </p>
          <Box sx={{ width: "100%" }}>
            <Stepper activeStep={3} alternativeLabel>
              {steps.map((label, index) => (
                <Step key={index}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
          <div>
            <h1>Interview Scheduler</h1>
            <InterviewPopup date={interviewDate} time={interviewTime} />
          </div>
          <div className="img-hand">
            <img src={Layer_1} alt="Group-1" border="0" />
          </div>

          <div className="my-div-1">
            <div className="text-3">
              You are shortlisted for interview by the company of this project.
            </div>
            <br></br>
            <div className="text-7">
              You can see the company profile through clicking company’s name or
              logo.
            </div>
          </div>

          <div className="my-div">
            <div className="text-6">Below is the flow until the interview</div>
            <br></br>
            <ul>
              <li>
                <div className="text-1">
                  You will get the date and time of interview from willings on
                  this Galk portal.
                </div>
                <div className="text-2">
                  So please check this Galk potal carefully.
                </div>
              </li>
              <li>
                <div className="text-4">
                  After you confirmed the date and time of interview, please
                  click “approve” button.
                </div>
                <div className="text-5">
                  So you can proceed the interview properly.{" "}
                </div>
              </li>
            </ul>
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
                        key = {index}
                        type="inner"
                        title={
                          <>
                            <div>
                              <p style={mystyle}>{item.title}</p>
                              <div className="company_confidence">
                                <div className="company-address">
                                  <p style={newstyle}>
                                    {item.shortDescription}
                                  </p>
                                </div>
                              </div>
                              <div className="name-location">
                                <div className="address">
                                  <img
                                    style={{ paddingRight: "6px" }}
                                    src={img2}
                                    alt=""
                                  />
                                  <Link
                                    style={{ color: "#696969" }}
                                    to={`/GALKRecruit/CompanyDetails`}
                                  >
                                    {item.Industry}
                                  </Link>

                                  <img
                                    className="spacing"
                                    style={{ height: "18px" }}
                                    src={img1}
                                    alt=""
                                  />
                                  {item.location}
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
  jobPostings: state.galkLab.shortlistedProjectsByCompanyList,
  user: state.firebase.profile,
  isUserAuthenticated: state.firebase.auth.uid ? true : false,
  isLoading: getJobListLoadingStatus(state),
});

export default connect(mapStateToProps, {
  getAllJobs,
  getShortlistedProjectsByCompany
})(SecondarySelection3);
