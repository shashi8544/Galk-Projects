import React, { useState, useEffect } from "react";
import "./LinkModal.css";
import { connect } from "react-redux";
import { getMeetingLink,updateMeetingLink,handleConfirm } from "../../../../actions/quickInterviewActions";
const LinkModal = (props) => {
  const  {  getMeetingLink, updateMeetingLink, userId,isModalDisplayed, handleConfirm, meetingLink } = props
//   const [showModal, setShowModal] = useState(true);
// import isModalDisplayed 
//   const handleConfirm = () => {
//     onConfirm();
//     setShowModal(false);
//   };


  useEffect(() => {
    getMeetingLink(userId);
  }, [])
//   useEffect(() => {
//     const fetchMeetingLink = async () => {
//         const link = await getMeetingLink(userId);
//         console.log("useeffect")
//         console.log(link);
//         setMeetingLink(link);
//       };fetchMeetingLink();

    
//   }, [getMeetingLink, userId]);

  const handleLinkUpdate = async (e) => {
    e.preventDefault()
    const answerInput = document.getElementById("Link021");
  const answer = answerInput.value.trim();
  if (answer !== "") {
    console.log(answer)
    await updateMeetingLink(userId, answer);
    
    answerInput.value = "";
  }
  handleConfirm();
    
    
  };

  console.log("here it is");
  console.log(userId);
  console.log(meetingLink);
  return (
    <>
      {isModalDisplayed && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p className="card-info">Edit the Link for Interview</p>
            <div className="input-container">
                {/* <p>{meetingLink}</p> */}
                {/* <p>Hello</p> */}
                <input
                  type="text"
                  placeholder={meetingLink}
                  className="link-input"
                  id="Link021"
              /><a href={meetingLink} target="_blank">Join</a>     
              </div>
              {/* <button className="button-with-dot">
      <span className="dot blue-dot"></span>
      <span className="dot orange-dot"></span>
      hello
    </button> */}
              {/* <button className="button-with-dot">
                Button
                <span className="dot"></span>
              </button> */}
         
              <div className="bcont">
              <button className="button-modal" onClick={handleLinkUpdate}>
                OK
              </button>
              </div>
              {/* <button className="button-modal" onClick={(e) => {
                e.preventDefault();
                handleConfirm();
              }}>
                Return to Main Menu
              </button> */}
            
          </div>
        </div>
      )}
    </>
  );
};
const mapStateToProps = (state) => ({
    userId: state.firebase.auth.uid,
    // isLoading: state.quickInterview.isLoading,
    // currentWeek: state.quickInterview.currentWeek,
    // daysOfWeek: state.quickInterview.daysOfWeek,
    meetingLink: state.quickInterview.meetingLink,
    isModalDisplayed: state.quickInterview.isModalDisplayed,
    // slotsData: state.quickInterview.slotsData
  });
  
  export default connect(mapStateToProps, {
    // getSlotsData,
    // goToPreviousWeekB,
    // goToNextWeekB,
    getMeetingLink,
    updateMeetingLink,
    handleConfirm
    // updateSlotData,
  })(LinkModal);
// export default LinkModal;