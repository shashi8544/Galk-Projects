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






// const Individual_companty = ({
//   jobDetails,
//   internshipDetails,
//   companyDetails,
//   index,
//   editHandler,
// }) => {
//   // const {
//   //     title,
//   //     companyaddress,
//   //     attachmentURL,
//   //     skills,
//   //     companyimage,
//   //     numberofemployee,
//   //     numberofinternshipposted,
//   //     aboutcomp,
//   //     commentfrmus,
//   //     optionalSkills,
//   //     createDate,
//   //     location,
//   //     status,
//   //     industry,
//   //     jobId,
//   //     icon,
//   //     compvision,
//   //     companypolicy,
//   //     companyculture,
//   //     numberOfLikes,
//   //     isfollowing
//   // } = jobDetails;
//   //adding like button feature.
//   const description =" is a super application that includes 68 high qualityscreens to help you launch digital wallet application projects and speed up your design process. Designed on 2 leading platforms Sketch & Figma makes it easy to customize to create impressive projects weee I am longer show more please CaPay is a super application that includes 68 high qualityscreens to help you launch digital wallet application projects and speed up your design process. Designed on 2 leading platforms Sketch & Figma makes it easy t"
//   const [follow, setfollow] = useState("Follow");
//   const [isfollow, setIsFollowed] = useState(false);
//   const [showStudentView, setShowStudentView] = useState(false),
//       onfollowButtonClick = () => {
//           setfollow(isfollow ? "Follow" : "Following");
//           setIsFollowed(!isfollow);
//       }
//   //adding show more feature
//   const [showMore, setShowMore] = useState(false);
//   const getText = () => {
//       // For Text that is shorter than desired length
//       if (description.length <= 258) return description;
//       // If text is longer than desired length & showMore is true
//       if (description.length > 258 && showMore) {
//           return (
//               <>
//                   <p>{description}</p>

//                   <button
//                       onClick={() => setShowMore(false)}>
//                       Show Less
//                   </button>
//               </>
//           );
//       }
//       // If text is longer than desired length & showMore is false
//       if (description.length > 258) {
//           return (
//               <>
//                   <p>{description.slice(0, 258)}</p>

//                   <button
//                       onClick={() => setShowMore(true)}>
//                       Show Full Description
//                   </button>
//               </>
//           );
//       }
//   };
//   return (
      
//       <Card
//       title={
//           <>
//           <div className="shascompimage" style={{background:`url('https://images.unsplash.com/photo-1602359337719-a8bcbd1f7b51?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YW1hem9ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60') no-repeat center center/cover`}}>
//                   {/* <img id="shascompimage1" src={companyimage} alt="image"/> */}
//                   <p className={""+(isfollow ? "text-primary" : "")}>
//                       {/* <i style={{fontSize: "20px",float:"right"}} class="fa fa-thumbs-up" onClick={onfollowButtonClick}></i> */}
//                       <br></br>
//                       <p className="shasfoll" style={{float:"right"}}  onClick={onfollowButtonClick}>{follow}</p>
//                       <br></br>
//                       <br></br>
//                       <br></br>
//                       < div className="shashicomp">
//                           <a href="https://www.amazon.com/" target="_blank"><img src='https://www.w3schools.com/images/w3schools_green.jpg' alt="icon" style={{ width: 25, height: 25}} /></a>
//                           <p>Amazon</p>
//                       </div>
//                       <p className="movepara">
//                           Entertainment Company
//                       </p>
//                       <div className="shashicomp">
//                       <a href="https://goo.gl/maps/2T1TeWVzF2g5XP1S6" target="_blank" style={{ width: 10, height: 10}}><img src='https://www.w3schools.com/images/w3schools_green.jpg' alt="icon"  />https://goo.gl/maps/2T1TeWVzF2g5XP1S6</a>
//                       </div>
//                       <div className="shashicomp" id="shashicomp11">

//                       <a href="https://www.amazon.com/" target="_blank"><img src='https://www.w3schools.com/images/w3schools_green.jpg'  alt="icon" style={{ width: 10, height: 10}} />https://www.amazon.com/</a>
//                       </div>
//                   </p>
//               </div>
          
//           </>
//       }
//       >
//           <div className="shascomppage">
              
//               <div >
//                   <span className="shasinfoemp">Number of Employee: 80</span>
//                   <span className="shasinfoemp">Number of Internship Posted:17</span>
//               </div>
//               <div>
//                   <p className="parastrong">1- About our Company</p>
//                   <p>zon allows users to submit reviews to the web page of each product. Reviewers must rate the product on a rating scale from one to five stars. Amazon provides a badging option for reviewers which indicates the real name of the reviewer (based on confirmation of a credit card account) or which indicates that the reviewer is one of the top reviewers by popularity. As of December 16, 2020, Amazon removed the ability of sellers and customers to comment on product reviews and purged their websites of all posted product review comments.or reviewers which indicates the real name of the reviewer (based on confirmation of a credit card account) or which indicates that the reviewer is one of the top reviewers by popularity. As of December 16, 2020, Amazon removed the ability of sellers and customers to comment on product reviews and purged their websites of all posted product review comments.or reviewers which indicates the real name of the reviewer (based on confirmation of a credit card account) or which indicates that the reviewer is one of the top reviewers by popularity. As of December 16, 2020, Amazon removed the ability of sellers and customers to comment on product reviews and purged their websites of all posted product review comments. In an email to sellers Amazon gave its rationale for removing this feature: The remaining review response options are to indica
//                   </p>
//               </div>
//               <div>
//                   <p className="parastrong">2- About our Vision</p>
//                   <p>zon allows users to submit reviews to the web page of each product. Reviewers must rate the product on a rating scale from one to five stars. Amazon provides a badging option for reviewers which indicates the real name of the reviewer (based on confirmation of a credit card account) or which indicates that the reviewer is one of the top reviewers by popularity. As of December 16, 2020, Amazon removed the ability of sellers and customers to comment on product reviews and purged their websites of all posted product review comments.or reviewers which indicates the real name of the reviewer (based on confirmation of a credit card account) or which indicates that the reviewer is one of the top reviewers by popularity. As of December 16, 2020, Amazon removed the ability of sellers and customers to comment on product reviews and purged their websites of all posted product review comments.or reviewers which indicates the real name of the reviewer (based on confirmation of a credit card account) or which indicates that the reviewer is one of the top reviewers by popularity. As of December 16, 2020, Amazon removed the ability of sellers and customers to comment on product reviews and purged their websites of all posted product review comments. In an email to sellers Amazon gave its rationale for removing this feature: The remaining review response options are to indica</p>
//               </div>
//               <div>
//                   <p className="parastrong">3- About our Policy</p>
//                   <p>zon allows users to submit reviews to the web page of each product. Reviewers must rate the product on a rating scale from one to five stars. Amazon provides a badging option for reviewers which indicates the real name of the reviewer (based on confirmation of a credit card account) or which indicates that the reviewer is one of the top reviewers by popularity. As of December 16, 2020, Amazon removed the ability of sellers and customers to comment on product reviews and purged their websites of all posted product review comments.or reviewers which indicates the real name of the reviewer (based on confirmation of a credit card account) or which indicates that the reviewer is one of the top reviewers by popularity. As of December 16, 2020, Amazon removed the ability of sellers and customers to comment on product reviews and purged their websites of all posted product review comments.or reviewers which indicates the real name of the reviewer (based on confirmation of a credit card account) or which indicates that the reviewer is one of the top reviewers by popularity. As of December 16, 2020, Amazon removed the ability of sellers and customers to comment on product reviews and purged their websites of all posted product review comments. In an email to sellers Amazon gave its rationale for removing this feature: The remaining review response options are to indica</p>
//               </div>
//               <div>
//                   <p className="parastrong">4- About our Culture</p>
//                   <p>zon allows users to submit reviews to the web page of each product. Reviewers must rate the product on a rating scale from one to five stars. Amazon provides a badging option for reviewers which indicates the real name of the reviewer (based on confirmation of a credit card account) or which indicates that the reviewer is one of the top reviewers by popularity. As of December 16, 2020, Amazon removed the ability of sellers and customers to comment on product reviews and purged their websites of all posted product review comments.or reviewers which indicates the real name of the reviewer (based on confirmation of a credit card account) or which indicates that the reviewer is one of the top reviewers by popularity. As of December 16, 2020, Amazon removed the ability of sellers and customers to comment on product reviews and purged their websites of all posted product review comments.or reviewers which indicates the real name of the reviewer (based on confirmation of a credit card account) or which indicates that the reviewer is one of the top reviewers by popularity. As of December 16, 2020, Amazon removed the ability of sellers and customers to comment on product reviews and purged their websites of all posted product review comments. In an email to sellers Amazon gave its rationale for removing this feature: The remaining review response options are to indica</p>
                  
//               </div>
//               <div className="shasinternshipinfo">
//                   <p className="parastrong">Internship Information</p>
//                   <div className="interncard">
//                       <div className="shashitopic">
//                       <p id="ppp1">project1</p>
//                             <p id="ppp2">Audio System Engineer,Pixel</p>
//                       </div>
//                       <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla debitis, incidunt exercitationem aliquam perferendis aperiam dolorem nemo velit modi minima commodi? Exercitationem, accusamus?</p>
//                   <>
//               {[
//                     "Java",
//                     "Python",
//                     "C++"
//                 ] && [
//                     "Java",
//                     "Python",
//                     "C++"
//                 ].length > 0 ? (
//                   <div className="internshipJob_card_skillRoot">
//                       <strong>Required:</strong>{[
//                     "Java",
//                     "Python",
//                     "C++"
//                 ].map((skill, i) => (
//                           <div className="internshipJob_card_skill" key={i}>
//                               {skill}
//                           </div>
//                       ))}
//                   </div>
//               ) : (
//                   "No skills"
//               )}
//           </>
//                   </div>
//                   <div className="interncard">
//                   <div className="shashitopic">
                            

//                             <p id="ppp1">project2</p>
//                             <p id="ppp2">Audio System Engineer,Pixel</p>
//                         </div>
//                       <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla debitis, incidunt exercitationem aliquam perferendis aperiam dolorem nemo velit modi minima commodi? Exercitationem, accusamus?</p>
//                   <>
//               {[
//                     "Java",
//                     "Python",
//                     "C++"
//                 ] && [
//                   "Java",
//                   "Python",
//                   "C++"
//               ].length > 0 ? (
//                   <div className="internshipJob_card_skillRoot">
//                       <strong>Required:</strong>{[
//                     "Java",
//                     "Python",
//                     "C++"
//                 ].map((skill, i) => (
//                           <div className="internshipJob_card_skill" key={i}>
//                               {skill}
//                           </div>
//                       ))}
//                   </div>
//               ) : (
//                   "No skills"
//               )}
//           </>
//                   </div>
          
              
//               </div>
//               <div className="moreintern">
              
//               <Link to="/Internship/moreinternship"><p>See All Internship Posted </p></Link>
              
              
              
//               </div>
//               <div className="shascomment">
//                   <p className="parastrong">Comment From Us</p>
//                   <p>m ipsum dolor sit amet consectetur, adipisicing elit. Nulla debitis, incidunt exercitationem aliquam perferendis aperiam dolorem nemo velit modi minima commodi? Exercitation</p>
                  
//               </div>
//           </div>
//       </Card>
//   );
// };

// const Jobs1 = ({
//   internshipDetails,
//   index,
//   editHandler,
// }) => {
//   // const {
//   //     title,
//   //     attachmentURL,
//   //     skills,
//   //     createDate,
//   //     location,
//   //     status,
//   //     industry,
//   //     jobId,
//   //     icon,
//   //     numberOfLikes
//   // } = internshipDetails;
//   //adding like button feature.
//   const description =" is a super application that includes 68 high qualityscreens to help you launch digital wallet application projects and speed up your design process. Designed on 2 leading platforms Sketch & Figma makes it easy to customize to create impressive projects weee I am longer show more please CaPay is a super application that includes 68 high qualityscreens to help you launch digital wallet application projects and speed up your design process. Designed on 2 leading platforms Sketch & Figma makes it easy t"
//   const [like, setLike] = useState(34),
//   [isLiked, setIsLiked] = useState(false),
//   onLikeButtonClick = () => {
//       setLike(like+(isLiked ? -1 : 1));
//       setIsLiked(!isLiked);
//   }
//   //adding show more feature
//   const [showMore, setShowMore] = useState(false);
//   const getText = () => {
//       // For Text that is shorter than desired length
//       if (description.length <= 258) return description;
//       // If text is longer than desired length & showMore is true
//       if (description.length > 258 && showMore) {
//         return (
//           <>
//             <p>{description}</p>
  
//             <button
//               onClick={() => setShowMore(false)}>
//               Show Less
//             </button>
//           </>
//         );
//       }
//        // If text is longer than desired length & showMore is false
//       if (description.length > 258) {
//         return (
//           <>
//             <p>{description.slice(0, 258)}</p>
  
//             <button
//               onClick={() => setShowMore(true)}>
//               Show Full Description
//             </button>
//           </>
//         );
//       }
//     };
//   return (
     
//       <Card
         
//           className="internshipJob_card_cardRoot"
//           size="small"
//           type="inner"
//           subtitle={
//             <>
//             <h1>All Internmship posted</h1>
//             </>
//           }
//           title={<>
//               <div>
//                   <img src="https://www.w3schools.com/images/w3schools_green.jpg" alt="icon" style={{ width: 25, height: 25}} />
//                   <strong className="ppp3">project 1</strong> <strong className="ppp4">this is intern 1</strong>
//                   <p className={""+(isLiked ? "text-primary" : "")}>
//                       <i style={{fontSize: "20px",float:"right"}} class="fa fa-thumbs-up" onClick={onLikeButtonClick}></i>
//                       <br></br>
//                       <p className="text-dark" style={{float:"right"}}>Like:{like}</p>
//                   </p>
//               </div>
//               <div className="column-container">
//               <div className="newcolumn">Industry: web devlopment</div>
//               <div className="newcolumn">Website:<a href="https://www.google.com">https://www.google.com</a></div>
//               </div>
//           </>}
//           style={{ marginBottom: 15 }}
//           extra={
//               <div style={{ display: "flex" }}>

//                   <span>

//                   </span>

//               </div>
//           }
//           actions={[

//               <div style={{ display: "flex", justifyContent: "center" }} key={2}>
//                   <PaperClipOutlined style={{ fontSize: 20, marginRight: 10 }} />
//                   <span>Number of Openings: {4 || "Not available"} </span>
//               </div>,
//               <div style={{ display: "flex", justifyContent: "center" }} key={3}>
//                   <EnvironmentOutlined style={{ fontSize: 20, marginRight: 10 }} />
//                   <span>Location: {"Banglore" || "Not available"} </span>
//               </div>,
//               <div style={{ display: "flex", justifyContent: "center" }} key={4}>
//                   <span
//                       className="internshipJob_card_createDate"
//                       style={{ marginRight: 10 }}
//                   >
//                       Posted on:
//                   </span>
//                   17 march 2023
//               </div>,
//           ]}
//       >
//           <>
//               <div className="jobCard_title">Required technical skills:</div>
//               {[
//                     "Java",
//                     "Python",
//                     "C++"
//                 ] && [
//                   "Java",
//                   "Python",
//                   "C++"
//               ].length > 0 ? (
//                   <div className="internshipJob_card_skillRoot">
//                       {[
//                     "Java",
//                     "Python",
//                     "C++"
//                 ].map((skill, i) => (
//                           <div className="internshipJob_card_skill" key={i}>
//                               {skill}
//                           </div>
//                       ))}
//                   </div>
//               ) : (
//                   "No skills"
//               )}
//           </>
//           <div className="internshipJob_card_description" style={{color:"black"}}>{getText()}</div>
//       </Card>
//   );
// };

// const mapStateToProps = (state) => ({
//   jobPostings: state.galkLab.allJobList,
//   user: state.firebase.profile,
//   isUserAuthenticated: state.firebase.auth.uid ? true : false,
//   isLoading: getJobListLoadingStatus(state),
// });

// export default connect(mapStateToProps, {
//   getAllJobs,
// })(Individual_companty,Jobs1);



{/* <Card */}
            // className="internshipJob_card_cardRoot"
            // size="small"
            // type="inner"
            
            // title={<>
                
            //     <div>
            //         <strong className="ppp3">project 1</strong> <strong className="ppp4">this is intern 1</strong>
            //         <p className={""+(isLiked ? "text-primary" : "")}>
            //             <i style={{fontSize: "20px",float:"right"}} class="fa fa-thumbs-up" onClick={onLikeButtonClick}></i>
            //             <br></br>
            //             <p className="text-dark" style={{float:"right"}}>Like:{like}</p>
            //         </p>
            //     </div>
            //     <div className="column-container">
            //     <div className="newcolumn">Industry: web devlopment</div>
            //     <div className="newcolumn">Website:<a href="https://www.google.com">https://www.google.com</a></div>
            //     </div>
            // </>}
            // style={{ marginBottom: 15 }}
            // extra={
            //     <div style={{ display: "flex" }}>
  
            //         <span>
  
            //         </span>
  
            //     </div>
            // }
            // actions={[
  
            //     <div style={{ display: "flex", justifyContent: "center" }} key={2}>
            //         <PaperClipOutlined style={{ fontSize: 20, marginRight: 10 }} />
            //         <span>Number of Openings: {4 || "Not available"} </span>
            //     </div>,
            //     <div style={{ display: "flex", justifyContent: "center" }} key={3}>
            //         <EnvironmentOutlined style={{ fontSize: 20, marginRight: 10 }} />
            //         <span>Location: {"Banglore" || "Not available"} </span>
            //     </div>,
            //     <div style={{ display: "flex", justifyContent: "center" }} key={4}>
            //         <span
            //             className="internshipJob_card_createDate"
            //             style={{ marginRight: 10 }}
            //         >
            //             Posted on:
            //         </span>
            //         17 march 2023
            //     </div>,
            // ]}
        // ></Card>



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

const Jobs = ({
    companyDetails,
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
    } = companyDetails;
    //adding like button feature.
    const [like, setLike] = useState(numberOfLikes),
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
    return (
        <Card
            className="internshipJob_card_cardRoot"
            size="small"
            type="inner"
            title={<>
                <div>
                    <img src={icon} alt="icon" style={{ width: 25, height: 25}} />
                    <a href={attachmentURL} target="_blank"><strong>{title}</strong></a>
                    <p className={""+(isLiked ? "text-primary" : "")}>
                        <i style={{fontSize: "20px",float:"right"}} class="fa fa-thumbs-up" onClick={onLikeButtonClick}></i>
                        <br></br>
                        <p className="text-dark" style={{float:"right"}}>Like:{like}</p>
                    </p>
                </div>
                <div className="column-container">
                <div className="newcolumn">Industry: {industry}</div>
                <div className="newcolumn">Website:<a href={attachmentURL}>{attachmentURL}</a></div>
                </div>
            </>}
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
                    <span>Number of Openings: {status || "Not available"} </span>
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
            <div className="internshipJob_card_description" style={{color:"black"}}>{getText()}</div>
        </Card>
        
    );
};

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps, {})(Jobs);
