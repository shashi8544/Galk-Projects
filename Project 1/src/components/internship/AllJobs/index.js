
import "./index.css";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getAllJobs } from "../../../actions/galkLabActions";
import Loading from "../../common/ApplicationLoading";
import Jobs from "./jobs";
import { getJobListLoadingStatus } from "../../../reducers/galkLabJobSelector";
import {
  Card,
  Collapse,
  Descriptions,
  Avatar,
  Spin,
  Row,
  Col,
  Empty,
} from "antd";
import { Link } from "react-router-dom";
import ResultNotFound from "../../common/ResultNotFound";
import Records from './record.json'

// const { Panel } = Collapse;

const YourAssignments = (props) => {
  return(
    <>
    <div className="total">
    <div className="match-job">
    <p>Matched Jobs</p>
    </div>
    {
      Records&&Records.map((item, key) => {
        return(
        <Jobs jobDetails={item.jobDetails} index={item.index} key={key} />
        )
      })
    }
    </div>
    </>
  )
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

// from dewansh team


// import "./index.css";
// import React, { useEffect, useState } from "react";
// import { Redirect } from "react-router-dom";
// import { connect } from "react-redux";
// import { getAllJobs } from "../../../actions/galkLabActions";
// import Loading from "../../common/ApplicationLoading";
// import Jobs from "./jobs";
// import { getJobListLoadingStatus } from "../../../reducers/galkLabJobSelector";
// import {
//   Card,
//   Collapse,
//   Descriptions,
//   Avatar,
//   Spin,
//   Row,
//   Col,
//   Empty,
// } from "antd";
// import ResultNotFound from "../../common/ResultNotFound";
// import Records from './record.json'
// import Records1 from './record1.json'
// import { Link } from "react-router-dom";
// import {
//   EnvironmentOutlined,
//   PaperClipOutlined,
//   ExclamationCircleOutlined,
//   CalendarFilled,
// } from "@ant-design/icons";
// import "./style.css";
// import {
//   database,
// } from "../../../utils/configs/firebaseConfig"
// import moreinternship from "./moreinternship";


// // const YourAssignments = (props) => {
// //   const [attendanceModuleIsOpen, setAttendanceModuleIsOpen] = useState(false);
// //   const [selectedJob, setSelectedJob] = useState(null);
// //   const { getAllJobs, isUserAuthenticated, user, isLoading, jobPostings } =
// //     props;
// //   const [isOpen, setIsOpen] = useState(false);
// //   const [showMore, setShowMore] = useState(false);
// //   const text =
// //     "CaPay is a super application that includes 68 high qualityscreens to help you launch digital wallet application projects and speed up your design process. Designed on 2 leading platforms Sketch & Figma makes it easy to customize to create impressive projects weee I am longer show more please CaPay is a super application that includes 68 high qualityscreens to help you launch digital wallet application projects and speed up your design process. Designed on 2 leading platforms Sketch & Figma makes it easy to customize to create impressive projects weee I am longer show more please";

  

// //   const [data, setData] = useState([]);
// //   useEffect(async () => {
// //     if (user) {
// //       console.log("Hello");
// //       console.log(user?.id);
// //       let res = await getAllInternshipsData(user?.id);
// //       setData(res);
// //     }
// //   }, [user, getAllInternshipsData]);
// //   console.log(data);
// //   try{
// //     console.log(data[0].title)}
// //   catch(err){
    
// //   }

// //   var numberlikes = data.noOfLikes;

// //   const [like, setLike] = useState(numberlikes),
// //   [isLiked, setIsLiked] = useState(false),
// //   onLikeButtonClick = (NoOfLikes, CompanyId, Isliked) => {
// //     NoOfLikes = NoOfLikes + (Isliked ? -1 : 1);

// //       setLike(like+(isLiked ? -1 : 1));
// //       setIsLiked(!isLiked);
// //   }
  
// //   const getText = () => {
// //     // For Text that is shorter than desired length
// //     if (text.length <= 258) return text;
// //     // If text is longer than desired length & showMore is true
// //     if (text.length > 258 && showMore) {
// //       return (
// //         <>
// //           <p>{text}</p>

// //           <button onClick={() => setShowMore(false)}>Show Less</button>
// //         </>
// //       );
// //     }
// //     // If text is longer than desired length & showMore is false
// //     if (text.length > 258) {
// //       return (
// //         <>
// //           <p>{text.slice(0, 258)}</p>

// //           <button onClick={() => setShowMore(true)}>
// //             Show Full Description
// //           </button>
// //         </>
// //       );
// //     }
// //   };
// //   //Then just call in component

// //   function toggle() {
// //     setIsOpen(!isOpen);
// //   }
// //   useEffect(() => {
// //     if (user) getAllJobs();
// //   }, [user, getAllJobs]);

// //   // if (!isUserAuthenticated) {
// //   //   return <Redirect to="/" />;
// //   // }

// //   const loadingJsx = (
// //     <div className="your-assignment-loading">
// //       <Spin size="large" />
// //     </div>
// //   );

// //   if (!user.profileCompletionStatus) {
// //     return <Redirect to="/Profile" />;
// //   }

  
// //   return(
// //     <>
// //     <div className="total">
// //     <div className="match-job">
// //     <p>Matched Jobs</p>
// //     </div>
// //           {data.map((item,key) => (<Card
// //             className="internshipJob_card_cardRoot"
// //             size="small"
// //             type="inner"
// //             id={item.companyId}
// //             title={<>
// //                 <div>
// //                     {/* <img src={icon} alt="icon" style={{ width: 25, height: 25}} /> */}
// //                     <a href={item.Website} target="_blank"><strong>{item.Company_Name}</strong></a>
// //                     <p className={""+(isLiked ? "text-primary" : "")}>
// //                         <i style={{fontSize: "20px",float:"right"}} class="fa fa-thumbs-up" onClick={onLikeButtonClick}></i>
// //                         <br></br>
// //                         <p className="text-dark" style={{float:"right"}}>Like:{item.noOfLikes+(isLiked ? 1 : 0)}</p>
// //                     </p>
// //                 </div>
// //                 <div className="column-container">
// //                 <div className="newcolumn">Industry: {item.Industry}</div>
// //                 <div className="newcolumn">Website:<a href={item.Website}>{item.Website}</a></div>
// //                 </div>
// //             </>}
// //             style={{ marginBottom: 15 }}
// //             extra={
// //                 <div style={{ display: "flex" }}>

// //                     <span>

// //                     </span>

// //                 </div>
// //             }
// //             actions={[

// //                 <div style={{ display: "flex", justifyContent: "center" }} key={2}>
// //                     <PaperClipOutlined style={{ fontSize: 20, marginRight: 10 }} />
// //                     <span>Number of Openings: {item.No_Of_Employees || "Not available"} </span>
// //                 </div>,
// //                 <div style={{ display: "flex", justifyContent: "center" }} key={3}>
// //                     <EnvironmentOutlined style={{ fontSize: 20, marginRight: 10 }} />
// //                     <span>Location: {item.Location || "Not available"} </span>
// //                 </div>,
// //                 <div style={{ display: "flex", justifyContent: "center" }} key={4}>
// //                     <span
// //                         className="internshipJob_card_createDate"
// //                         style={{ marginRight: 10 }}
// //                     >
// //                         Posted on:
// //                     </span>
// //                     {item.CreateDate}
// //                 </div>,
// //             ]}>
// //             <>
// //                 <div className="jobCard_title">Required technical skills:</div>
// //                 {item.skills && item.skills.length > 0 ? (
// //                     <div className="internshipJob_card_skillRoot">
// //                         {item.skills.map((skill, i) => (
// //                             <div className="internshipJob_card_skill" key={i}>
// //                                 {skill}
// //                             </div>
// //                         ))}
// //                     </div>
// //                 ) : (
// //                     "No skills"
// //                 )}
// //             </>
// //             {item.optionalSkills && item.optionalSkills.length > 0 && (
// //                 <>
// //                     <div className="jobCard_title">Preferred technical skills:</div>
// //                     <div className="internshipJob_card_skillRoot">
// //                         {item.optionalSkills.map((skill, i) => (
// //                             <div className="internshipJob_card_skill" key={i}>
// //                                 {skill}
// //                             </div>
// //                         ))}
// //                     </div>
// //                 </>
// //             )}
// //             <div className="internshipJob_card_description" style={{color:"black"}}>{item.Company_Description}</div>
// //           </Card>
// //           ))}
        
        
              
// //     </div>
// //     </>
// //   )  //line 68
// // };  //your assignment


// for individual company

const Individual_companty = ({
  jobDetails,
  internshipDetails,
  companyDetails,
  index,
  editHandler,
}) => {
  // const {
  //     title,
  //     companyaddress,
  //     attachmentURL,
  //     skills,
  //     companyimage,
  //     numberofemployee,
  //     numberofinternshipposted,
  //     aboutcomp,
  //     commentfrmus,
  //     optionalSkills,
  //     createDate,
  //     location,
  //     status,
  //     description,
  //     industry,
  //     jobId,
  //     icon,
  //     compvision,
  //     companypolicy,
  //     companyculture,
  //     numberOfLikes,
  //     isfollowing
  // } = jobDetails;
  //adding like button feature.
    const description =" is a super application that includes 68 high qualityscreens to help you launch digital wallet application projects and speed up your design process. Designed on 2 leading platforms Sketch & Figma makes it easy to customize to create impressive projects weee I am longer show more please CaPay is a super application that includes 68 high qualityscreens to help you launch digital wallet application projects and speed up your design process. Designed on 2 leading platforms Sketch & Figma makes it easy t"
  const [follow, setfollow] = useState("Follow");
  const [isfollow, setIsFollowed] = useState(false);
  const [showStudentView, setShowStudentView] = useState(false),
      onfollowButtonClick = () => {
          setfollow(isfollow ? "Follow" : "Following");
          setIsFollowed(!isfollow);
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
              <Link to={`/Internship/Amazon`}><p className="forbackpara">{jobDetails.title}</p></Link>
          </div>
          <div className="shascompimage" style={{background:`url('https://images.unsplash.com/photo-1602359337719-a8bcbd1f7b51?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YW1hem9ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60') no-repeat center center/cover`}}>
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
                          <p id = "logoparashas">Amazon</p>
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
                  <span className="shasinfoemp">Number of Employee: 80</span>
                  <span className="shasinfoemp">Number of Internship Posted: 17</span>
              </div>
              <div>
                  <p className="parastrong">1 - About our Company</p>
                  <p id="underpara">zon allows users to submit reviews to the web page of each product. Reviewers must rate the product on a rating scale from one to five stars. Amazon provides a badging option for reviewers which indicates the real name of the reviewer (based on confirmation of a credit card account) or which indicates that the reviewer is one of the top reviewers by popularity. As of December 16, 2020, Amazon removed the ability of sellers and customers to comment on product reviews and purged their websites of all posted product review comments.or reviewers which indicates the real name of the reviewer (based on confirmation of a credit card account) or which indicates that the reviewer is one of the top reviewers by popularity. As of December 16, 2020, Amazon removed the ability of sellers and customers to comment on product reviews and purged their websites of all posted product review comments.or reviewers which indicates the real name of the reviewer (based on confirmation of a credit card account) or which indicates that the reviewer is one of the top reviewers by popularity. As of December 16, 2020, Amazon removed the ability of sellers and customers to comment on product reviews and purged their websites of all posted product review comments. In an email to sellers Amazon gave its rationale for removing this feature: The remaining review response options are to indica</p>
              </div>
              <div>
                  <p className="parastrong">2 - About our Vision</p>
                  <p id="underpara">zon allows users to submit reviews to the web page of each product. Reviewers must rate the product on a rating scale from one to five stars. Amazon provides a badging option for reviewers which indicates the real name of the reviewer (based on confirmation of a credit card account) or which indicates that the reviewer is one of the top reviewers by popularity. As of December 16, 2020, Amazon removed the ability of sellers and customers to comment on product reviews and purged their websites of all posted product review comments.or reviewers which indicates the real name of the reviewer (based on confirmation of a credit card account) or which indicates that the reviewer is one of the top reviewers by popularity. As of December 16, 2020, Amazon removed the ability of sellers and customers to comment on product reviews and purged their websites of all posted product review comments.or reviewers which indicates the real name of the reviewer (based on confirmation of a credit card account) or which indicates that the reviewer is one of the top reviewers by popularity. As of December 16, 2020, Amazon removed the ability of sellers and customers to comment on product reviews and purged their websites of all posted product review comments. In an email to sellers Amazon gave its rati</p>
              </div>
              <div>
                  <p className="parastrong">3 - About our Policy</p>
                  <p id="underpara">zon allows users to submit reviews to the web page of each product. Reviewers must rate the product on a rating scale from one to five stars. Amazon provides a badging option for reviewers which indicates the real name of the reviewer (based on confirmation of a credit card account) or which indicates that the reviewer is one of the top reviewers by popularity. As of December 16, 2020, Amazon removed the ability of sellers and customers to comment on product reviews and purged their websites of all posted product review comments.or reviewers which indicates the real name of the reviewer (based on confirmation of a credit card account) or which indicates that the reviewer is one of the top reviewers by popularity. As of December 16, 2020, Amazon removed the ability of sellers and customers to comment on product reviews and purged their websites of all posted product review comments.or reviewers which indicates the real name of the reviewer (based on confirmation of a credit card account) or which indicates that the reviewer is one of the top reviewers by popularity. As of December 16, 2020, Amazon removed the ability of sellers and customers to comment on product reviews and purged their websites of all posted product review comments. In an email to sellers Amazon gave its rationale for removing this feature: The remaining review response options are to indica</p>
              </div>
              <div>
                  <p className="parastrong">4 - About our Culture</p>
                  <p id="underpara">zon allows users to submit reviews to the web page of each product. Reviewers must rate the product on a rating scale from one to five stars. Amazon provides a badging option for reviewers which indicates the real name of the reviewer (based on confirmation of a credit card account) or which indicates that the reviewer is one of the top reviewers by popularity. As of December 16, 2020, Amazon removed the ability of sellers and customers to comment on product reviews and purged their websites of all posted product review comments.or reviewers which indicates the real name of the reviewer (based on confirmation of a credit card account) or which indicates that the reviewer is one of the top reviewers by popularity. As of December 16, 2020, Amazon removed the ability of sellers and customers to comment on product reviews and purged their websites of all posted product review comments.or reviewers which indicates the real name of the reviewer (based on confirmation of a credit card account) or which indicates that the reviewer is one of the top reviewers by popularity. As of December 16, 2020, Amazon removed the ability of sellers and customers to comment on product reviews and purged their websites of all posted product review comments. In an email to sellers Amazon gave its rationale for removing this feature: The remaining review response options are to indica</p>
                  
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
                      <strong id="istrong">Required:</strong>{[
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
          </>
                  </div>
                  <div className="interncard">
                  <div className="shashitopic">
                          

                                                 <p id="ppp1">project2</p>
                                                  <p id="ppp2">Audio System Engineer,Pixel</p>
                                               </div>
                      <p className="pppp1">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla debitis, incidunt exercitationem aliquam perferendis aperiam dolorem nemo velit modi minima commodi? Exercitationem, accusamus?</p>
                  <>
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
                      <strong id="istrong">Required:</strong>{[
                    "Java",
                    "Python",
                    "C++"
                ].map((skill, i) => (
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
                  <p id="underpara">m ipsum dolor sit amet consectetur, adipisicing elit. Nulla debitis, incidunt exercitationem aliquam perferendis aperiam dolorem nemo velit modi minima commodi? Exercitation</p>
                  
              </div>
          </div>
      </Card>
  );
};


// for more internship page

const Jobs1 = ({
  jobDetails,
  internshipDetails,
  index,
  editHandler,
}) => {
  // const {
  //     title,
  //     attachmentURL,
  //     skills,
  //     createDate,
  //     location,
  //     status,
  //     industry,
  //     jobId,
  //     icon,
  //     numberOfLikes
  // } = internshipDetails;
  
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
                <i style={{fontSize: "20px",float:"right"}} class="fa fa-thumbs-up" onClick={onLikeButtonClick}>45</i>
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

// export default connect(mapStateToProps, {
//   getAllJobs,
// })(Individual_companty,Jobs1);
=======
import "./index.css";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getAllJobs } from "../../../actions/galkLabActions";
import Loading from "../../common/ApplicationLoading";
import Jobs from "./jobs";
import { getJobListLoadingStatus } from "../../../reducers/galkLabJobSelector";
// import {
//   Card,
//   Collapse,
//   Descriptions,
//   Avatar,
//   Spin,
//   Row,
//   Col,
//   Empty,
// } from "antd";
import ResultNotFound from "../../common/ResultNotFound";
import Records from './record.json'

// const { Panel } = Collapse;

const YourAssignments = (props) => {
  return(
    <>
    
    <div className="match-job">
    Matched Jobs
    </div>
    <p className="notify">You can notify the company that you are interested through clicking the like button.</p>
    {
      Records&&Records.map((item, key) => {
        return(
        <Jobs jobDetails={item.jobDetails} index={item.index} key={key} />
        )
      })
    }
    
    </>
  )
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

