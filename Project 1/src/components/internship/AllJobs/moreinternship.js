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
import "./individual_company.css"
import { Link } from "react-router-dom";

// const { confirm } = Modal;


const Jobs1 = ({
    jobDetails,
    internshipDetails,
    index,
    editHandler,
  }) => {
    const {
        title,
        attachmentURL,
        skills,
        createDate,
        location,
        status,
        industry,
        jobId,
        icon,
        numberOfLikes
    } = internshipDetails;
    
    //adding like button feature.
    const description =" is a super application that includes 68 high qualityscreens to help you launch digital wallet application projects and speed up your design process. Designed on 2 leading platforms Sketch & Figma makes it easy to customize to create impressive projects weee I am longer show more please CaPay is a super application that includes 68 high qualityscreens to help you launch digital wallet application projects and speed up your design process. Designed on 2 leading platforms Sketch & Figma makes it easy t"
    const [like, setLike] = useState(34),
    [isLiked, setIsLiked] = useState(false),
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
    const [expandMore,setExpandMore] = useState(false);
    const getexpandmore = () =>{
      if(expandMore){
        return (
          <>
          <p>{description}</p>
          <p id="expandpara"
          onClick={() => setExpandMore(false)}>
                Show Less
          </p>
          </>
          
        );
      }
      else{
        return(
          <>
            <p id="expandpara"
                onClick={() => setExpandMore(true)}>
                Expand
              </p>
          </>
        );
      }
    }
    return (
      <Card>
        <div className="forback">
                <Link to={`/Internship/Jobs`}><p className="forbackpara">Matched Internships </p></Link>
                <p className="forbackpara">&gt;</p>
                <Link to={`/Internship/Amazon`}><p className="forbackpara">Amazon</p></Link>
                <p className="forbackpara">&gt;</p>
                <Link to={`/Internship/moreinternship`}><p className="forbackpara">moreinternship</p></Link>
            </div>
            <p id="spp1">All Internship Posted</p>
      

            <div className="moreinterncontainer">
              <div className="shashitopic1">
                <p id="sspp1">project1</p>
                <p id="sspp2">Audio System Engineer,Pixel</p>
              </div>
              <p id="sspp3">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio praesentium dolore adipisci assumenda nihil exercitationem sequi id temporibus inventore, similique quae a ad. Accusantium dignissimos hic earum a nihil veniam.</p>
              
              <div className="featureelement">
                    <a href="https://www.amazon.com/" target="_blank"><img id="ssppimg" src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Amazon_icon.svg/2500px-Amazon_icon.svg.png" alt="icon"  /></a>
                    <p id="sppcompname">Amazon</p>
                <a id="ssadd" href="https://goo.gl/maps/2T1TeWVzF2g5XP1S6" target="_blank" ><img id = "logoimageshas1" src="https://cdn-icons-png.flaticon.com/512/67/67347.png" alt="icon" />https://goo.gl/maps/2T1TeWVzF2g5XP1S6</a>
              <p></p>
              <p className={""+(isLiked ? "text-primary" : "")}>
                  <i style={{fontSize: "20px",float:"right"}} class="fa fa-thumbs-up" onClick={onLikeButtonClick}>{like}</i>
              </p>
              </div>

                <div >
                      
                </div>
                <div className="box1">
                </div>
            
                <div className="ssppjobcardtitle">Required technical skills:</div>
                {[
                          "Java",
                          "Python",
                          "C++"
                      ] && [
                        "Java",
                        "Python",
                        "C++"
                    ].length > 0 ? (
                        <div className="internshipJob_card_skillRoot">
                            {[
                          "Java",
                          "Python",
                          "C++"
                      ].map((skill, i) => (
                                <div className="internshipJob_card_skill1" id="skillscards" key={i}>
                                    {skill}
                                </div>
                            ))}
                        </div>
                    ) : (
                        "No skills"
                )}
            <div>{getexpandmore()}</div>
            </div>

            <div className="moreinterncontainer">
              <div className="shashitopic1">
                <p id="sspp1">project1</p>
                <p id="sspp2">Audio System Engineer,Pixel</p>
              </div>
              <p id="sspp3">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio praesentium dolore adipisci assumenda nihil exercitationem sequi id temporibus inventore, similique quae a ad. Accusantium dignissimos hic earum a nihil veniam.</p>
              
              <div className="featureelement">
                    <a href="https://www.amazon.com/" target="_blank"><img id="ssppimg" src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Amazon_icon.svg/2500px-Amazon_icon.svg.png" alt="icon"  /></a>
                    <p id="sppcompname">Amazon</p>
                <a id="ssadd" href="https://goo.gl/maps/2T1TeWVzF2g5XP1S6" target="_blank" ><img id = "logoimageshas1" src="https://cdn-icons-png.flaticon.com/512/67/67347.png" alt="icon" />https://goo.gl/maps/2T1TeWVzF2g5XP1S6</a>
              <p></p>
              <p className={""+(isLiked ? "text-primary" : "")}>
                  <i style={{fontSize: "20px",float:"right"}} class="fa fa-thumbs-up" onClick={onLikeButtonClick}>{like}</i>
              </p>
              </div>

                <div >
                      
                </div>
                <div className="box1">
                </div>
            
                <div className="ssppjobcardtitle">Required technical skills:</div>
                {[
                          "Java",
                          "Python",
                          "C++"
                      ] && [
                        "Java",
                        "Python",
                        "C++"
                    ].length > 0 ? (
                        <div className="internshipJob_card_skillRoot">
                            {[
                          "Java",
                          "Python",
                          "C++"
                      ].map((skill, i) => (
                                <div className="internshipJob_card_skill1" id="skillscards" key={i}>
                                    {skill}
                                </div>
                            ))}
                        </div>
                    ) : (
                        "No skills"
                )}
            <div>{getexpandmore()}</div>
            </div>
        </Card>
    );
  };

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps, {})(Jobs1);
