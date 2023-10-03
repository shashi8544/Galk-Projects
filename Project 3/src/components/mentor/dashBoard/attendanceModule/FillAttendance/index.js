import { Modal, Spin, notification } from "antd";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
	resetNotificationiState,
	updateAttendance,
} from "../../../../../actions/mentorAction";
import { NOTIFICATION_STATES } from "../../../../../actions/types";

import "./index.css";
function FillAttendance({
	isOpen,
	setIsOpen,
	selectedDate,
	isSaving,
	selectedJob,
	clickedStudent,
	resetNotificationiState,
	updateAttendance,
}) {
	const [time, setTime] = useState("");
	const [link, setLink] = useState("");
	const [task, setTask] = useState("");
	const handleOk = () => {
		setTask("");
		setLink("");
		setTime("");
		setIsOpen(false);
	};
	const openNotification = (type, title, description) => {
		notification[type]({
			message: title,
			description: description,
		});
	};
	const handleOnClick = () => {
		if (isSaving === NOTIFICATION_STATES.processing) {
			return;
		}
		if (!task || !link || !time) {
			openNotification("info", "Info", "Info", "All fields are required");
			return;
		}
		if (clickedStudent && selectedJob) {
			const jobId = selectedJob.jobId;
			const studentId = clickedStudent.id;
			updateAttendance(jobId, studentId, selectedDate, task, link, time);
		}
	};
	useEffect(() => {
		if (isSaving === NOTIFICATION_STATES.success) {
			resetNotificationiState();
			openNotification("success", "Success", "Success", "Successfully updated");
			setTask("");
			setLink("");
			setTime("");
			setIsOpen(false);
		}
		if (isSaving === NOTIFICATION_STATES.failed) {
			resetNotificationiState();
			openNotification(
				"error",
				"Error",
				"Error",
				"Something went wrong please try again"
			);
		}
	}, [isSaving, setIsOpen]);

	useEffect(() => {
		const data = getOldData();
		if (data) {
			setTask(data.task);
			setLink(data.link);
			setTime(data.time);
		}
	}, [selectedDate]);

	const getOldData = () => {
		let date = new Date(selectedDate);
		date.setHours(0, 0, 0, 0);
		date = date.getTime();
		const studenId = clickedStudent?.id;
		const timesheet = selectedJob?.timesheet;
		if (!timesheet) return null;
		const attendance = timesheet[studenId];
		if (!attendance) return null;
		const data = attendance[date];
		if (!data) return null;
		return data;
	};
	return (
		<>
			<Modal
				title={new Date(selectedDate).toLocaleDateString()}
				bodyStyle={{ height: 400 }}
				width={600}
				style={{ top: 20 }}
				visible={isOpen}
				onOk={handleOk}
				onCancel={handleOk}
			>
				<div className="attendance-module-fill-container">
					<div className="attendance-module-fill-form-container">
						<label for="taskNo">Task number:</label>
						<input
							id="taskNo"
							value={task}
							onChange={(e) => setTask(e.target.value)}
							type="number"
							placeholder="GitHub task#"
							className="attendance-module-fill-form-input"
						/>
						<label for="taskLink">Github link:</label>
						<input
							id="taskLink"
							value={link}
							onChange={(e) => setLink(e.target.value)}
							type="url"
							placeholder="GitHub link"
							className="attendance-module-fill-form-input"
						/>
						<label for="workingHours">Working Hours:</label>
						<input
							id="workingHours"
							value={time}
							onChange={(e) => setTime(e.target.value)}
							type="number"
							placeholder="Working hours"
							className="attendance-module-fill-form-input"
						/>
						<div
							onClick={handleOnClick}
							className="attendance-module-fill-form-button"
						>
							{isSaving === NOTIFICATION_STATES.processing ? <Spin /> : "Save"}
						</div>
					</div>
				</div>
			</Modal>
		</>
	);
}
const mapStateToProps = (state) => ({
	isSaving: state.attendance.isSaving,
});

export default connect(mapStateToProps, {
	updateAttendance,
	resetNotificationiState,
})(FillAttendance);
