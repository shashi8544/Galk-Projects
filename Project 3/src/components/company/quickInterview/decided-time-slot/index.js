import React, { useState, useEffect } from "react";
import { database } from "../../../../utils/configs/firebaseConfig";
import { connect } from "react-redux";
import "./decidedTimeSlot.css";
import defaultPic from "../../../../assets/images/defaultStudentPic.jpeg"

const createStudentData = (studentData) => {
  const studentMap = new Map();

  studentData.forEach((student) => {
    const timestamp = student.timestamp;
    const timestampDate = new Date(timestamp.seconds * 1000);

    const year = timestampDate.getFullYear();
    const month = timestampDate.getMonth() + 1;
    const day = timestampDate.getDate();

    if (!studentMap.has(year)) {
      studentMap.set(year, new Map());
    }

    const yearMap = studentMap.get(year);
    if (!yearMap.has(month)) {
      yearMap.set(month, new Map());
    }

    const monthMap = yearMap.get(month);
    if (!monthMap.has(day)) {
      monthMap.set(day, []);
    }

    const dayArray = monthMap.get(day);
    dayArray.push(student);
  });

  return studentMap;
};

const DecidedTimeSlot = (props) => {
	const [studentData, setStudentData] = useState(null);
	const [mapStudents, setMapStudents] = useState(null);
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [todayStudents, setTodayStudents] = useState([]);
	const [tomorrowStudents, setTomorrowStudents] = useState([]);
  
	const { userid } = props;
  
	useEffect(() => {
	  let unsubscribe = null;
	  if (userid) {
		unsubscribe = database
		  .collection("AdminProfiles")
		  .doc(userid)
		  .collection("QuickInterviewSelectedSlots")
		  .onSnapshot((snapshot) => {
			const _studentData = [];
			snapshot.forEach((doc) => {
			  const _data = doc.data();
			  _studentData.push({
				result: _data.Result,
				monthYear: _data.MonthYear,
				name: _data.StudentData.Name,
				collegeName: _data.StudentData.CollegeName,
				profileID: _data.StudentData.ProfileID,
				profileURL: _data.StudentData.ProfileURL,
				timestamp: _data.TimeStamp,
				docId: doc.id,
			  });
			});
  
			_studentData.sort((a, b) => b.timestamp - a.timestamp);
			setStudentData(_studentData);
		  });
	  }
  
	  return () => {
		if (unsubscribe) {
		  unsubscribe();
		}
	  };
	}, [userid]);
  
	useEffect(() => {
	  if (studentData) {
		const mappedData = createStudentData(studentData);
		setMapStudents(mappedData);
	  }
	}, [studentData]);
  
	useEffect(() => {
	  if (mapStudents && selectedDate) {
		
		const todayStudents =
		  mapStudents
			.get(selectedDate.getFullYear())
			?.get(selectedDate.getMonth() + 1)
			?.get(selectedDate.getDate()) || [];
		const tomorrowStudents =
		  mapStudents
			.get(selectedDate.getFullYear())
			?.get(selectedDate.getMonth() + 1)
			?.get(selectedDate.getDate()+1) || [];
  
		setTodayStudents(todayStudents);
		setTomorrowStudents(tomorrowStudents);
	  }
	}, [mapStudents, selectedDate]);
  
	const handlePreviousDay = () => {
	  const previousDay = new Date(selectedDate);
	  previousDay.setDate(previousDay.getDate() - 1);
	  setSelectedDate(previousDay);
	};
  
	const handleNextDay = () => {
	  const nextDay = new Date(selectedDate);
	  nextDay.setDate(nextDay.getDate() + 1);
	  setSelectedDate(nextDay);
	};
  
	const formatDay = (date) => {
		const options = { weekday: "short" };
		return date.toLocaleDateString("en-US", options);
	  };
	  
	const formatDateNumber = (date) => {
	const options = { day: "numeric" };
	return date.toLocaleDateString("en-US", options);
	};
  
	const formatMonthYear = (date) => {
		const options = { year: "numeric", month: "2-digit" };
		const formattedDate = date.toLocaleDateString("en-US", options);
		const [month, year] = formattedDate.split("/");
		return `${year}/${month}`;
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

	  const handlePass = (student) => {
		console.log(defaultPic)
		const updatedStudentData = studentData.map((s) => {
		  if (s.docId === student.docId) {
			return {
			  ...s,
			  result: 1,
			};
		  }
		  return s;
		});
	  
		database
		  .collection("AdminProfiles")
		  .doc(userid)
		  .collection("QuickInterviewSelectedSlots")
		  .doc(student.docId)
		  .update({ Result: 1 })
		  .then(() => {
			setStudentData(updatedStudentData);
			console.log("Student moved to pass.");
		  })
		  .catch((error) => {
			console.log("Error updating student data:", error);
		  });
	  };
	  
	  const handleFail = (student) => {
		const updatedStudentData = studentData.map((s) => {
		  if (s.docId === student.docId) {
			return {
			  ...s,
			  result: -1,
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

	  const sortedStudentsToday = [...todayStudents].sort(
		(a, b) => a.timestamp.seconds - b.timestamp.seconds
	  );
	  const sortedStudentsTomorrow = [...tomorrowStudents].sort(
		(a, b) => a.timestamp.seconds - b.timestamp.seconds
	  );
	
	  function exportToExcel(){
		// Prepare data to be exported as an Excel file
		import('xlsx').then((XLSX)=> {
		  const data = sortedStudentsToday.map((student) => [student.name, student.collegeName, student.result]);
		  const data2 = sortedStudentsTomorrow.map((student) => [student.name, student.collegeName, student.result]);

		// Create a new workbook and sheet
		const workbook = XLSX.utils.book_new();
		const worksheet = XLSX.utils.aoa_to_sheet(data);
		const worksheet2 = XLSX.utils.aoa_to_sheet(data2);
		// Add the sheet to the workbook
		XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet 1");
		XLSX.utils.book_append_sheet(workbook, worksheet2, "Sheet 2");
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

	return (	
			<div class="container">
				<div class="date-but">
					<div class="left-content">
						<button onClick={handlePreviousDay} class="prev-btn">&lt;</button>
						<button onClick={handleNextDay} class="next-btn">&gt;</button>
						<span class="date">{formatMonthYear(selectedDate)}</span>
					</div>
					<div class="right-content">
						<button class="button1" onClick={() => exportToExcel()}>Export to Excel</button>
						<button class="button2">Go to Meeting</button>
					</div>
				</div>
				<div class="dates-container">
					<div class="day">
						<span class="day-name">{formatDay(selectedDate)}</span>
						<span class="day-date">{formatDateNumber(selectedDate)}</span>
						<div className="scroll-container">
						 	  {sortedStudentsToday.map((student) => (
						 		<li key={student.profileID} class="box-container">
									<div class="datee">
									<span class="time">{formatTime(student.timestamp.seconds)} ist</span>
									<hr class="divider" />
									</div>
									<div class="content">
										<img src={student.profileURL || defaultPic} alt="Profile Image" class="image" />
										<div class="info-name">
											<span class="name">Name</span>
											<span class="Sname">{student.name}</span>
										</div>
										<div class="info-college">
											<span class="name">College name</span>
											<span class="Sname">{student.collegeName}</span>
										</div>
										<div className="actions">
											<button onClick={() => handleFail(student)} className={student.result === -1 ? "btn2" : "btn1"}>Fail</button>
											<button onClick={() => handlePass(student)} className={student.result === 1 ? "btn2" : "btn1"}>Pass</button>
										</div>
									</div>
						 		</li>
						 	  ))}
						</div>
					</div>
					<div class="day">
						<span class="day-name">{formatDay(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate() + 1))}</span>
						<span class="day-date">{formatDateNumber(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate() + 1))}</span>
						<div className="scroll-container">
						 	  {sortedStudentsTomorrow.map((student) => (
						 		<li key={student.profileID} class="box-container">
									<div class="datee">
									<span class="time">{formatTime(student.timestamp.seconds)} ist</span>
									<hr class="divider" />
									</div>
									<div class="content">
									<img src={student.profileURL || defaultPic} alt="Profile Image" class="image" />
										<div class="info-name">
											<span class="name">Name</span>
											<span class="Sname">{student.name}</span>
										</div>
										<div class="info-college">
											<span class="name">College name</span>
											<span class="Sname">{student.collegeName}</span>
										</div>
										<div className="actions">
										<button onClick={() => handleFail(student)} className={student.result === -1 ? "btn2" : "btn1"}>Fail</button>
										<button onClick={() => handlePass(student)} className={student.result === 1 ? "btn2" : "btn1"}>Pass</button>
										</div>
									</div>
						 		</li>
						 	  ))}
						</div>
					</div>
				</div>
			</div>
	);
  };
  
  const mapStateToProps = (state) => ({
	userid: state.firebase.auth.uid,
  });
  
  export default connect(mapStateToProps)(DecidedTimeSlot);