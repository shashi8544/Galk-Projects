import React, { useState, useEffect } from "react";
import { database } from "../../../../utils/configs/firebaseConfig";
import { connect } from "react-redux";
import './result.css';
import defaultPic from "../../../../assets/images/defaultStudentPic.jpeg"
import XLSX from 'xlsx';

const Result = (props) => {
  const [studentData, setStudentData] = useState([]);
  const [passedStudents, setPassedStudents] = useState([]);
  const [failedStudents, setFailedStudents] = useState([]);
  const [notDecidedStudents, setNotDecidedStudents] = useState([]);
  let [filteredStudents, setFilteredStudents] = useState([]);
  const [defaultResult, setDefaultResult] = useState(0);
  const { userid } = props;

  useEffect(() => {
    let _studentData = [];
    database
      .collection("AdminProfiles")
      .doc(userid)
      .collection("QuickInterviewSelectedSlots")
      .get()
      .then((snapShot) => {
        snapShot.forEach((doc) => {
          const _data = doc.data();
          _studentData.push({
            result: _data.Result,
            monthYear: _data.MonthYear,
            name: _data.StudentData.Name,
            collegeName: _data.StudentData.CollegeName,
            profileID: _data.StudentData.ProfileID,
            profileURL: _data.StudentData.ProfileURL,
            timestamp: _data.TimeStamp,
            docId: doc.id, // Add the document ID for each student data
            skills: _data.StudentData.Skills,
            major: _data.StudentData.Major
          });
        });

        _studentData.sort((a, b) => b.timestamp - a.timestamp);
        setStudentData(_studentData);
      });
  }, []);

  useEffect(() => {
    if (studentData) {
      const passedStudents = [];
      const failedStudents = [];
      const notDecidedStudents = [];

      studentData.forEach((student) => {
        if (student.result === -1) {
          failedStudents.push(student);
        } else if (student.result === 1) {
          passedStudents.push(student);
        } else if (student.result === 0) {
          notDecidedStudents.push(student);
        }
      });

      setPassedStudents(passedStudents);
      setFailedStudents(failedStudents);
      setNotDecidedStudents(notDecidedStudents);

      const updatedFilteredStudents = (defaultResult === 1) ? passedStudents : (defaultResult === -1) ? failedStudents : notDecidedStudents;
      setFilteredStudents(updatedFilteredStudents);
      console.log(updatedFilteredStudents);
    }
  }, [studentData]);

  const moveToPass = (student) => {
    // Change the result value to 1 (passed)
    const updatedStudentData = studentData.map((s) => {
      if (s.docId === student.docId) {
        return {
          ...s,
          result: 1
        };
      }
      return s;
    });

    // Update the database with the modified student data
    database
      .collection("AdminProfiles")
      .doc(userid)
      .collection("QuickInterviewSelectedSlots")
      .doc(student.docId)
      .update({ Result: 1 })
      .then(() => {
        setStudentData(updatedStudentData);
        console.log("Student moved to pass.");
        updatedList();
      })
      .catch((error) => {
        console.log("Error updating student data:", error);
      });

      
  };

  const updatedList = () => {
  }

  const moveToFail = (student) => {
    // Change the result value to 1 (passed)
    const updatedStudentData = studentData.map((s) => {
      if (s.docId === student.docId) {
        return {
          ...s,
          result: -1
        };
      }
      return s;
    });

    
      database
      .collection("AdminProfiles")
      .doc(userid)
      .collection("QuickInterviewSelectedSlots")
      .doc(student.docId)
      .update({ Result: -1 })
      .then(() => {
        setStudentData(updatedStudentData);
        console.log("Student moved to fail.");
      })
      .catch((error) => {
        console.log("Error updating student data:", error);
      });
    };
    

  const formatTime = (timestamp) => {
		const date = new Date(timestamp * 1000); // Convert timestamp to milliseconds
		let hours = date.getHours();
		let minutes = date.getMinutes();
		let period = 'am';
	  
		// Convert to 12-hour format
		if (hours > 12) {
		  hours -= 12;
		  period = 'pm';
		}
	  
		// Add leading zero to minutes if necessary
		if (minutes < 10) {
		  minutes = `0${minutes}`;
		}
	  
		return `${hours}:${minutes}${period}`;
	};
  function exportToExcel(){
      // Prepare data to be exported as an Excel file
      import('xlsx').then((XLSX)=> {
        const data = filteredStudents.map((student) => [student.name, student.collegeName, student.major, student.skills.toString()]);
    
      // Create a new workbook and sheet
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.aoa_to_sheet(data);
    
      // Add the sheet to the workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet 1");
    
      // Generate a download link for the Excel file
      const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
      const excelData = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
      const excelUrl = URL.createObjectURL(excelData);
      const link = document.createElement("a");
      link.href = excelUrl;
      link.download = "data.xlsx";
      link.click();
    
      // Clean up the temporary URL object
      URL.revokeObjectURL(excelUrl);
      })
    }
    
  function handleClick(){
    var buttons = document.querySelectorAll('.btn');
    buttons.forEach(function(button) {
      button.addEventListener('click', function() {
        buttons.forEach(function(btn) {
          btn.classList.remove('selected');
          btn.classList.add('not-selected');
        });
        button.classList.remove('not-selected');
        button.classList.add('selected');
      });
    });
  }
  
  function showStudents(result) {
    var resultsElement = document.getElementById("results");
    resultsElement.innerHTML = "";
    if(result === 0)  filteredStudents = notDecidedStudents;
    else if(result === 1) filteredStudents = passedStudents;
    else if(result === -1) filteredStudents = failedStudents;
    else{
      result = 0;
      filteredStudents = notDecidedStudents;
    };
    setDefaultResult(result);
    setFilteredStudents(filteredStudents);
 }
 function skillString(skills){
  var s = "-";
  if(skills !== undefined && skills !== null)
  {
    s = skills.toString(); 
  }
  return s;
 }
 console.log("Default Result: ", defaultResult);
  return (
    <div>
      <div id="buttonContainer">
        {handleClick()}
        <button className="btn selected" id="notYet" onClick={() => showStudents(0)}>Not Yet</button>
        <button className="btn not-selected" id="pass" onClick={() => showStudents(1)}>Pass</button>
        <button className="btn not-selected" id="fail" onClick={() => showStudents(-1)}>Fail</button><br /><br />
        <button className="btnExport" id="exportToExcel" onClick={() => exportToExcel()}>Export to Excel</button>
      </div>
      <div id="rectangleBox">
        <div id="results"></div>
        {
            filteredStudents.map((student) => {
              return (
                <div className="scrollContainer">
                <li key={student.profileID} className="container">
                  <div className="timeStamp">
                    <span className="time">
                      {formatTime(student.timestamp.seconds)} IST
                    </span>
                    <hr className="divider" />
                  </div>
                  <div id="details">
                    <img src={student.profileURL || defaultPic} className="profilePic" />
                    <div id="name">
                      <span className="header">Name</span>
                      <span className="detail">{student.name}</span>
                    </div>
                    <div id="collegeName">
                      <span className="header">College Name</span>
                      <span className="detail">{student.collegeName}</span>
                    </div>
                    <div id="major">
                      <span className="header">Major</span>
                      <span className="detail">{student.major}</span>
                    </div>
                    <div id="skills">
                      <span className="header">Skills</span>
                      <span className="detail">{skillString(student.skills)}</span>
                    </div>
                    <div className="actions">
                      {defaultResult === 0 && (
                        <>
                          <button onClick={() => moveToFail(student)} className={student.result === -1 ? "btn2" : "btn1"}>Fail</button>
                          <button onClick={() => moveToPass(student)} className={student.result === 1 ? "btn2" : "btn1"}>Pass</button>
                        </>
                      )}
                      {defaultResult === 1 && (
                        <button onClick={() => moveToFail(student)} className="btn3">Move to Fail</button>
                      )}
                      {defaultResult === -1 && (
                        <button onClick={() => moveToPass(student)} className="btn3">Move to Pass</button>
                      )}
                    </div>

                  </div>
                </li>
                </div>
              );
            })
        }
      </div>
      
    </div>
  );
};


const mapStateToProps = (state) => ({
  userid: state.firebase.auth.uid
});

export default connect(mapStateToProps, {})(Result);
