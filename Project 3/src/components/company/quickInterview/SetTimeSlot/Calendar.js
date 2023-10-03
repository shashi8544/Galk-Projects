import React, { useState, useEffect } from "react";
import moment from "moment";
import "./Calendar.css";
import { connect } from "react-redux";
import Loading from "../../../common/loading";
import LinkModal from "./LinkModal";
import {
  getSlotsData,
  goToPreviousWeekB,
  goToNextWeekB,
  getMeetingLink,
  updateMeetingLink,
  updateSlotData,
  handleConfirm,
  handleConfirm2,
  calculateDaysOfWeek,
} from "../../../../actions/quickInterviewActions";
import { isLoaded } from "react-redux-firebase";

// import region fro
const Calendar = (props) => {
  const {
    slotsData,
    userId,
    getMeetingLink,
    getSlotsData,
    isLoading,
    currentDateIndex,
    goToPreviousWeekB,
    goToNextWeekB,
    // currentWeek,
    // daysOfWeek,
    updateMeetingLink,
    updateSlotData,
    meetingLink,
    handleConfirm,
    handleConfirm2,
    isModalDisplayed,
  } = props;

  const [currentWeek, setCurrentWeek] = useState(moment());
  const [showModal, setShowModal] = useState(null);
  const goToPreviousWeek = () => {
    // goToPreviousWeekB(currentWeek);
    setCurrentWeek(moment(currentWeek).subtract(1, "week"));
  };
  // slotsData = getSlotsData();
  const goToNextWeek = () => {
    // goToNextWeekB(currentWeek);
    setCurrentWeek(moment(currentWeek).add(1, "week"));
  };

  const displayMonthYear = currentWeek.format("YYYY/MM");

  // Generate an array of 7 days in the current week
  const daysOfWeek = [];
  let startOfWeek = moment(currentWeek).startOf("week");
  for (let i = 0; i < 7; i++) {
    daysOfWeek.push(moment(startOfWeek));
    startOfWeek.add(1, "day");
  }

  // Get the array of hourly divisions
  const hourlyDivisions = [];
  const startHour = moment().startOf("day").hour(8);
  const endHour = moment().startOf("day").hour(23);
  let currentHour = startHour.clone();

  while (currentHour.isSameOrBefore(endHour)) {
    hourlyDivisions.push(currentHour.format("H:mm"));
    currentHour.add(1, "hour");
  }

  // console.log(hourlyDivisions);
  
  
  useEffect(() => {
    setCurrentWeek(moment()); // Initialize currentWeek to the current week on component mount
    getSlotsData(userId, daysOfWeek)
  }, []);
  const [isWeekChanged, setWeekChanged] = useState(0);

  useEffect(() => {
    if (isWeekChanged) {
      goToNextWeek();
      setWeekChanged(0);
    }
  }, [isWeekChanged]);

  const currentDate = moment();
  // Render the calendar
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedHour, setSelectedHour] = useState(null);
  const [showSubDivisions, setShowSubDivisions] = useState(false);

  const handleDateClick = (date) => {
    if (selectedDate === date) {
      setSelectedDate(null);
      setSelectedHour(null);
      setShowSubDivisions(false);
    } else {
      setSelectedDate(date);
      setSelectedHour(null);
      setShowSubDivisions(false);
    }
  };
  const isCheckboxChecked = (date, hour) => {
    let h = selectedHour;
    if(selectedHour.length === 1)h = `0${h}`;
    const intervals = ["00", "15", "30", "45"];
    const [a, b, c, d] = intervals.map((minute) => `${h}:${minute}`);
    let f = 0;

    let dt = selectedDate.format("YYYYMMDD")
    intervals.forEach((minute) => {
      const timeslot = `${h}:${minute}`;
      if(slotsData[dt] && slotsData[dt][timeslot]===true)f+=1;
      if(slotsData[dt] && slotsData[dt][timeslot] === false)f+=1;
    });
    // console.log("f",f)
    if(f===4){
      return true;
    }return false;
  };
  let msa = 0;
  const handleCheckboxClick = (event) => {
    // Handle checkbox click event here
    // setShowSubDivisions(true);
    msa+=1;
    if(msa===2){handleCancelClick2();msa=0;}
    event.stopPropagation();

    let h = selectedHour;
    if(selectedHour.length === 1)h = `0${h}`;
    const intervals = ["00", "15", "30", "45"];
    const [a, b, c, d] = intervals.map((minute) => `${h}:${minute}`);
    // if(!slotsData[date])return 0; // neither blue nor orange
    let array = [];
    let f = 0;

    let dt = selectedDate.format("YYYYMMDD")
    intervals.forEach((minute) => {
      const timeslot = `${h}:${minute}`;
      if(slotsData[dt] && slotsData[dt][timeslot]===true)f+=1;
      if(slotsData[dt] && slotsData[dt][timeslot] === false)f+=1;
    });
    // console.log("f",f)
    if(f===4){
      //deselect logic
      intervals.forEach((minute)=>{
        const timeslot = `${h}:${minute}`
        if(slotsData[dt] && slotsData[dt][timeslot]!==true){
          // console.log("hi",minute);
          var timeslotButton = document.getElementById(minute);
          // if (showButtons && timeslotButton.classList.contains("hb1")) {
          //   timeslotButton.classList.remove("hb1");
          //   timeslotButton.classList.add("hb2");
          // } 
          // else
           if (showButtons && timeslotButton.classList.contains("hb2")) {
            timeslotButton.classList.remove("hb2");
            timeslotButton.classList.add("hb1");
          }
        }
      })
      intervals.forEach((minute) => {
        const timeslot = `${h}:${minute}`;
        // Array = [dt,timeslot,1];
        array = []
        if(slotsData[dt] && slotsData[dt][timeslot] === false){
          dataArray.push(dt,timeslot,-1);
          newArray.push(dataArray);
          dataArray = [];
        // updateSlotData(userId,array,slotsData)
      }
  
      });
    }else{
      // setIsChecked(true);
      intervals.forEach((minute)=>{
        const timeslot = `${h}:${minute}`
        if(slotsData[dt] && slotsData[dt][timeslot]===true){
          console.log("a1");
        }else if(slotsData[dt] && slotsData[dt][timeslot]===false){
          console.log("hi",minute);
          var timeslotButton = document.getElementById(minute);
          if (showButtons && timeslotButton.classList.contains("hb1")) {
            timeslotButton.classList.remove("hb1");
            timeslotButton.classList.add("hb2");
          } 
          //  if (showButtons && timeslotButton.classList.contains("hb2")) {
          //   timeslotButton.classList.remove("hb2");
          //   timeslotButton.classList.add("hb1");
          // }
        }else{
          var timeslotButton = document.getElementById(minute);
          console.log("here",minute);
          if (showButtons && timeslotButton.classList.contains("hb1")) {
            timeslotButton.classList.remove("hb1");
            timeslotButton.classList.add("hb2");
          }

          // else  if (showButtons && timeslotButton.classList.contains("hb2")) {
          //   timeslotButton.classList.remove("hb2");
          //   timeslotButton.classList.add("hb1");
          // }
          
        }
      })
      intervals.forEach((minute) => {
        const timeslot = `${h}:${minute}`;
        if(slotsData[dt] && slotsData[dt][timeslot]===true)f+=1;
        else if(slotsData[dt] && slotsData[dt][timeslot] === false)f+=1;
        else {
          // Array = [dt,timeslot,1];
          dataArray.push(dt,timeslot,1);
          newArray.push(dataArray);
          dataArray = [];
        }
      });
    }
 
    
    // updateSlotData(userId,array,slotsData)
    // getSlotsData(userId,daysOfWeek);

    event.stopPropagation(); // Prevent button click event propagation
  };

  const handleHourClick = (event, date, hour) => {
    event.stopPropagation();
    if (selectedHour === hour) {
      setSelectedHour(null);
      setShowSubDivisions(false);
    } else {
      setSelectedDate(date);
      setSelectedHour(hour);
      setShowSubDivisions(true);
    }
  };

  
  const getFormattedHour = (hour) => {
    return hour.split(":")[0];
  };
  const getFormattedTime = (hour, minute, ampm) => {
    const formattedHour = hour % 12; // Convert to 12-hour format
    return `${formattedHour}:${minute}${ampm}`;
  };
  function checkTimeSlotAvailability(date, timeSlot) {
    if (timeSlot.length === 4) {
      timeSlot = `0${timeSlot}`;
    }
    if (slotsData[date] && slotsData[date][timeSlot]) {
      
      // if(!BlueDot)setBlueDot(true);
      return 1; // Value is true
    } else if (slotsData[date] && slotsData[date][timeSlot] === false) {
      // if(!OrangeDot)setOrangeDot(true);
      return 2; // Value is false
    } else {
      return 0; // Time slot not present in slotsData
    }
  }


  const convertTime = (timeString) => {
    const colonIndex = timeString.indexOf(":");
    const hour = parseInt(timeString.substring(0, colonIndex), 10);
    let convertedTime = "";
  
    if (hour > 12) {
      convertedTime = `${hour - 12}${timeString.substring(colonIndex)} PM ~ ist`;
    } else if (hour === 12) {
      convertedTime = `${hour}${timeString.substring(colonIndex)} PM ~ ist`;
    } else {
      convertedTime = `${hour}${timeString.substring(colonIndex)} AM ~ ist`;
    }
  
    return convertedTime;
  };

  const convertTime2 = (timeString) => {
    const colonIndex = timeString.indexOf(":");
    const hour = parseInt(timeString.substring(0, colonIndex), 10);
    let convertedTime = "";
  
    if (hour > 12) {
      convertedTime = `${hour - 12}${timeString.substring(colonIndex)} PM ist`;
    } else if (hour === 12) {
      convertedTime = `${hour}${timeString.substring(colonIndex)} PM ist`;
    } else {
      convertedTime = `${hour}${timeString.substring(colonIndex)} AM ist`;
    }
  
    return convertedTime;
  };

  const [showButtons, setShowButtons] = useState(false);
  const [updateButton,setShowUpdateButton] = useState(false);
  let newArray = [];
  let dataArray = [];
  const [timeButton, setShowTimeButton] = useState(false);
  
  var editButton = document.getElementById("editButton");


  const TimeUpdate = (timestamp,date,minute) => {
    // console.log("hello",timeslotButton.classList)
    var timeslotButton = document.getElementById(minute);
    if (showButtons && timeslotButton.classList.contains("hb1")) {
      timeslotButton.classList.remove("hb1");
      timeslotButton.classList.add("hb2");
      isCheckboxChecked()
    } else if (showButtons && timeslotButton.classList.contains("hb2")) {
      timeslotButton.classList.remove("hb2");
      timeslotButton.classList.add("hb1");
      isCheckboxChecked()
    }
  
    // Add your backend update logic here using the provided data
    
    // if(timeButton ){
    //   setShowTimeButton(false);
    //   // getSlotsData(userId,daysOfWeek)
    // }
    // else {
    //   setShowTimeButton(true);
    //   // getSlotsData(userId,daysOfWeek)
    // }
    // console.log("here",timeButton)
    if (timestamp.length === 4) {
      timestamp = `0${timestamp}`;
    }
    let f=0;
    if(slotsData[date]&&slotsData[date][timestamp]===true){
      f=1;
    }
    if(f===0){
      if(!slotsData[date]){
        dataArray.push(date);
        dataArray.push(timestamp);
        dataArray.push(1);
      }
      else if(slotsData[date][timestamp]===false){
        dataArray.push(date);
        dataArray.push(timestamp);
        dataArray.push(-1);
      }else {
        dataArray.push(date);
        dataArray.push(timestamp);
        dataArray.push(1);
      }
      if(showButtons){
        let isPresent = newArray.some((array) => JSON.stringify(array) === JSON.stringify(dataArray));

        if(isPresent){
          newArray = newArray.filter((array) => JSON.stringify(array) !== JSON.stringify(dataArray));

          // newArray = newArray.filter((element)=>element!==dataArray)
        }
        else {
          // console.log(newArray.indexOf(dataArray))
          newArray.push(dataArray)
        }
      }
      // console.log("newarray",showButtons)

      dataArray = [];
    }
  };
  

  const handleEditClick = () => {
    setShowButtons(true);
  };

  const handleUpdateClick = () => {
    setShowUpdateButton(true);
    // if(dataArray.length === 0)return;
    // const date = dataArray[0];
    // const timestamp = dataArray[1];
    // // console.log("good",slotsData[date][timestamp]);
    // if(slotsData[date] && slotsData[date][timestamp]){
    //   setShowUpdateButton(false);
    //   setShowButtons(false);
    //   dataArray = []
    //   newArray=[]
    //   return;
    // }
    // if(slotsData[date] && slotsData[date][timestamp]===false){
    //   dataArray.push(-1);
    //   newArray = [Array.from(dataArray)];
    //   updateSlotData(userId, newArray,slotsData)
    //   setShowUpdateButton(false);
    //   setShowButtons(false);
    //   dataArray = []
    //   newArray=[]
    //   getSlotsData(userId,daysOfWeek);
    //   return;
    // }
    // dataArray.push(1);
    // // console.log("action",dataArray);
    // newArray = [Array.from(dataArray)];
    console.log("newarrays",newArray);
    updateSlotData(userId, newArray,slotsData)
    setShowUpdateButton(false);
    setShowButtons(false)
    dataArray = []
    newArray=[]
    getSlotsData(userId,daysOfWeek);
    // Logic for update button click
  };
  const spancheck = (date,hour) =>{
    if(!slotsData)return [1,1];
    if(hour.length === 4)hour = `0${hour}`;
    hour = hour.slice(0,2);
    // console.log(hour, (date));
    // console.log(slotsData[date]);
    const intervals = ["00", "15", "30", "45"];
    const [a, b, c, d] = intervals.map((minute) => `${hour}:${minute}`);
    // if(!slotsData[date])return 0; // neither blue nor orange
    let blue = 0;
    let orange = 0;

    intervals.forEach((minute) => {
      const timeslot = `${hour}:${minute}`;
      if(date==='20230618'){
        // console.log("here",slotsData[date]);
        // console.log(timeslot);
      }
      if (slotsData[date] && slotsData[date][timeslot] === true) {
        blue = 1;
      } if (slotsData[date] && slotsData[date][timeslot] === false) {
        orange = 1;
      }
    });
    // if(date==='20230618')console.log(blue,orange);
    return [blue,orange];
  
  }
  const handleCancelClick = () => {
    setShowButtons(false);
    getSlotsData(userId,daysOfWeek)

    // Logic for cancel button click
  };
  const handleCancelClick2 = () => {
    // setShowButtons(false);
    getSlotsData(userId,daysOfWeek)

    // Logic for cancel button click
  };
  // const [Linkchange,SetLinkChange] = useState(false);
  return (
    <>
      {!isLoading && (
        <div className="calendar">
          <div className="navigation">
            <button
              className = 'prevnextbutton'
              onClick={async (e) => {
                e.preventDefault();
                goToPreviousWeek();
                goToPreviousWeekB(currentWeek);

                await getSlotsData(
                  userId,
                  calculateDaysOfWeek(moment(currentWeek).subtract(1, "week"))
                );
                // updateSlotData(userId, [["20230624", "14:00"], ["20230612", "09:00"], , ["20230601", "10:00"]], slotsData);
              }}
              // onClick={goToPreviousWeek}
            >
              &lt;
            </button>
            <button
              className = 'prevnextbutton'
              onClick={async(e) => {
                e.preventDefault();
                goToNextWeek();
                goToNextWeekB(currentWeek);
               
                await getSlotsData(
                  userId,
                  calculateDaysOfWeek(moment(currentWeek).add(1, "week"))
                );
              }}
            >
              &gt;
            </button>
            {/* <div className="current-month">{currentWeek.format('YYYY/MM')}</div> */}
            <span className="dispmonth">{displayMonthYear}</span>
            <div className="but">
            
            
              {!showButtons && (
                <div className="but">
                  <button
                    className="link-button"
                    onClick={(e) => {
                      e.preventDefault();
                      handleConfirm2();
                    }}
                  >
                    Edit the Link for interview
                  </button>
                  <button id="editButton" className="edit-button" onClick={handleEditClick}>Edit</button>
                </div>
              )}
              {showButtons && (
                <div className="but">
                  <button
                    className="link-button2"
                    onClick={(e) => {
                      e.preventDefault();
                      handleConfirm2();
                    }}
                  >
                    Edit the Link for interview
                  </button>
                  <button className="cancel-button" onClick={handleCancelClick}>Cancel</button>
                  <button className="update-button" onClick={handleUpdateClick}>Update</button>
                </div>
              )}
            </div>

            {isModalDisplayed && <LinkModal />}
          </div>
          <div className="week">
            {daysOfWeek.map((day) => (
              <div className="day-column" key={day.format("YYYY-MM-DD")}>
                <div className="day-header">
                  <span className="day-name">{day.format("ddd")}</span>
                  <span
                    className={
                      day.isSame(currentDate, "day")
                        ? "current-date"
                        : "day-date"
                    }
                  >
                    {day.format("D")}
                  </span>
                </div>
                <div className="hourly-divisions">
                  {hourlyDivisions.map((hour) => {
                    const formattedHour = getFormattedHour(hour);
                    // const ampm = getAMPM(hour);

                    return (
                      <div key={hour}>
                        <div className={isModalDisplayed ? "cdef" : "bcde"}>
                        <button
                          className='hb'
                          onClick={(event) => handleHourClick(event, day, formattedHour)}
                        >
                          <span className="button-text">{convertTime(hour)}</span>
                          {/* {convertTime(hour)} */}
                          {/* {selectedHour} */}
                          {showButtons&& selectedDate?.isSame(day, "day") && selectedHour===formattedHour && 
                          // <div>
                          //   {isCheckboxChecked}
                          // </div>
                          <input type="checkbox" defaultChecked={isCheckboxChecked()} className="checkbox" onClick={(event) => handleCheckboxClick(event)}/>}
                          
                        </button>
                        <span className={spancheck(day.format("YYYYMMDD"),hour)[1] === 1 ? 'dot' : ''}></span>
                        <span className={spancheck(day.format("YYYYMMDD"),hour)[0] === 1 && spancheck(day.format("YYYYMMDD"),hour)[1] === 1 ? 'dot2' : spancheck(day.format("YYYYMMDD"),hour)[0] === 1 ? 'dot3' : ''}></span>
                        
                        </div>
                        {/* {
                          BlueDot && (
                            <div><span className="dot"></span></div>
                          )
                        } */}
                        {selectedDate?.isSame(day, "day") &&
                          selectedHour === formattedHour &&
                          showSubDivisions && (
                            <div className="sub-divisions">
                              {["00", "15", "30", "45"].map((minute) => (
                                <button
                                  id = {minute}
                                  className={`hb ${
                                    checkTimeSlotAvailability(
                                      day.format("YYYYMMDD"),
                                      `${formattedHour}:${minute}`
                                    ) === 0
                                      ? "hb1"
                                      : checkTimeSlotAvailability(
                                          day.format("YYYYMMDD"),
                                          `${formattedHour}:${minute}`
                                        ) === 1
                                      ? "hb3"
                                      : checkTimeSlotAvailability(
                                          day.format("YYYYMMDD"),
                                          `${formattedHour}:${minute}`
                                        ) === 2
                                      ? "hb2"
                                      : ""
                                  }`}
                                  key={`${formattedHour}-${minute}`}
                                  onClick={() => TimeUpdate(`${formattedHour}:${minute}`,day.format("YYYYMMDD"),minute)}
                                  
                                >
                                  <span className="button-text2">
                                  {convertTime2(`${formattedHour}:${minute}`)}
                                  </span>
                                  {selectedDate?.isSame(day, "day") && selectedHour===formattedHour && checkTimeSlotAvailability(day.format("YYYYMMDD"),`${formattedHour}:${minute}`) === 1 && <span className="small-text">book</span>}

                                  {/* {} */}
                                </button>

                                // <button className="hb1" key={`${formattedHour}-${minute}`}>
                                //   {`${formattedHour}:${minute}`}
                                // </button>
                              ))}
                            </div>
                          )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {isLoading && <Loading/>}
    </>
  );
};
const mapStateToProps = (state) => ({
  userId: state.firebase.auth.uid,
  isLoading: state.quickInterview.isLoading,
  currentWeek: state.quickInterview.currentWeek,
  daysOfWeek: state.quickInterview.daysOfWeek,
  meetingLink: state.quickInterview.meetingLink,
  slotsData: state.quickInterview.slotsData,
  isModalDisplayed: state.quickInterview.isModalDisplayed,
});

export default connect(mapStateToProps, {
  getSlotsData,
  goToPreviousWeekB,
  goToNextWeekB,
  getMeetingLink,
  updateMeetingLink,
  updateSlotData,
  handleConfirm,
  handleConfirm2,
})(Calendar);
// export default Calendar;