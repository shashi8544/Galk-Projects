import * as actionTypes from "./types";
import moment from "moment";
import store from "../store";
import { returnErrors, clearErrors } from "./errorActions";
import { message } from "antd";
import "antd/dist/antd.css";
import axios from "axios";
import { logout } from "./authActions";
import {
	firebaseService,
	database,
	storage,
	config,
	firebase
} from "../utils/configs/firebaseConfig";

export const updateCandidateSkillSet = (skillInfo) => (dispatch) => {
	dispatch({
		type: actionTypes.SET_CANDIDATE_DATA_LOADING,
		payload: true,
	});

	var _dataToUpdate = { ...skillInfo };

	const studentId = store.getState().firebase.auth.uid;

	database
		.collection("StudentProfile")
		.doc(studentId)
		.update({
			skills: _dataToUpdate.skills,
			secondarySkills: _dataToUpdate.secondarySkills || [],
			spokenLanguages: _dataToUpdate.spokenLanguages,
			// selfStrength: _dataToUpdate.selfStrength || "",
			// selfWeakness: _dataToUpdate.selfWeakness || "",
			selfIntro: _dataToUpdate.selfIntro || "",
			whyInJapan: _dataToUpdate.whyInJapan || "",
			whatToContribute: _dataToUpdate.whatToContribute || "",
			minorDegree: _dataToUpdate.minorDegree || "",
		})
		.then((res) => {
			// dispatch({
			//   type: actionTypes.UPDATE_CANDIDATE_SKILLSET,
			//   payload: _dataToUpdate,
			// });
			dispatch({
				type: actionTypes.SET_CANDIDATE_DATA_LOADING,
				payload: false,
			});
			message.success("Data updated successfully !");
		})
		.catch(function (error) {
			dispatch({
				type: actionTypes.SET_CANDIDATE_DATA_LOADING,
				payload: false,
			});
			message.error("Error in updating data !");
		});
};

export const addNewCandidateJob = (newJob) => (dispatch) => {
	newJob= JSON.parse(JSON.stringify(newJob));
	dispatch({ type: actionTypes.START_CANDIDATE_DATA_LOADING });
	dispatch({ type: actionTypes.DATA_SAVE_PROGRESS, payload: actionTypes.dataSavingState.SAVING })
	dispatch({
		type: actionTypes.CANDIDATE_UPDATE_ACTION_IN_PROGRESS,
		payload: true,
	  });

	const studentId = store.getState().firebase.auth.uid;

	database
		.collection("StudentProfile")
		.doc(studentId)
		.update({
			job: firebase.firestore.FieldValue.arrayUnion(newJob)
		})
		.then(() => {
			dispatch({
			  type: actionTypes.CANDIDATE_UPDATE_ACTION_IN_PROGRESS,
			  payload: false,
			});
			dispatch({ type: actionTypes.STOP_CANDIDATE_DATA_LOADING });
			dispatch({ type: actionTypes.DATA_SAVE_PROGRESS, payload: actionTypes.dataSavingState.SAVED })
			message.success("Data added successfully");
		})
		.catch(function (error) {
			dispatch({ type: actionTypes.STOP_CANDIDATE_DATA_LOADING });
			dispatch({ type: actionTypes.DATA_SAVE_PROGRESS, payload: actionTypes.dataSavingState.SAVED })
			message.error("Error in adding student job!");
			dispatch({
				type: actionTypes.CANDIDATE_UPDATE_ACTION_IN_PROGRESS,
				payload: false,
			  });
		});
};

export const addNewCandidateEducation = (newEducation) => (dispatch) => {
	newEducation= JSON.parse(JSON.stringify(newEducation));
	dispatch({ type: actionTypes.START_CANDIDATE_DATA_LOADING });
	dispatch({ type: actionTypes.DATA_SAVE_PROGRESS, payload: actionTypes.dataSavingState.SAVING })
	dispatch({
		type: actionTypes.CANDIDATE_UPDATE_ACTION_IN_PROGRESS,
		payload: true,
	  });

	const studentId = store.getState().firebase.auth.uid;

	database
		.collection("StudentProfile")
		.doc(studentId)
		.update({
			education: firebase.firestore.FieldValue.arrayUnion(newEducation)
		})
		.then(() => {
			dispatch({
			  type: actionTypes.CANDIDATE_UPDATE_ACTION_IN_PROGRESS,
			  payload: false,
			});
			dispatch({ type: actionTypes.STOP_CANDIDATE_DATA_LOADING });
			dispatch({ type: actionTypes.DATA_SAVE_PROGRESS, payload: actionTypes.dataSavingState.SAVED })
			message.success("Data added successfully");
		})
		.catch(function (error) {
			dispatch({ type: actionTypes.STOP_CANDIDATE_DATA_LOADING });
			dispatch({ type: actionTypes.DATA_SAVE_PROGRESS, payload: actionTypes.dataSavingState.SAVED })
			message.error("Error in adding student education!");
			dispatch({
				type: actionTypes.CANDIDATE_UPDATE_ACTION_IN_PROGRESS,
				payload: false,
			  });
		});
};

export const updateStudentJob =
	(updatedInformation ,index) =>
	(dispatch, getState, { getFirebase, getFirestore }) => {
		dispatch({
			type: actionTypes.CANDIDATE_UPDATE_ACTION_IN_PROGRESS,
			payload: true,
		});

		const studentId = getState().firebase.profile.id;
		let studentJobBeforeUpdate =
			getState().firebase.profile.job || [];
		const database = getFirestore();

		let updatedStudentJob = studentJobBeforeUpdate.map((x, i) => {
			let data = { ...x };
			if (i === index) {
				data.company = updatedInformation.company;
				data.designation = updatedInformation.designation;
				data.place = updatedInformation.place;
				data.startDate = updatedInformation.startDate;
				data.endDate = updatedInformation.endDate;
				data.description = updatedInformation.description;
			}
			return data;
		});

		database
			.collection("StudentProfile")
			.doc(studentId)
			.update({
				job: updatedStudentJob.map((x) => ({
					company: x.company || "",
					designation: x.designation || "",
					place: x.place || "",
					startDate: x.startDate || "",
					endDate: x.endDate || "",
					description: x.description || "",
				})),
			})
			.then(() => {
				message.success("Data updated successfully");
				dispatch({
					type: actionTypes.UPDATE_STUDENT_JOB_INFORMATION,
					payload: [...updatedStudentJob],
				});
				dispatch({
					type: actionTypes.CANDIDATE_UPDATE_ACTION_IN_PROGRESS,
					payload: false,
				});
			})
			.catch((err) => {
				console.log("Error while updating data", err);
				message.error("Error updating data !");
				dispatch({
					type: actionTypes.CANDIDATE_UPDATE_ACTION_IN_PROGRESS,
					payload: false,
				});
			});
	};

export const updateStudentEducation =
	(updatedInformation ,index) =>
	(dispatch, getState, { getFirebase, getFirestore }) => {
		dispatch({
			type: actionTypes.CANDIDATE_UPDATE_ACTION_IN_PROGRESS,
			payload: true,
		});

		const studentId = getState().firebase.profile.id;
		let studentEducationBeforeUpdate =
			getState().firebase.profile.education || [];
		const database = getFirestore();

		let updatedStudentEducation = studentEducationBeforeUpdate.map((x, i) => {
			let data = { ...x };
			if (i === index) {
				data.degree = updatedInformation.degree;
				data.description = updatedInformation.description;
				data.endDate = updatedInformation.endDate;
				data.startDate = updatedInformation.startDate;
				data.instituteName = updatedInformation.instituteName;
				data.place = updatedInformation.place;
			}
			return data;
		});

		database
			.collection("StudentProfile")
			.doc(studentId)
			.update({
				education: updatedStudentEducation.map((x) => ({
					degree: x.degree || "",
					place: x.place || "",
					startDate: x.startDate || "",
					endDate: x.endDate || "",
					instituteName: x.instituteName || "",
					description: x.description || "",
				})),
			})
			.then(() => {
				message.success("Data updated successfully");
				dispatch({
					type: actionTypes.UPDATE_STUDENT_EDUCATION_INFORMATION,
					payload: [...updatedStudentEducation],
				});
				dispatch({
					type: actionTypes.CANDIDATE_UPDATE_ACTION_IN_PROGRESS,
					payload: false,
				});
			})
			.catch((err) => {
				console.log("Error while updating data", err);
				message.error("Error updating data !");
				dispatch({
					type: actionTypes.CANDIDATE_UPDATE_ACTION_IN_PROGRESS,
					payload: false,
				});
			});
	};

	// export const updateCandidateEducation = (newEducationArray) => (dispatch) => {
	// 	dispatch({ type: actionTypes.START_CANDIDATE_DATA_LOADING });
	// 	dispatch({ type: actionTypes.DATA_SAVE_PROGRESS, payload: actionTypes.dataSavingState.SAVING })
	
	// 	var _education = {
	// 		updatedEducation: newEducationArray,
	// 	};
	
	// 	const studentId = store.getState().firebase.auth.uid;
	
	// 	database
	// 		.collection("StudentProfile")
	// 		.doc(studentId)
	// 		.update({
	// 			education: _education.updatedEducation,
	// 		})
	// 		.then(() => {
	// 			message.success("Data updated successfully");
	// 			dispatch({ type: actionTypes.STOP_CANDIDATE_DATA_LOADING });
	// 			dispatch({ type: actionTypes.DATA_SAVE_PROGRESS, payload: actionTypes.dataSavingState.SAVED })
	// 			dispatch({ type: actionTypes.DATA_EDIT_IN_PROGRESS, payload: false })
	// 			message.success("Data updated successfully");
	
	// 		})
	// 		.catch(function (error) {
	// 			dispatch({ type: actionTypes.STOP_CANDIDATE_DATA_LOADING });
	// 			dispatch({ type: actionTypes.DATA_SAVE_PROGRESS, payload: actionTypes.dataSavingState.SAVED })
	// 			dispatch({ type: actionTypes.DATA_EDIT_IN_PROGRESS, payload: false })
	// 			message.error("Error in updating student education!");
	// 		});
	// };
	
export const deleteCandidateJob = (jobList, jobId) => (dispatch) => {
	dispatch({ type: actionTypes.START_CANDIDATE_DATA_LOADING });

	var _dataToUpdate = {
		updatedJob: jobList.filter(
			(data,i) => i !== jobId
		),
	};

	const studentId = store.getState().firebase.auth.uid;

	database
		.collection("StudentProfile")
		.doc(studentId)
		.update({
			job: _dataToUpdate.updatedJob,
		})
		.then((res) => {
			// dispatch({
			//   type: actionTypes.DELETE_CANDIDATE_JOB_BY_ID,
			//   payload: jobToDelete.id,
			// });
			dispatch({ type: actionTypes.STOP_CANDIDATE_DATA_LOADING });
			message.success("Data deleted successfully");
		})
		.catch(function (error) {
			dispatch({ type: actionTypes.STOP_CANDIDATE_DATA_LOADING });
			message.error("Error while removing data !");
		});
};

export const deleteCandidateEducations = (educationList, educationId) => (dispatch) => {
	dispatch({ type: actionTypes.START_CANDIDATE_DATA_LOADING });

	var _dataToUpdate = {
		updatedEducation: educationList.filter(
			(data,i) => i !== educationId
		),
	};

	const studentId = store.getState().firebase.auth.uid;

	database
		.collection("StudentProfile")
		.doc(studentId)
		.update({
			education: _dataToUpdate.updatedEducation,
		})
		.then((res) => {
			// dispatch({
			//   type: actionTypes.DELETE_CANDIDATE_EDUCATION_BY_ID,
			//   payload: educationToDelete.id,
			// });
			dispatch({ type: actionTypes.STOP_CANDIDATE_DATA_LOADING });
			message.success("Data deleted successfully");
		})
		.catch(function (error) {
			dispatch({ type: actionTypes.STOP_CANDIDATE_DATA_LOADING });
			message.error("Error while removing data !");
		});
};

// export const deleteCandidateEducation = (educationToDelete) => (dispatch) => {
// 	dispatch({ type: actionTypes.START_CANDIDATE_DATA_LOADING });

// 	var _dataToUpdate = {
// 		updatedEducation: educationList.filter(
// 			(education,i) => i !== educationToDelete.id
// 		),
// 	};

// 	const studentId = store.getState().firebase.auth.uid;

// 	database
// 		.collection("StudentProfile")
// 		.doc(studentId)
// 		.update({
// 			education: _dataToUpdate.updatedEducation,
// 		})
// 		.then((res) => {
// 			// dispatch({
// 			//   type: actionTypes.DELETE_CANDIDATE_EDUCATION_BY_ID,
// 			//   payload: educationToDelete.id,
// 			// });
// 			dispatch({ type: actionTypes.STOP_CANDIDATE_DATA_LOADING });
// 			message.success("Data deleted successfully");
// 		})
// 		.catch(function (error) {
// 			dispatch({ type: actionTypes.STOP_CANDIDATE_DATA_LOADING });
// 			message.error("Error while removing data !");
// 		});
// };

export const resetDataSavingState = () => (dispatch) => {
	dispatch({ type: actionTypes.DATA_SAVE_PROGRESS, payload: actionTypes.dataSavingState.IDLE })
}

export const stopLoading = () => (dispatch) => {
	dispatch({ type: actionTypes.STOP_CANDIDATE_DATA_LOADING });
}

export const startEditingData = (payload) => (dispatch) => {
	if (payload === undefined)
		payload = true
	dispatch({ type: actionTypes.DATA_EDIT_IN_PROGRESS, payload: payload })
}

export const addNewCandidateProject = (newProject) => (dispatch) => {
	newProject = JSON.parse(JSON.stringify(newProject))
	dispatch({ type: actionTypes.START_CANDIDATE_DATA_LOADING });
	dispatch({ type: actionTypes.DATA_SAVE_PROGRESS, payload: actionTypes.dataSavingState.SAVING })


	const studentId = store.getState().firebase.auth.uid;

	database
		.collection("StudentProfile")
		.doc(studentId)
		.update({
			project: firebase.firestore.FieldValue.arrayUnion(newProject)
		})
		.then(() => {
			// dispatch({
			//   type: actionTypes.ADD_NEW_CANDIDATE_PROJECT,
			//   payload: newProjectArray,
			// });
			message.success("Data added successfully");
			dispatch({ type: actionTypes.STOP_CANDIDATE_DATA_LOADING });
			dispatch({ type: actionTypes.DATA_SAVE_PROGRESS, payload: actionTypes.dataSavingState.SAVED })
		})
		.catch(function (error) {
			console.log(error)
			dispatch({ type: actionTypes.STOP_CANDIDATE_DATA_LOADING });
			dispatch({ type: actionTypes.DATA_SAVE_PROGRESS, payload: actionTypes.dataSavingState.SAVED })
			message.error("Error while adding data !");
		});
};

export const updateStudentToShowProject =
	(studentProjectBeforeUpdate,updatedInformation,index) =>
	(dispatch, getState, { getFirebase, getFirestore }) => {
		dispatch({
			type: actionTypes.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS_IN_STUDENT_MODULE,
			payload: true,
		});

		const studentId = getState().firebase.profile.id;
		const database = getFirestore();

		let updatedStudentProject = studentProjectBeforeUpdate.map((x,i) => {
			let data = { ...x };
			if (i === index) {
				data.title = updatedInformation.title;
				data.description = updatedInformation.description;
				data.endDate = updatedInformation.endDate;
				data.startDate = updatedInformation.startDate;
				data.skillsUsed = updatedInformation.skillsUsed;
				data.place = updatedInformation.place;
				data.type = updatedInformation.type;
			}
			return data;
		});
		database
			.collection("StudentProfile")
			.doc(studentId)
			.update({
				project: updatedStudentProject.map((x) => ({
					title: x.title || "",
					place: x.place || "",
					startDate: x.startDate || "",
					endDate: x.endDate || "",
					skillsUsed: x.skillsUsed || [],
					description: x.description || "",
					type: x.type || "",
				})),
			})
			.then(() => {
				message.success("Data updated successfully");
				dispatch({
					type: actionTypes.UPDATE_STUDENT_PROJECT_INFORMATION,
					payload: [...updatedStudentProject],
				});
				dispatch({
					type: actionTypes.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS_IN_STUDENT_MODULE,
					payload: false,
				});
			})
			.catch((err) => {
				console.log("Error while updating data", err);
				message.error("Error updating data !");
				dispatch({
					type: actionTypes.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS_IN_STUDENT_MODULE,
					payload: false,
				});
			});
	};
export const updateCandidateProject = (newProjectArray) => (dispatch) => {
	dispatch({ type: actionTypes.START_CANDIDATE_DATA_LOADING });
	dispatch({ type: actionTypes.DATA_SAVE_PROGRESS, payload: actionTypes.dataSavingState.SAVING })


	var _dataToUpdate = {
		updatedProject: newProjectArray,
	};

	const studentId = store.getState().firebase.auth.uid;

	database
		.collection("StudentProfile")
		.doc(studentId)
		.update({
			project: _dataToUpdate.updatedProject,
		})
		.then((res) => {
			message.success("Data updated successfully");
			dispatch({ type: actionTypes.STOP_CANDIDATE_DATA_LOADING });
			dispatch({ type: actionTypes.DATA_SAVE_PROGRESS, payload: actionTypes.dataSavingState.SAVED })
			dispatch({ type: actionTypes.DATA_EDIT_IN_PROGRESS, payload: false })
		})
		.catch(function (error) {
			dispatch({ type: actionTypes.STOP_CANDIDATE_DATA_LOADING });
			dispatch({ type: actionTypes.DATA_SAVE_PROGRESS, payload: actionTypes.dataSavingState.SAVED })
			dispatch({ type: actionTypes.DATA_EDIT_IN_PROGRESS, payload: false })
			message.error("Error while updating data !");
		});
};

export const deleteCandidateProjects = (projectList,projectId) => (dispatch) => {
	dispatch({ type: actionTypes.START_CANDIDATE_DATA_LOADING });
	var _dataToUpdate = {
		updatedProject: projectList.filter(
			(data,i) => i !== projectId
		),
	};
	const studentId = store.getState().firebase.auth.uid;

	database
		.collection("StudentProfile")
		.doc(studentId)
		.update({
			project: _dataToUpdate.updatedProject,
		})
		.then((res) => {
			// dispatch({
			//   type: actionTypes.DELETE_CANDIDATE_PROJECT_BY_ID,
			//   payload: projectToDelete.id,
			// });
			message.success("Data deleted successfully");
			dispatch({ type: actionTypes.STOP_CANDIDATE_DATA_LOADING });
		})
		.catch(function (error) {
			dispatch({ type: actionTypes.STOP_CANDIDATE_DATA_LOADING });
			message.error("Error while deleting data !");
		});
};
	
export const deleteCandidateProject = (projectToDelete) => (dispatch) => {
	dispatch({ type: actionTypes.START_CANDIDATE_DATA_LOADING });

	var _dataToUpdate = {
		updatedProject: projectToDelete.project.filter(
			(project, i) => i !== projectToDelete.id
		),
	};

	const studentId = store.getState().firebase.auth.uid;

	database
		.collection("StudentProfile")
		.doc(studentId)
		.update({
			project: _dataToUpdate.updatedProject,
		})
		.then((res) => {
			// dispatch({
			//   type: actionTypes.DELETE_CANDIDATE_PROJECT_BY_ID,
			//   payload: projectToDelete.id,
			// });
			message.success("Data deleted successfully");
			dispatch({ type: actionTypes.STOP_CANDIDATE_DATA_LOADING });
		})
		.catch(function (error) {
			dispatch({ type: actionTypes.STOP_CANDIDATE_DATA_LOADING });
			message.error("Error while deleting data !");
		});
};

export const addNewCandidateCertificate =
	(newCertificateArray) => (dispatch) => {
		dispatch({ type: actionTypes.START_CANDIDATE_DATA_LOADING });
		dispatch({ type: actionTypes.DATA_SAVE_PROGRESS, payload: actionTypes.dataSavingState.SAVING })

		const studentId = store.getState().firebase.auth.uid;

		database
			.collection("StudentProfile")
			.doc(studentId)
			.update({
				certificate: newCertificateArray,
			})
			.then((res) => {
				// dispatch({
				//   type: actionTypes.ADD_NEW_CANDIDATE_CERTIFICATE,
				//   payload: newCertificateArray,
				// });
				message.success("Data added successfully");
				dispatch({ type: actionTypes.STOP_CANDIDATE_DATA_LOADING });
				dispatch({ type: actionTypes.DATA_SAVE_PROGRESS, payload: actionTypes.dataSavingState.SAVED })
			})
			.catch(function (error) {
				dispatch({ type: actionTypes.STOP_CANDIDATE_DATA_LOADING });
				dispatch({ type: actionTypes.DATA_SAVE_PROGRESS, payload: actionTypes.dataSavingState.SAVED })
				message.error("Error while adding data !");
			});
	};

export const updateCandidateCertificate =
	(newCertificateArray) => (dispatch) => {
		dispatch({ type: actionTypes.START_CANDIDATE_DATA_LOADING });
		dispatch({ type: actionTypes.DATA_SAVE_PROGRESS, payload: actionTypes.dataSavingState.SAVING })

		const studentId = store.getState().firebase.auth.uid;

		database
			.collection("StudentProfile")
			.doc(studentId)
			.update({
				certificate: newCertificateArray,
			})
			.then(() => {
				// dispatch({
				//   type: actionTypes.UPDATE_CANDIDATE_CERTIFICATE,
				//   payload: newCertificateArray,
				// });

				dispatch({ type: actionTypes.STOP_CANDIDATE_DATA_LOADING });
				dispatch({ type: actionTypes.DATA_SAVE_PROGRESS, payload: actionTypes.dataSavingState.SAVED })
				dispatch({ type: actionTypes.DATA_EDIT_IN_PROGRESS, payload: false })
				message.success("Data updated successfully");
			})
			.catch(function (error) {
				dispatch({ type: actionTypes.STOP_CANDIDATE_DATA_LOADING });
				dispatch({ type: actionTypes.DATA_SAVE_PROGRESS, payload: actionTypes.dataSavingState.SAVED })
				dispatch({ type: actionTypes.DATA_EDIT_IN_PROGRESS, payload: false })
				message.error("Error while updating data !");
			});
	};

export const deleteCandidateCertificate =
	(certificateToDelete) => (dispatch) => {
		dispatch({ type: actionTypes.START_CANDIDATE_DATA_LOADING });

		var _dataToUpdate = {
			updatedCertificate: certificateToDelete.certificate.filter(
				(certificate, i) => i !== certificateToDelete.id
			),
		};

		const studentId = store.getState().firebase.auth.uid;

		database
			.collection("StudentProfile")
			.doc(studentId)
			.update({
				certificate: _dataToUpdate.updatedCertificate,
			})
			.then((res) => {
				// dispatch({
				//   type: actionTypes.DELETE_CANDIDATE_CERTIFICATE_BY_ID,
				//   payload: certificateToDelete.id,
				// });
				message.success("Data deleted successfully");
				dispatch({ type: actionTypes.STOP_CANDIDATE_DATA_LOADING });
			})
			.catch(function (error) {
				dispatch({ type: actionTypes.STOP_CANDIDATE_DATA_LOADING });
				message.error("Error while deleting data !");
			});
	};

export const addNewCandidatePersonalInterest =
	(newPersonalInterestArray) => (dispatch) => {
		dispatch({ type: actionTypes.START_CANDIDATE_DATA_LOADING });
		dispatch({ type: actionTypes.DATA_SAVE_PROGRESS, payload: actionTypes.dataSavingState.SAVING })

		var _dataToUpdate = {
			updatedPersonalInterest: newPersonalInterestArray,
		};

		const studentId = store.getState().firebase.auth.uid;

		database
			.collection("StudentProfile")
			.doc(studentId)
			.update({
				personalInterest: _dataToUpdate.updatedPersonalInterest,
			})
			.then((res) => {
				// dispatch({
				//   type: actionTypes.ADD_NEW_CANDIDATE_PERSONALINTEREST,
				//   payload: newPersonalInterestArray,
				// });

				dispatch({ type: actionTypes.STOP_CANDIDATE_DATA_LOADING });
				dispatch({ type: actionTypes.DATA_SAVE_PROGRESS, payload: actionTypes.dataSavingState.SAVED })
				message.success("Data added successfully");
			})
			.catch(function (error) {
				dispatch({ type: actionTypes.STOP_CANDIDATE_DATA_LOADING });
				dispatch({ type: actionTypes.DATA_SAVE_PROGRESS, payload: actionTypes.dataSavingState.SAVED })
				message.error("Error while adding data !");
			});
	};

export const updateCandidatePersonalInterest =
	(newPersonalInterestArray) => (dispatch) => {

		dispatch({ type: actionTypes.START_CANDIDATE_DATA_LOADING });
		dispatch({ type: actionTypes.DATA_SAVE_PROGRESS, payload: actionTypes.dataSavingState.SAVING })

		var _dataToUpdate = {
			updatedPersonalInterest: newPersonalInterestArray,
		};

		const studentId = store.getState().firebase.auth.uid;

		database
			.collection("StudentProfile")
			.doc(studentId)
			.update({
				personalInterest: _dataToUpdate.updatedPersonalInterest,
			})
			.then((res) => {
				// dispatch({
				//   type: actionTypes.UPDATE_CANDIDATE_PERSONALINTEREST,
				//   payload: newPersonalInterestArray,
				// });
				message.success("Data updated successfully");
				dispatch({ type: actionTypes.STOP_CANDIDATE_DATA_LOADING });
				dispatch({ type: actionTypes.DATA_SAVE_PROGRESS, payload: actionTypes.dataSavingState.SAVED })
				dispatch({ type: actionTypes.DATA_EDIT_IN_PROGRESS, payload: false })
			})
			.catch(function (error) {

				dispatch({ type: actionTypes.STOP_CANDIDATE_DATA_LOADING });
				dispatch({ type: actionTypes.DATA_SAVE_PROGRESS, payload: actionTypes.dataSavingState.SAVED })
				dispatch({ type: actionTypes.DATA_EDIT_IN_PROGRESS, payload: false })
				message.error("Error while updating data !");
			});
	};

export const deleteCandidatePersonalInterest =
	(interestToDelete) => (dispatch) => {
		dispatch({ type: actionTypes.START_CANDIDATE_DATA_LOADING });

		var _dataToUpdate = {
			updatedPersonalInterest: interestToDelete.personalInterest.filter(
				(work, i) => i !== interestToDelete.id
			),
		};

		const studentId = store.getState().firebase.auth.uid;

		database
			.collection("StudentProfile")
			.doc(studentId)
			.update({
				personalInterest: _dataToUpdate.updatedPersonalInterest,
			})
			.then((res) => {
				// dispatch({
				//   type: actionTypes.DELETE_CANDIDATE_PERSONALINTEREST_BY_ID,
				//   payload: interestToDelete.id,
				// });
				message.warning("Data deleted !");
				dispatch({ type: actionTypes.STOP_CANDIDATE_DATA_LOADING });
			})
			.catch(function (error) {
				dispatch({ type: actionTypes.STOP_CANDIDATE_DATA_LOADING });
				message.error("Error while deleting data !");
			});
	};

export const updateIntroOnly = (selfIntro) => (dispatch) => {
	const studentId = store.getState().firebase.auth.uid;
	dispatch({ type: actionTypes.START_CANDIDATE_DATA_LOADING });
	dispatch({ type: actionTypes.DATA_SAVE_PROGRESS, payload: actionTypes.dataSavingState.SAVING })
	database
		.collection("StudentProfile")
		.doc(studentId)
		.update({ selfIntro: selfIntro })
		.then(() => {
			dispatch({ type: actionTypes.STOP_CANDIDATE_DATA_LOADING });
			dispatch({ type: actionTypes.DATA_SAVE_PROGRESS, payload: actionTypes.dataSavingState.SAVED })
			message.success("Data updated Successfylly");

		})
		.catch(function (error) {
			dispatch({ type: actionTypes.STOP_CANDIDATE_DATA_LOADING });
			dispatch({ type: actionTypes.DATA_SAVE_PROGRESS, payload: actionTypes.dataSavingState.SAVED })
			message.error("Error updating data !");
		});

}

export const updateCandidateIntroVideo = (introVideo, selfIntro) => (dispatch) => {
	dispatch({ type: actionTypes.START_CANDIDATE_DATA_LOADING });
	dispatch({ type: actionTypes.DATA_SAVE_PROGRESS, payload: actionTypes.dataSavingState.SAVING })
	const studentId = store.getState().firebase.auth.uid;

	const storageRef = storage.ref();
	const uploadTask = storageRef
		.child(`CandidateIntroVideo/${studentId}.mp4`)
		.put(introVideo, { contentType: "video/mp4" });

	uploadTask.on(
		"state_changed",
		(snapshot) => {
			const progress = Math.round(
				(snapshot.bytesTransferred / snapshot.totalBytes) * 100
			);
			dispatch({
				type: actionTypes.UPDATE_VIDEO_UPLOAD_PROGRESS,
				payload: progress,
			});
		},
		(err) => {
			message.error("Error in uploading file !");
			dispatch({ type: actionTypes.STOP_CANDIDATE_DATA_LOADING });

		},
		() => {
			uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
				let updateObj = { video: downloadURL }
				if (selfIntro)
					updateObj = { ...updateObj, selfIntro }

				database
					.collection("StudentProfile")
					.doc(studentId)
					.update(updateObj)
					.then(() => {
						// dispatch({
						//   type: actionTypes.UPDATE_CANDIDATE_INTROVIDEO,
						//   payload: res.data.url,
						// });
						dispatch({ type: actionTypes.STOP_CANDIDATE_DATA_LOADING });
						dispatch({ type: actionTypes.DATA_SAVE_PROGRESS, payload: actionTypes.dataSavingState.SAVED })
						message.success("Video uploaded successfully");

					})
					.catch(function (error) {
						dispatch({ type: actionTypes.STOP_CANDIDATE_DATA_LOADING });
						dispatch({ type: actionTypes.DATA_SAVE_PROGRESS, payload: actionTypes.dataSavingState.SAVED })
						message.error("Error in uploading file !");
					});
			});
		}
	);
};

export const updateCandidateVideoThumbnail = (thumbnail) => (dispatch) => {
	const studentId = store.getState().firebase.auth.uid;
	const storageRef = storage.ref();
	storageRef
		.child(`CandidateVideoThumbnail/${studentId}.png`)
		.put(thumbnail, { contentType: "image/png" })
		.then(res => {
			res.ref.getDownloadURL().then(downloadURL => {
				database
					.collection("StudentProfile")
					.doc(studentId)
					.update({ videoThumb: downloadURL })
			})
		})
};

export const publishCandidateProfile = () => (dispatch) => {
	const starEarnedDtails = {
		title: "Profile publish",
		description:
			"The first star student gets when he/she completes and publishes his/her profile.",
		date: moment().format("DD/MM/YYYY"),
		star: "1",
	};

	const studentId = store.getState().firebase.auth.uid;
	dispatch({ type: actionTypes.START_CANDIDATE_DATA_LOADING });
	dispatch({ type: actionTypes.DATA_SAVE_PROGRESS, payload: actionTypes.dataSavingState.SAVING })
	database
		.collection("StudentProfile")
		.doc(studentId)
		.update({
			profileCompletionStatus: true,
			starsEarned:
				firebase.firestore.FieldValue.arrayUnion(starEarnedDtails),
		})
		.then(() => {
			// dispatch({
			//   type: actionTypes.PUBLISH_CANDIDATE_PROFILE,
			//   payload: starEarnedDtails,
			// });
			message.success("Profile Published successfully");
			dispatch({ type: actionTypes.STOP_CANDIDATE_DATA_LOADING });
			dispatch({ type: actionTypes.DATA_SAVE_PROGRESS, payload: actionTypes.dataSavingState.SAVED })
		})
		.catch(function (error) {
			message.error("Error in publishing profile !");
			dispatch({ type: actionTypes.STOP_CANDIDATE_DATA_LOADING });
			dispatch({ type: actionTypes.DATA_SAVE_PROGRESS, payload: actionTypes.dataSavingState.SAVED })
		});
};
