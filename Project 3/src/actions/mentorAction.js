import * as actionTypes from "./types";
import { firebase, database } from "../utils/configs/firebaseConfig";
import { message } from "antd";
import moment from "moment";
import { reject } from "lodash";

export const getAllJobs = (mentorId) => (dispatch) => {
	const allJobsData = {};
	dispatch({ type: actionTypes.GALKLAB_JOB_LOADING_MENTOR });
	database
		.collection("GalkLabJobs")
		.where("status", "==", "approved")
		.where("assignedMentors", "array-contains", mentorId)
		.get()
		.then((querySnapshot) => {
			const allPromise = [];
			querySnapshot.forEach(async (doc) => {
				const promise = new Promise(async (resolve, reject) => {
					const _jobData = doc.data();
					const companyId = _jobData.companyId;
					if (!allJobsData[companyId]) {
						allJobsData[companyId] = { companyData: null, jobs: [_jobData] };
						await fetchCompanyData(companyId);
					} else {
						allJobsData[companyId].jobs.push(_jobData);
					}
					resolve();
				});
				allPromise.push(promise);
			});
			Promise.all(allPromise)
				.then((res) => {
					const finalData = [];
					for (const [key, value] of Object.entries(allJobsData)) {
						finalData.push(value);
					}

					dispatch({
						type: actionTypes.GET_GALKLAB_JOBS_MENTOR,
						payload: finalData,
					});
				})
				.catch((err) => {
					dispatch({ type: actionTypes.GALKLAB_JOB_LOAD_ERROR_MENTOR });
				});
		})
		.catch((err) => {
			console.log("Job data load error: ", err);
			dispatch({ type: actionTypes.GALKLAB_JOB_LOAD_ERROR_MENTOR });
		});
	const fetchCompanyData = async (companyId) => {
		return new Promise((resolve, reject) => {
			database
				.collection("CompanyProfile")
				.doc(companyId)
				.get()
				.then((res) => {
					const data = res.data();
					allJobsData[companyId].companyData = data;
					resolve("done");
				});
		});
	};
};

export const getAllGALKLabStudents =
	() =>
	(dispatch, getState, { getFirebase, getFirestore }) => {
		dispatch({
			type: actionTypes.GALKLAB_SET_STUDENT_LIST_LOADING_MENTOR,
			payload: true,
		});

		const database = getFirestore();

		let _allStudentArray = [];

		database
			.collection("StudentProfile")
			.where("subscribedInGalkLab", "==", true)
			.where("active", "==", true)
			.get()
			.then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					_allStudentArray.push(doc.data());
				});
				console.log(_allStudentArray, "ok");
				dispatch({
					type: actionTypes.GALKLAB_GET_STUDENT_LIST_MENTOR,
					payload: [..._allStudentArray],
				});
			})
			.catch((err) => {
				console.log("Student load error: ", err);
				message.error("Error while loading data !");
				dispatch({
					type: actionTypes.GALKLAB_SET_STUDENT_LIST_LOADING_MENTOR,
					payload: false,
				});
			});
	};

export const assignEngineeorInProject =
	(jobId, studentId, companyName, companyId) => (dispatch, getState) => {
		//const companyId = getState().company.company.id;
		dispatch({
			type: actionTypes.UPDATE_GALK_LAB_JOB_ASSIGN_PORCESSING_MENTOR,
			payload: true,
		});
		const batch = database.batch();
		const jobDoc = database.collection("GalkLabJobs").doc(jobId);
		const studentDoc = database.collection("StudentProfile").doc(studentId);
		const companyDoc = database.collection("CompanyProfile").doc(companyId);
		batch.update(jobDoc, {
			candidateAssignedList:
				firebase.firestore.FieldValue.arrayUnion(studentId),
		});
		batch.update(studentDoc, {
			taggedCompaniesForGalkLab: firebase.firestore.FieldValue.arrayUnion({
				key: companyId,
				label: companyName,
			}),
		});
		batch.update(companyDoc, {
			taggedCandidatesForGalkLab:
				firebase.firestore.FieldValue.arrayUnion(studentId),
		});
		batch
			.commit()
			.then((res) => {
				dispatch({
					type: actionTypes.UPDATE_GALK_LAB_JOB_ASSIGNED_ENGINEER_MENTOR,
					payload: { studentId, jobId },
				});
			})
			.catch((err) => {
				dispatch({
					type: actionTypes.UPDATE_GALK_LAB_JOB_ASSIGN_PORCESSING_MENTOR,
					payload: false,
				});
			});
	};

export const unAssignEngineeorFromProject =
	(jobId, studentId, companyName, companyId) => (dispatch, getState) => {
		dispatch({
			type: actionTypes.UPDATE_GALK_LAB_JOB_ASSIGN_PORCESSING_MENTOR,
			payload: true,
		});
		const batch = database.batch();
		const jobDoc = database.collection("GalkLabJobs").doc(jobId);
		const studentDoc = database.collection("StudentProfile").doc(studentId);
		const companyDoc = database.collection("CompanyProfile").doc(companyId);
		batch.update(jobDoc, {
			candidateAssignedList:
				firebase.firestore.FieldValue.arrayRemove(studentId),
		});
		batch.update(studentDoc, {
			taggedCompaniesForGalkLab: firebase.firestore.FieldValue.arrayRemove({
				key: companyId,
				label: companyName,
			}),
		});
		batch.update(companyDoc, {
			taggedCandidatesForGalkLab:
				firebase.firestore.FieldValue.arrayRemove(studentId),
		});
		batch
			.commit()
			.then((res) => {
				dispatch({
					type: actionTypes.UPDATE_GALK_LAB_JOB_UNASSIGNED_MENTOR,
					payload: { studentId, jobId },
				});
			})
			.catch((err) => {
				dispatch({
					type: actionTypes.UPDATE_GALK_LAB_JOB_ASSIGN_PORCESSING_MENTOR,
					payload: false,
				});
			});
	};

// Timesheet ********
export const updateAttendance =
	(jobId, studentId, selectedDate, task, link, time) => (dispatch) => {
		dispatch({ type: actionTypes.GALKLAB_ATTENDANCE_UPDATE });

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
					type: actionTypes.GALKLAB_ATTENDANCE_CHANGE_STATE,
					payload: actionTypes.NOTIFICATION_STATES.success,
				});
				dispatch({
					type: actionTypes.UPDATE_TIMESHEET_IN_GALKLAB_JOB_MENTOR,
					payload: { jobId, studentId, selectedDate: uniqueId, updateObj },
				});
			})
			.catch((err) => {
				console.log(err);
				dispatch({ type: actionTypes.NOTIFICATION_FAILED });
				dispatch({
					type: actionTypes.GALKLAB_ATTENDANCE_CHANGE_STATE,
					payload: actionTypes.NOTIFICATION_STATES.failed,
				});
			});
	};

export const approveTimesheetWeekly =
	(jobId, studentId, dateDetailsArrWithUniqueId) => (dispatch) => {
		dispatch({ type: actionTypes.GALKLAB_ATTENDANCE_UPDATE });
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
					type: actionTypes.GALKLAB_ATTENDANCE_CHANGE_STATE,
					payload: actionTypes.NOTIFICATION_STATES.success,
				});
				dispatch({
					type: actionTypes.APPROVE_TIMESHEET_WEEKLY_IN_GALKLAB_MENTOR,
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
				dispatch({ type: actionTypes.NOTIFICATION_FAILED });
				dispatch({
					type: actionTypes.GALKLAB_ATTENDANCE_CHANGE_STATE,
					payload: actionTypes.NOTIFICATION_STATES.failed,
				});
			});
	};

export const resetNotificationiState = () => (dispatch) => {
	dispatch({
		type: actionTypes.GALKLAB_ATTENDANCE_CHANGE_STATE,
		payload: actionTypes.NOTIFICATION_STATES.idle,
	});
};

export const updateStudentPerformanceRating =
	(studentDetails, date, ratings) =>
		(dispatch) => {
			dispatch({
				type: actionTypes.UPDATE_GALK_LAB_STUDENT_RATING_MENTOR,
				payload: true,
			});

			if ("studentsRatingForGalkLab" in studentDetails){
				var newNumRatings = 0
				var oldNumRatings = 0

				if ("numRatings" in studentDetails.studentsRatingForGalkLab)
					oldNumRatings = studentDetails.studentsRatingForGalkLab.numRatings
				
				var newAverage = {}
				var oldAverage = {}
				if ("average" in studentDetails.studentsRatingForGalkLab)
					oldAverage = studentDetails.studentsRatingForGalkLab.average

				if (date in studentDetails.studentsRatingForGalkLab){
					const oldRatings = studentDetails.studentsRatingForGalkLab[date]
					for (var indicator of Object.keys(oldAverage)){
						newAverage[indicator] = Math.round((oldAverage[indicator] + (ratings[indicator] - oldRatings[indicator]) / oldNumRatings) * 100) / 100
					}
	
					var averageRating = 0
					for (var i of Object.keys(newAverage)){
						averageRating += newAverage[i]
					}
					averageRating = Math.round(averageRating / 5 * 100) / 100
					newNumRatings = oldNumRatings

					var newStudentsRatingForGalkLab = studentDetails.studentsRatingForGalkLab
					newStudentsRatingForGalkLab[date] = ratings
					newStudentsRatingForGalkLab.average = newAverage
					newStudentsRatingForGalkLab.numRatings = newNumRatings

					database
					.collection("StudentProfile")
					.doc(studentDetails.id)
					.update({
						studentsRatingForGalkLab: newStudentsRatingForGalkLab,
						studentAverageRatingForGalkLab: averageRating
					})
					.then(() => {
						studentDetails.studentsRatingForGalkLab = newStudentsRatingForGalkLab
						studentDetails.studentAverageRatingForGalkLab = averageRating
					})
					.catch((err) => {
						console.log("Student rating updating error:", err);
						dispatch({
							type: actionTypes.UPDATE_GALK_LAB_STUDENT_RATING_MENTOR,
							payload: false,
						});
					});
				} else {
					for (var indicator of Object.keys(oldAverage)){
						newAverage[indicator] = Math.round(((oldAverage[indicator] * oldNumRatings + ratings[indicator]) / (oldNumRatings + 1)) * 100) / 100
					}
	
					var averageRating = 0
					for (let i of Object.keys(newAverage)){
						averageRating += newAverage[i]
					}
					averageRating = Math.round(averageRating / 5 * 100) / 100
					newNumRatings = oldNumRatings + 1

					var newStudentsRatingForGalkLab = studentDetails.studentsRatingForGalkLab
					newStudentsRatingForGalkLab[date] = ratings
					newStudentsRatingForGalkLab.average = newAverage
					newStudentsRatingForGalkLab.numRatings = newNumRatings

					database
					.collection("StudentProfile")
					.doc(studentDetails.id)
					.update({
						studentsRatingForGalkLab: newStudentsRatingForGalkLab,
						studentAverageRatingForGalkLab: averageRating
					})
					.then(() => {
						studentDetails.studentsRatingForGalkLab = newStudentsRatingForGalkLab
						studentDetails.studentAverageRatingForGalkLab = averageRating
					})
					.catch((err) => {
						console.log("Student rating updating error:", err);
						dispatch({
							type: actionTypes.UPDATE_GALK_LAB_STUDENT_RATING_MENTOR,
							payload: false,
						});
					});
				}
			} else {
				var newAverage = ratings
				delete newAverage.Comments
				var averageRating = 0
				for (let i of Object.keys(newAverage)){
					averageRating += newAverage[i]
				}
				averageRating = Math.round(averageRating / 5 * 100) / 100

				database
				.collection("StudentProfile")
				.doc(studentDetails.id)
				.update({
					studentsRatingForGalkLab: {
						[date]: ratings,
						average: ratings,
						numRatings: 1
					},
					studentAverageRatingForGalkLab: averageRating
				})
				.then(() => {
					studentDetails.studentsRatingForGalkLab = {
						[date]: ratings,
						average: ratings,
						numRatings: 1
					}
					studentDetails.studentAverageRatingForGalkLab = averageRating
				})
				.catch((err) => {
					console.log("Student rating updating error:", err);
					dispatch({
						type: actionTypes.UPDATE_GALK_LAB_STUDENT_RATING_MENTOR,
						payload: false,
					});
				});
			}
		};
