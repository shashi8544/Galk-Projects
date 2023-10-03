import React,{ useEffect, useState} from "react";
import { connect } from "react-redux";
import ReactDOM from "react-dom";
import { Card, Modal, } from "antd";
import {
    EnvironmentOutlined,
    PaperClipOutlined,
    ExclamationCircleOutlined,
    CalendarFilled,
} from "@ant-design/icons";
import "./style.css";
import { Link } from "react-router-dom";
import img1 from "./images/Vector (1).png";
import img2 from "./images/Ellipse 1.png";

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
        industry,
        jobId,
        icon,
        numberOfLikes
    } = jobDetails;

    const [showMore, setShowMore] = useState(false);
    const getText = () => {
        if (description.length > 0 && showMore) {
          return (
            <div style={{marginTop:"25px"}}>
                <p style={{fontFamily:"Roboto,sans-serif",size:"24px", fontWeight:"700", marginBottom:"5px"}}>Internship Description</p>
              <p>{description}</p>
                <div className="description_button">
              <button style={{border:"none",background:"none",cursor:"pointer",color:"blue"}}
                onClick={() => setShowMore(false)}>
                Close
              </button></div>
            </div>
          );
        }
        if (description.length > 0) {
          return (
            <>
              <p>{description.slice(0, 0)}</p>
                <div className="description_button">
              <button style={{border:"none",background:"none",cursor:"pointer",color:"blue"}}
                onClick={() => setShowMore(true)}>
                See more detail
              </button></div>
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
marginBottom: "20px",
fontFamily: "Roboto, sans-serif",
fontStyle: "normal",
fontWeight:  "400",
fontSize: "14px",
lineHeight: "160%",
color: "#212121",
}
    const ellipse={
        boxSizing: "border-box",
        width: "25px",
        height: "25px",
        left: "286px",
        top: "297px",

        background: "#FFFFFF",


        border: "0.5px solid #E0E0E0",
    }
    return (
        <Card
            className="internshipJob_card_cardRoot"
            size="small"
            type="inner"
            title={<>
                <div >
                    
                    <p style={mystyle}>
                        {title}
                    </p>

                    <p style={newstyle}>
                    Development of AI matching platform between human resource database and client company profiles
                    </p>
                    
                </div>
                <div className="name-location">
                    <div className="address"> 
                    <img style={{paddingRight:"6px"}} src={img2} alt="" />
                    <Link style={{color: "#696969"}} to={`/Internship/${jobDetails.title}`} >{industry}</Link> 
                    
                    <img className="spacing" style={{height:"18px"}} src={img1} alt="" />
                    {location}
                    </div>
                   
                </div>
            </>}
            style={{ marginBottom: 15 }}
            extra={
                <div style={{ display: "flex" }}>

                    <span>

                    </span>

                </div>
            }
            
        >
            <>
                <div className="jobCard_title">Required technical skills:</div>
                {skills && skills.length > 0 ? (
                    <div className="internshipJob_card_skillRoot">
                        {skills.map((skill, i) => (
                            <div style={{color:"#FFFFFF",background:"#8B97A5", marginTop:"-5px", marginBottom:"0px"}} className="internshipJob_card_skill" key={i}>
                                {skill}
                            </div>
                        ))}
                    </div>
                ) : (
                    "No skills"
                )}
            </>
            
            <div className="internshipJob_card_description" style={{color:"black"}}>{getText()}</div>
        </Card>
    );
};

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps, {})(Jobs);
