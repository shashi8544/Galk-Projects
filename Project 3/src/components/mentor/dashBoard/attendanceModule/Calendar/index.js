import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import FillAttendance from "../FillAttendance";
import { approveTimesheetWeekly } from "../../../../../actions/mentorAction";
import { NOTIFICATION_STATES } from "../../../../../actions/types";
import { Button, Tag } from "antd";
import "./index.css";

const months = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];
const weekDays = [
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
	"Sunday",
	"Action",
];

const Calendar = ({
	selectedJob,
	clickedStudent,
	approveTimesheetWeekly,
	isSaving,
}) => {
	const datee = new Date();
	const [year, setYear] = useState(datee.getFullYear());
	const [month, setMonth] = useState(datee.getMonth());
	const [cal, setCal] = useState();
	const [isOpen, setIsOpen] = useState(false);
	const [selectedDate, setSelectedDate] = useState(null);

	useEffect(() => {
		let table = [];
		for (var i = 0; i < 6; ++i) {
			let temp = [];
			for (var j = 0; j < 7; ++j) temp.push(0);
			table.push(temp);
		}
		const date = new Date(year, month, 1);
		let day = date.getDay();
		if (day === 0) day = 7;
		let current = 1;
		for (let i = 0; i < 6; ++i) {
			for (let j = day - 1; j < 7; ++j) {
				if (new Date(year, month, current).getDate() === current)
					table[i][j] = current;
				++current;
			}
			day = 1;
		}
		setCal(table);
	}, [year, month]);

	const weekDaysJsx = weekDays.map((elm) => (
		<div
			className={`${
				elm != "Action"
					? "attendance-calendar-week-name"
					: "attendance-calendar-week-name-invert"
			}`}
			key={elm}
		>
			{elm}{" "}
		</div>
	));

	const goForword = (e) => {
		e.preventDefault();
		setMonth(month + 1);
	};

	const goBackword = (e) => {
		e.preventDefault();
		setMonth(month - 1);
	};

	const setDateFun = (date) => {
		const newDate = new Date(date);
		newDate.setHours(0, 0, 0, 0);
		setSelectedDate(newDate);
		setIsOpen(true);
	};

	const dateClick = (day) => {
		if (!day) return;
		let today = new Date();
		today.setHours(0, 0, 0, 0);
		today = today.getTime();
		const choosenDate = new Date(year, month, day, 0, 0, 0, 0).getTime();
		if (choosenDate > today) return;
		setDateFun(new Date(year, month, day).getTime());
	};

	const validBorder = (day) => {
		if (day) return true;
		return false;
	};

	const getOldData = (day) => {
		let date = new Date(year, month, day, 0, 0, 0, 0).getTime();
		const studenId = clickedStudent?.id;
		let timesheet = selectedJob?.timesheet;
		if (!timesheet) return null;
		let attendance = timesheet[studenId];
		if (!attendance) return null;
		let data = attendance[date];
		if (!data) return null;
		return data;
	};

	const approveTimeEntry = (e, index) => {
		const datesToApproveArr = cal[index];
		const uniqueIdArr = datesToApproveArr.map((dt) => {
			let timeData = getOldData(dt);
			return {
				key: new Date(year, month, dt, 0, 0, 0, 0).getTime(),
				task: timeData ? timeData.task : "",
				link: timeData ? timeData.link : "",
				time: timeData ? timeData.time : "",
				approved: true,
			};
		});

		if (clickedStudent && selectedJob) {
			const jobId = selectedJob.jobId;
			const studentId = clickedStudent.id;
			approveTimesheetWeekly(jobId, studentId, uniqueIdArr);
		}
	};

	const getDayEntryJsx = (day) => {
		const data = getOldData(day);
		if (data && data.time) {
			return (
				<div className="attendance-calendar-day-entry-content">
					<div>{day}</div>
					<div>Task # {data.task}</div>
					<div>Hours - {data.time}</div>
				</div>
			);
		}
		return (
			<div className="attendance-calendar-day-entry-content">
				<div>{day}</div>
			</div>
		);
	};

	const getWeeklyTime = (dateArr) => {
		let totalTime = 0;

		if (dateArr && dateArr.length > 0) {
			dateArr.forEach((dt) => {
				let timeDetail = getOldData(dt);
				if (timeDetail && timeDetail.time) {
					totalTime = totalTime + parseInt(timeDetail.time);
				}
			});
		}
		return totalTime;
	};

	const getWeeklyApproveStatus = (dateArr) => {
		let approved = true;

		if (dateArr && dateArr.length > 0) {
			dateArr.forEach((dt) => {
				let timeDetail = getOldData(dt);
				if (timeDetail && !timeDetail.approved) {
					approved = false;
				}
			});
		}
		return approved;
	};

	const generateDayBox = () =>
		cal?.map((elm, index) => {
			let timeCount = getWeeklyTime(elm);
			let allWeekApproved = getWeeklyApproveStatus(elm);
			let ifActionInProgress = isSaving === NOTIFICATION_STATES.processing;

			return (
				<div className="attendance-calendar-day-entry-row">
					{elm.map((day, index2) => {
						const timeData = getOldData(day);
						const ifApproved = timeData ? timeData.approved : false;
						return (
							<div
								className={`attendance-calendar-day-entry 
                ${
									validBorder(day)
										? "attendance-calendar-day-entry-contitional"
										: ""
								} ${
									(ifApproved || ifActionInProgress) && "calendar_date_disabled"
								}`}
								onClick={(e) => dateClick(day)}
								key={`${index}_${index2}`}
							>
								{day ? getDayEntryJsx(day) : ""}
							</div>
						);
					})}
					{elm.some((x) => x > 0) && (
						<div className="attendance-calendar-day-entry">
							<div
								className="attendance-calendar-day-entry-content"
								key={"action_btn_" + index}
							>
								<Tag>Total: {timeCount}</Tag>
								<Button
									type="link"
									size="small"
									onClick={(e) => approveTimeEntry(e, index)}
									disabled={allWeekApproved || ifActionInProgress}
								>
									{allWeekApproved ? "Approved." : "Approve"}
								</Button>
							</div>
						</div>
					)}
				</div>
			);
		});

	console.log("SELECTED:", selectedJob.timesheet);

	return (
		<>
			<div className="attendance-calendar-container">
				<div
					className="attendance-calendar-control-container"
					style={{ marginTop: "10px" }}
				>
					<div className="attendance-calendar-control-header-arrow-container">
						<ArrowLeftOutlined
							className="attendance-calendar-control-header-arrow"
							onClick={(e) => goBackword(e)}
						/>
					</div>
					<div className="attendance-calendar-control-header-text">
						{`${months[new Date(year, month, 1).getMonth()]}, ${new Date(
							year,
							month,
							1
						).getFullYear()}`}
					</div>
					<div className="attendance-calendar-control-header-arrow-container">
						<ArrowRightOutlined
							className="attendance-calendar-control-header-arrow"
							onClick={(e) => goForword(e)}
						/>
					</div>
				</div>
				<div className="attendance-calendar-week-name-container">
					{weekDaysJsx}
				</div>
				{generateDayBox()}
			</div>
			<FillAttendance
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				selectedDate={selectedDate}
				selectedJob={selectedJob}
				clickedStudent={clickedStudent}
			/>
		</>
	);
};

const mapStateToProps = (state) => ({
	isSaving: state.attendance.isSaving,
});

export default connect(mapStateToProps, { approveTimesheetWeekly })(Calendar);
