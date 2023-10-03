import * as actionType from "./types";
import { database } from "../utils/configs/firebaseConfig";
import { getFirebase } from "react-redux-firebase";

export const updateAttendance =
	(jobId, studentId, selectedDate, task, link, time) => (dispatch) => {
		const firebase = getFirebase();
		dispatch({ type: actionType.GALKLAB_ATTENDANCE_UPDATE });

		let uniqueId = new Date(selectedDate).getTime();
		const updateObj = {
			key: uniqueId,
			task: task,
			link: link,
			time: time,
			approved: false,
			submittedByStudent: true,
		};

		database
			.collection("GalkLabJobs")
			.doc(jobId)
			.set(
				{ timesheet: { [studentId]: { [uniqueId]: updateObj } } },
				{ merge: true }
			)
			.then((res) => {
				dispatch({
					type: actionType.GALKLAB_ATTENDANCE_CHANGE_STATE,
					payload: actionType.NOTIFICATION_STATES.success,
				});
				dispatch({
					type: actionType.UPDATE_TIMESHEET_IN_GALKLAB_JOB,
					payload: { jobId, studentId, selectedDate: uniqueId, updateObj },
				});
			})
			.catch((err) => {
				console.log(err);
				dispatch({ type: actionType.NOTIFICATION_FAILED });
				dispatch({
					type: actionType.GALKLAB_ATTENDANCE_CHANGE_STATE,
					payload: actionType.NOTIFICATION_STATES.failed,
				});
			});
	};

export const approveTimesheetWeekly =
	(jobId, studentId, dateDetailsArrWithUniqueId) => (dispatch) => {
		dispatch({ type: actionType.GALKLAB_ATTENDANCE_UPDATE });
		let promiseArr = [];
		dateDetailsArrWithUniqueId.forEach((dt) => {
			promiseArr.push(
				database
					.collection("GalkLabJobs")
					.doc(jobId)
					.set(
						{ timesheet: { [studentId]: { [dt.key]: { ...dt } } } },
						{ merge: true }
					)
			);
		});
		Promise.all(promiseArr)
			.then((res) => {
				dispatch({
					type: actionType.GALKLAB_ATTENDANCE_CHANGE_STATE,
					payload: actionType.NOTIFICATION_STATES.success,
				});
				dispatch({
					type: actionType.APPROVE_TIMESHEET_WEEKLY_IN_GALKLAB,
					payload: {
						jobId,
						studentId,
						datesToApprove: dateDetailsArrWithUniqueId,
					},
				});
				// dateDetailsArrWithUniqueId.forEach((dt) => {
				// 	dispatch({
				// 		type: actionType.UPDATE_TIMESHEET_IN_GALKLAB_JOB,
				// 		payload: { jobId, studentId, selectedDate: dt.key, updateObj: dt },
				// 	});
				// });
			})
			.catch((err) => {
				console.log(err);
				dispatch({ type: actionType.NOTIFICATION_FAILED });
				dispatch({
					type: actionType.GALKLAB_ATTENDANCE_CHANGE_STATE,
					payload: actionType.NOTIFICATION_STATES.failed,
				});
			});
	};

export const resetNotificationiState = () => (dispatch) => {
	dispatch({
		type: actionType.GALKLAB_ATTENDANCE_CHANGE_STATE,
		payload: actionType.NOTIFICATION_STATES.idle,
	});
};
