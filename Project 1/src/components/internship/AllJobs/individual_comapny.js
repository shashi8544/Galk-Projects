
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { getAllJobs } from "../../../actions/galkLabActions";
import { BrowserRouter, Link } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { defaultCompanyLogoURL, defaultCompanyCoverPhoto } from "../../../utils/constants";
import { EnvironmentOutlined, GlobalOutlined, LineHeightOutlined } from "@ant-design/icons";
import { getJobListLoadingStatus } from "../../../reducers/galkLabJobSelector";
import {
    Card,
    Collapse,
    Descriptions,
    Avatar,
    Button,
    Spin,
    Divider,
    Row,
    Col,
    Empty,
} from "antd";
import "./style.css";
import "./individual_company.css"
import Moreinternship from "./moreinternship";

import React,{ useEffect, useState } from "react";
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

const Individual_companty = ({
    jobDetails,
    internshipDetails,
    companyDetails,
    index,
    editHandler,
}) => {
    const {
        title,
        companyaddress,
        attachmentURL,
        skills,
        companyimage,
        numberofemployee,
        numberofinternshipposted,
        aboutcomp,
        commentfrmus,
        attachmentURL,
        skills,
        optionalSkills,
        createDate,
        location,
        status,
        description,
        industry,
        jobId,
        icon,
        compvision,
        companypolicy,
        companyculture,
        numberOfLikes,
        isfollowing
    } = jobDetails;
    //adding like button feature.
    const [like, setLike] = useState(numberOfLikes),
    [isLiked, setIsLiked] = useState(false),
    const [follow, setfollow] = useState(isfollowing);
    const [isfollow, setIsFollowed] = useState(false);
    const [showStudentView, setShowStudentView] = useState(false),
        onfollowButtonClick = () => {
            setfollow(isfollow ? "Follow" : "Following");
            setIsFollowed(!isfollow);
        }
    onLikeButtonClick = () => {
        setLike(like+(isLiked ? -1 : 1));
        setIsLiked(!isLiked);
    }
    //adding show more feature
    const [showMore, setShowMore] = useState(false);
    const getText = () => {
        // For Text that is shorter than desired length
        if (description.length <= 258) return description;
        // If text is longer than desired length & showMore is true
        if (description.length > 258 && showMore) {
            return (
                <>
                    <p>{description}</p>

                    <button
                        onClick={() => setShowMore(false)}>
                        Show Less
                    </button>
                </>
            );
        }
        // If text is longer than desired length & showMore is false
        if (description.length > 258) {
            return (
                <>
                    <p>{description.slice(0, 258)}</p>

                    <button
                        onClick={() => setShowMore(true)}>
                        Show Full Description
                    </button>
                </>
            );
        }
    };
    return (
        
        <Card>
        
            <div className="forback">
                <Link to={`/Internship/Jobs`}><p className="forbackpara">Matched Internships        </p></Link>
                <p className="forbackpara">&gt;</p>
                <Link to={`/Internship/${jobDetails.title}`}><p className="forbackpara">{jobDetails.title}</p></Link>
            </div>
            <div className="shascompimage" style={{background:`url(${companyimage}) no-repeat center center/cover`}}>
                    {/* <img id="shascompimage1" src={companyimage} alt="image"/> */}
                    <p className={""+(isfollow ? "text-primary" : "")}>
                        {/* <i style={{fontSize: "20px",float:"right"}} class="fa fa-thumbs-up" onClick={onfollowButtonClick}></i> */}
                        <p className="shasfoll" style={{float:"right"}}  onClick={onfollowButtonClick}>{follow}</p>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        < div className="shashicomp">
                            <a href="https://www.amazon.com/" target="_blank"><img id = "logoimageshas" src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Amazon_icon.svg/2500px-Amazon_icon.svg.png" alt="icon"  /></a>
                            <p id = "logoparashas">{title}</p>
                        </div>
                        <p className="movepara">
                            Entertainment Company
                        </p>
                        <div className="shashicomp">
                        <a id = "logoparashas1" href="https://goo.gl/maps/2T1TeWVzF2g5XP1S6" target="_blank" ><img id = "logoimageshas1" src="https://cdn-icons-png.flaticon.com/512/67/67347.png" alt="icon" />https://goo.gl/maps/2T1TeWVzF2g5XP1S6</a>
                        <a id="logoparashas2" style={{float:"right"}} href="https://www.amazon.com/" target="_blank" ><img src="https://static.vecteezy.com/system/resources/thumbnails/003/731/316/small/web-icon-line-on-white-background-image-for-web-presentation-logo-icon-symbol-free-vector.jpg" alt="icon" style={{ width: 10, height: 10, color: "white", fontSize: "small"}} />https://www.amazon.com/</a>
                        </div>
                    </p>
                </div>
            
        
        
            <div className="shascomppage">
                
                <div >
                    <span className="shasinfoemp">Number of Employee: {numberofemployee}</span>
                    <span className="shasinfoemp">Number of Internship Posted:{numberofinternshipposted}</span>
                </div>
                <div>
                    <p className="parastrong">1 - About our Company</p>
                    <p id="underpara">{aboutcomp}</p>
                </div>
                <div>
                    <p className="parastrong">2 - About our Vision</p>
                    <p id="underpara">{compvision}</p>
                </div>
                <div>
                    <p className="parastrong">3 - About our Policy</p>
                    <p id="underpara">{companypolicy}</p>
                </div>
                <div>
                    <p className="parastrong">4 - About our Culture</p>
                    <p id="underpara">{companyculture}</p>
                    
                </div>
                <div className="shasinternshipinfo">
                    <p className="parastrong">Internship Information</p>
                    <div className="interncard">
                     <div className="shashitopic">
                     <p id="ppp1">project1</p>
                           <p id="ppp2">Audio System Engineer,Pixel</p>
                   </div>
                        <p className="pppp1">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla debitis, incidunt exercitationem aliquam perferendis aperiam dolorem nemo velit modi minima commodi? Exercitationem, accusamus?</p>
                    <>
                {skills && skills.length > 0 ? (
                    <div className="internshipJob_card_skillRoot">
                        <strong id="istrong">Required:</strong>{skills.map((skill, i) => (
                            <div className="internshipJob_card_skill1" id="skillscards" key={i}>

                                {skill}
                            </div>
                        ))}
                    </div>
                ) : (
                    "No skills"
                )}
            </>
                    </div>
                    <div className="interncard">
                    <div className="shashitopic">
                            

                                                   <p id="ppp1">project2</p>
                                                    <p id="ppp2">Audio System Engineer,Pixel</p>
                                                 </div>
                        <p className="pppp1">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla debitis, incidunt exercitationem aliquam perferendis aperiam dolorem nemo velit modi minima commodi? Exercitationem, accusamus?</p>
                    <>
                {skills && skills.length > 0 ? (
                    <div className="internshipJob_card_skillRoot">
                        <strong id="istrong">Required:</strong>{skills.map((skill, i) => (
                            <div className="internshipJob_card_skill1" key={i}>
                                {skill}
                            </div>
                        ))}
                    </div>
                ) : (
                    "No skills"
                )}
            </>
                    </div>
            
                
                </div>
                <div className="moreintern">
                
                <Link to="/Internship/moreinternship"><p id="morepara">See All Internship Posted &gt;</p></Link>
                </div>
                <div className="shascomment">
                    <p className="parastrong">Comment From Us</p>
                    <p id="underpara">{commentfrmus}</p>
                    
                </div>
            </div>
        </Card>
    );
};

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps, {})(Individual_companty);
