
// import React,{ useEffect, useState } from "react";
// import { connect } from "react-redux";
// import { Card, Modal, } from "antd";
// import {
//     EnvironmentOutlined,
//     PaperClipOutlined,
//     ExclamationCircleOutlined,
//     CalendarFilled,
// } from "@ant-design/icons";
// import "./style.css";
// import { Link } from "react-router-dom";

// const { confirm } = Modal;

// const Jobs = ({
//     jobDetails,
//     index,
//     editHandler,
// }) => {
//     const {
//         title,
//         attachmentURL,
//         skills,
//         optionalSkills,
//         createDate,
//         location,
//         status,
//         description,
//         industry,
//         jobId,
//         icon,
//         numberOfLikes
//     } = jobDetails;
//     //adding like button feature.
//     const [like, setLike] = useState(numberOfLikes),
//     [isLiked, setIsLiked] = useState(false),
//     onLikeButtonClick = () => {
//         setLike(like+(isLiked ? -1 : 1));
//         setIsLiked(!isLiked);
//     }
//     //adding show more feature
//     const [showMore, setShowMore] = useState(false);
//     const getText = () => {
//         // For Text that is shorter than desired length
//         if (description.length <= 258) return description;
//         // If text is longer than desired length & showMore is true
//         if (description.length > 258 && showMore) {
//           return (
//             <>
//               <p>{description}</p>
    
//               <button
//                 onClick={() => setShowMore(false)}>
//                 Show Less
//               </button>
//             </>
//           );
//         }
//          // If text is longer than desired length & showMore is false
//         if (description.length > 258) {
//           return (
//             <>
//               <p>{description.slice(0, 258)}</p>
    
//               <button
//                 onClick={() => setShowMore(true)}>
//                 Show Full Description
//               </button>
//             </>
//           );
//         }
//       };
//     return (
//         <Card
//             className="internshipJob_card_cardRoot"
//             size="small"
//             type="inner"
//             title={<>
//                 <div>
//                     <img src={icon} alt="icon" style={{ width: 25, height: 25}} />
//                     <Link to={`/Internship/${jobDetails.title}`} ><strong>{title}</strong></Link>
//                     <p className={""+(isLiked ? "text-primary" : "")}>
//                         <i style={{fontSize: "20px",float:"right"}} class="fa fa-thumbs-up" onClick={onLikeButtonClick}></i>
//                         <br></br>
//                         <p className="text-dark" style={{float:"right"}}>Like:{like}</p>
//                     </p>
//                 </div>
//                 <div className="column-container">
//                 <div className="newcolumn">Industry: {industry}</div>
//                 <div className="newcolumn">Website:<a href={attachmentURL}>{attachmentURL}</a></div>
//                 </div>
//             </>}
//             style={{ marginBottom: 15 }}
//             extra={
//                 <div style={{ display: "flex" }}>

//                     <span>

//                     </span>

//                 </div>
//             }
//             actions={[

//                 <div style={{ display: "flex", justifyContent: "center" }} key={2}>
//                     <PaperClipOutlined style={{ fontSize: 20, marginRight: 10 }} />
//                     <span>Number of Openings: {status || "Not available"} </span>
//                 </div>,
//                 <div style={{ display: "flex", justifyContent: "center" }} key={3}>
//                     <EnvironmentOutlined style={{ fontSize: 20, marginRight: 10 }} />
//                     <span>Location: {location || "Not available"} </span>
//                 </div>,
//                 <div style={{ display: "flex", justifyContent: "center" }} key={4}>
//                     <span
//                         className="internshipJob_card_createDate"
//                         style={{ marginRight: 10 }}
//                     >
//                         Posted on:
//                     </span>
//                     {createDate}
//                 </div>,
//             ]}
//         >
//             <>
//                 <div className="jobCard_title">Required technical skills:</div>
//                 {skills && skills.length > 0 ? (
//                     <div className="internshipJob_card_skillRoot">
//                         {skills.map((skill, i) => (
//                             <div className="internshipJob_card_skill" key={i}>
//                                 {skill}
//                             </div>
//                         ))}
//                     </div>
//                 ) : (
//                     "No skills"
//                 )}
//             </>
//             {optionalSkills && optionalSkills.length > 0 && (
//                 <>
//                     <div className="jobCard_title">Preferred technical skills:</div>
//                     <div className="internshipJob_card_skillRoot">
//                         {optionalSkills.map((skill, i) => (
//                             <div className="internshipJob_card_skill" key={i}>
//                                 {skill}
//                             </div>
//                         ))}
//                     </div>
//                 </>
//             )}
//             <div className="internshipJob_card_description" style={{color:"black"}}>{getText()}</div>
//         </Card>
//     );
// };

// const mapStateToProps = (state) => ({

// });

// export default connect(mapStateToProps, {})(Jobs);


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
// import useCollapse from 'react-collapsed';
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
    //adding like button feature.
    const [like, setLike] = useState(numberOfLikes),
    [isLiked, setIsLiked] = useState(false),
    onLikeButtonClick = () => {
        setLike(like+(isLiked ? -1 : 1));
        setIsLiked(!isLiked);
    }
   /**  function Collapsible() {
        const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
    return (
        <div className="collapsible">
            <div className="header" {...getToggleProps()}>
                {isExpanded ? 'Collapse' : 'Expand'}
            </div>
            <div {...getCollapseProps()}>
                <div className="content">
                    {description}
                </div>
            </div>
        </div>
        );
    }*/
    //adding show more feature
    const [showMore, setShowMore] = useState(false);
    const getText = () => {
        // For Text that is shorter than desired length
        // if (description.length <= 0) return description;
        // If text is longer than desired length & showMore is true
        if (description.length > 0 && showMore) {
          return (
            <div style={{marginTop:"25px"}}>

              <p>{description}</p>
                <div className="description_button">
              <button style={{border:"none",background:"none",cursor:"pointer"}}
                onClick={() => setShowMore(false)}>
                Show Less
              </button></div>
            </div>
          );
        }
         // If text is longer than desired length & showMore is false
        if (description.length > 0) {
          return (
            <>
              <p>{description.slice(0, 0)}</p>
                <div className="description_button">
              <button style={{border:"none",background:"none",cursor:"pointer"}}
                onClick={() => setShowMore(true)}>
                Expand
              </button></div>
            </>
          );
        }
      };
      const mystyle = {
        // position: "absolute",
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

      /* System Gray/900 */

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

        // position: absolute,
        width: "25px",
        height: "25px",
        left: "286px",
        top: "297px",

        background: "#FFFFFF",
/* System Gray/300 */

        border: "0.5px solid #E0E0E0",
    }
    return (
        <Card
            className="internshipJob_card_cardRoot"
            size="small"
            type="inner"
            title={<>
                <div >
                    {/* <img src={icon} alt="icon" style={{ width: 25, height: 25}} /> */}
                    {/* <Link to={`/Internship/${jobDetails.title}`} ><strong>{title}</strong></Link> */}
                    <p style={mystyle}>
                    Audio System Engineer,Pixel
                    </p>

                    <p style={newstyle}>
                    Development of AI matching platform between human resource database and client company profiles
                    </p>
                    
                </div>
                <div className="name-location">
                    <div className="address"> 
                    <img  src={img2} alt="" />
                    <Link style={{color: "#696969"}} to={`/Internship/${jobDetails.title}`} >{industry}</Link> 
                    
                    <img className="spacing" src={img1} alt="" />
                    {location}
                    </div>
                    
                    <div className="likes">
                    <div className={""+(isLiked ? "text-primary" : "")}>
                        <i style={{fontSize: "20px"}} class="fa fa-thumbs-up" onClick={onLikeButtonClick}></i>
                        <div className='text-dark' style={{display:'inline', marginLeft:'5px'}}>{like}</div>
                    </div>
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
            // actions={[

            //     <div style={{ display: "flex", justifyContent: "center" }} key={2}>
            //         <PaperClipOutlined style={{ fontSize: 20, marginRight: 10 }} />
            //         <span>Number of Openings: {status || "Not available"} </span>
            //     </div>,
            //     <div style={{ display: "flex", justifyContent: "center" }} key={3}>
            //         <EnvironmentOutlined style={{ fontSize: 20, marginRight: 10 }} />
            //         <span>Location: {location || "Not available"} </span>
            //     </div>,
            //     <div style={{ display: "flex", justifyContent: "center" }} key={4}>
            //         <span
            //             className="internshipJob_card_createDate"
            //             style={{ marginRight: 10 }}
            //         >
            //             Posted on:
            //         </span>
            //         {createDate}
            //     </div>,
            // ]}
        >
            <>
                <div className="jobCard_title">Required technical skills:</div>
                {skills && skills.length > 0 ? (
                    <div className="internshipJob_card_skillRoot">
                        {skills.map((skill, i) => (
                            <div style={{color:"#FFFFFF",background:"#8B97A5", marginTop:"-5px"}} className="internshipJob_card_skill" key={i}>
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
=======
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

// import useCollapse from 'react-collapsed';
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
    //adding like button feature.
    const [like, setLike] = useState(numberOfLikes),
    [isLiked, setIsLiked] = useState(false),
    onLikeButtonClick = () => {
        setLike(like+(isLiked ? -1 : 1));
        setIsLiked(!isLiked);
    }
   /**  function Collapsible() {
        const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
    return (
        <div className="collapsible">
            <div className="header" {...getToggleProps()}>
                {isExpanded ? 'Collapse' : 'Expand'}
            </div>
            <div {...getCollapseProps()}>
                <div className="content">
                    {description}
                </div>
            </div>
        </div>
        );
    }*/
    //adding show more feature
    const [showMore, setShowMore] = useState(false);
    const getText = () => {
        // For Text that is shorter than desired length
        // if (description.length <= 0) return description;
        // If text is longer than desired length & showMore is true
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
         // If text is longer than desired length & showMore is false
        if (description.length > 0) {
          return (
            <>
              <p>{description.slice(0, 0)}</p>
                <div className="description_button">
              <button style={{border:"none",background:"none",cursor:"pointer",color:"blue"}}
                onClick={() => setShowMore(true)}>
                Expand
              </button></div>
            </>
          );
        }
      };
      const mystyle = {
        // position: "absolute",
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

      /* System Gray/900 */

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

        // position: absolute,
        width: "25px",
        height: "25px",
        left: "286px",
        top: "297px",

        background: "#FFFFFF",
/* System Gray/300 */

        border: "0.5px solid #E0E0E0",
    }
    return (
        <Card
            className="internshipJob_card_cardRoot"
            size="small"
            type="inner"
            title={<>
                <div >
                    {/* <img src={icon} alt="icon" style={{ width: 25, height: 25}} /> */}
                    {/* <Link to={`/Internship/${jobDetails.title}`} ><strong>{title}</strong></Link> */}
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
                    
                    <div className="likes">
                    <div className={""+(isLiked ? "text-primary" : "")}>
                        <i style={{fontSize: "18px"}} class="fa fa-thumbs-up" onClick={onLikeButtonClick}></i>
                        <div className='text-dark' style={{display:'inline', marginLeft:'5px'}}>{like}</div>
                    </div>
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
            // actions={[

            //     <div style={{ display: "flex", justifyContent: "center" }} key={2}>
            //         <PaperClipOutlined style={{ fontSize: 20, marginRight: 10 }} />
            //         <span>Number of Openings: {status || "Not available"} </span>
            //     </div>,
            //     <div style={{ display: "flex", justifyContent: "center" }} key={3}>
            //         <EnvironmentOutlined style={{ fontSize: 20, marginRight: 10 }} />
            //         <span>Location: {location || "Not available"} </span>
            //     </div>,
            //     <div style={{ display: "flex", justifyContent: "center" }} key={4}>
            //         <span
            //             className="internshipJob_card_createDate"
            //             style={{ marginRight: 10 }}
            //         >
            //             Posted on:
            //         </span>
            //         {createDate}
            //     </div>,
            // ]}
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
