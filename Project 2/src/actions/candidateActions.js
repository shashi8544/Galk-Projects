import * as actionTypes from "./types";
import moment from "moment";
import store from "../store";
import { message } from "antd";
import "antd/dist/antd.css";
import { firebase, database, storage } from "../utils/configs/firebaseConfig";

export const updateCandidateSkillSet = (skillInfo) => (dispatch) => {
	dispatch({
		type: actionTypes.SET_CANDIDATE_DATA_LOADING,
		payload: true,
	});

	var dataToUpdate = { ...skillInfo };

	const studentId = store.getState().firebase.auth.uid;

	database
		.collection("StudentProfile")
		.doc(studentId)
		.update({
			skills: dataToUpdate.skills,
			secondarySkills: dataToUpdate.secondarySkills || [],
			spokenLanguages: dataToUpdate.spokenLanguages,
		})
		.then(() => {
			dispatch({
				type: actionTypes.SET_CANDIDATE_DATA_LOADING,
				payload: false,
			});
			message.success("Data updated successfully !");
		})
		.catch((error) => {
			dispatch({
				type: actionTypes.SET_CANDIDATE_DATA_LOADING,
				payload: false,
			});
			message.error("Error in updating data !");
			console.log(error);
		});
};


export const addConfidentProjectIds = (confidentProjectId) => (dispatch) => {
	dispatch({
		type: actionTypes.SET_CANDIDATE_DATA_LOADING,
		payload: true,
	});

	const studentId = store.getState().firebase.auth.uid;
	database
		.collection("StudentProfile")
		.doc(studentId)
		.update({
			confidentProjects : firebase.firestore.FieldValue.arrayUnion(
				confidentProjectId
			),
		})
		.then(() => {
			dispatch({
				type: actionTypes.SET_CANDIDATE_DATA_LOADING,
				payload: false,
			});
			message.success("Data updated successfully !");
		})
		.catch((error) => {
			dispatch({
				type: actionTypes.SET_CANDIDATE_DATA_LOADING,
				payload: false,
			});
			message.error("Error in updating data !");
			console.log(error);
		});
};

export const deleteConfidentProjects = () => (dispatch) => {
	console.log("MistryParth")
	dispatch({
	  type: actionTypes.SET_CANDIDATE_DATA_LOADING,
	  payload: true,
	});
	const studentId = store.getState().firebase.auth.uid;
	console.log("MistryParth")
	database
	  .collection('StudentProfile')
	  .doc(studentId)
	  .update({
		confidentProjects : firebase.firestore.FieldValue.delete(
		),
	})
	  .then(() => {
		dispatch({
		  type: actionTypes.SET_CANDIDATE_DATA_LOADING,
		  payload: false,
		});
		message.success('Data updated successfully!');
	  })
	  .catch((error) => {
		dispatch({
		  type: actionTypes.SET_CANDIDATE_DATA_LOADING,
		  payload: false,
		});
		message.error('Error in updating data!');
		console.log(error);
	  });
  };
  

export const removeConfidentProjectIds = (confidentProjectId) => (dispatch) => {
	dispatch({
		type: actionTypes.SET_CANDIDATE_DATA_LOADING,
		payload: true,
	});

	const studentId = store.getState().firebase.auth.uid;
	database
		.collection("StudentProfile")
		.doc(studentId)
		.update({
			confidentProjects: firebase.firestore.FieldValue.arrayRemove(
				confidentProjectId
			),
		})
		.then(() => {
			dispatch({
				type: actionTypes.SET_CANDIDATE_DATA_LOADING,
				payload: false,
			});
			message.success("Data removed successfully!");
		})
		.catch((error) => {
			dispatch({
				type: actionTypes.SET_CANDIDATE_DATA_LOADING,
				payload: false,
			});
			message.error("Error in removing data!", error);
			console.log(error);
		});
};

export const addStudentProjectPreference = () => (dispatch) => {
	dispatch({
		type: actionTypes.SET_CANDIDATE_DATA_LOADING,
		payload: true,
	});
	const studentId = store.getState().firebase.auth.uid;
	database
		.collection("StudentProfile")
		.doc(studentId)
		.get()
		.then(async (studentDoc) => {
			let studentData = [];
			studentData.push(studentDoc.data());
			const documentRef = database.collection("StudentProjectPreference").doc(studentId);
			documentRef
  			.get()
  			.then((docSnapshot) => {
    		if (docSnapshot.exists) {
				database
				.collection("StudentProjectPreference")
				.doc(studentId)
				.update({
					branchName: studentData[0].branchName,
					careerPath: "",
					codingScore: "",
					collegeGrade: studentData[0].collegeGrade,
					collegeName: studentData[0].collegeName,
					confidenceProjects: studentData[0].confidentProjects,
					gender: studentData[0].gender,
					id: studentData[0].id,
					image: "",
					name: studentData[0].name,
					secondarySkills: studentData[0].secondarySkills,
					skills: studentData[0].skills
				})
    		} else {
				const data = {
				branchName: studentData[0].branchName,
		  		careerPath: "",
		  		codingScore: "",
		  		collegeGrade: studentData[0].collegeGrade,
				collegeName: studentData[0].collegeName,
				confidenceProjects: studentData[0].confidentProjects,
				gender: studentData[0].gender,
				id: studentData[0].id,
				image: "",
				name: studentData[0].name,
				secondarySkills: studentData[0].secondarySkills,
				skills: studentData[0].skills
				  }; 
				return documentRef.set(data);
   			 }
  			})
		})
		.then(() => {
			dispatch({
				type: actionTypes.SET_CANDIDATE_DATA_LOADING,
				payload: false,
			});
			message.success("Data added successfully!");
		})
		.catch((error) => {
			dispatch({
				type: actionTypes.SET_CANDIDATE_DATA_LOADING,
				payload: false,
			});
			message.error("Error in adding data!");
			console.log(error);
		});
};


export const addCandidateScreeningAnswers =
	(screeningAnswers) => (dispatch) => {
		dispatch({
			type: actionTypes.SET_CANDIDATE_DATA_LOADING,
			payload: true,
		});

		const studentId = store.getState().firebase.auth.uid;

		database
			.collection("StudentProfile")
			.doc(studentId)
			.update({
				screeningAnswers: screeningAnswers,
			})
			.then(() => {
				dispatch({
					type: actionTypes.SET_CANDIDATE_DATA_LOADING,
					payload: false,
				});
				message.success("Data updated successfully !");
			})
			.catch((error) => {
				dispatch({
					type: actionTypes.SET_CANDIDATE_DATA_LOADING,
					payload: false,
				});
				message.error("Error in updating data !");
				console.log(error);
			});
	};

export const resetDataSavingState = () => (dispatch) => {
	dispatch({
		type: actionTypes.DATA_SAVE_PROGRESS,
		payload: actionTypes.dataSavingState.IDLE,
	});
};

export const stopLoading = () => (dispatch) => {
	dispatch({ type: actionTypes.STOP_CANDIDATE_DATA_LOADING });
};

export const startEditingData = (payload) => (dispatch) => {
	if (payload === undefined) payload = true;
	dispatch({ type: actionTypes.DATA_EDIT_IN_PROGRESS, payload: payload });
};

// Job
export const addNewCandidateJob = (newJob) => (dispatch) => {
	newJob = JSON.parse(JSON.stringify(newJob));
	dispatch({ type: actionTypes.START_CANDIDATE_DATA_LOADING });
	dispatch({
		type: actionTypes.DATA_SAVE_PROGRESS,
		payload: actionTypes.dataSavingState.SAVING,
	});
	dispatch({
		type: actionTypes.CANDIDATE_UPDATE_ACTION_IN_PROGRESS,
		payload: true,
	});

	const studentId = store.getState().firebase.auth.uid;

	database
		.collection("StudentProfile")
		.doc(studentId)
		.update({
			job: firebase.firestore.FieldValue.arrayUnion(newJob),
		})
		.then(() => {
			dispatch({
				type: actionTypes.CANDIDATE_UPDATE_ACTION_IN_PROGRESS,
				payload: false,
			});
			dispatch({ type: actionTypes.STOP_CANDIDATE_DATA_LOADING });
			dispatch({
				type: actionTypes.DATA_SAVE_PROGRESS,
				payload: actionTypes.dataSavingState.SAVED,
			});
			message.success("Data added successfully");
		})
		.catch(function (error) {
			dispatch({ type: actionTypes.STOP_CANDIDATE_DATA_LOADING });
			dispatch({
				type: actionTypes.DATA_SAVE_PROGRESS,
				payload: actionTypes.dataSavingState.SAVED,
			});
			message.error("Error in adding student job!");
			dispatch({
				type: actionTypes.CANDIDATE_UPDATE_ACTION_IN_PROGRESS,
				payload: false,
			});
		});
};

export const updateStudentJob =
	(updatedInformation, index) =>
	(dispatch, getState, { getFirebase, getFirestore }) => {
		dispatch({
			type: actionTypes.CANDIDATE_UPDATE_ACTION_IN_PROGRESS,
			payload: true,
		});

		const studentId = getState().firebase.profile.id;
		let studentJobBeforeUpdate = getState().firebase.profile.job || [];
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

export const deleteCandidateJob = (jobList, jobId) => (dispatch) => {
	dispatch({ type: actionTypes.START_CANDIDATE_DATA_LOADING });

	var dataToUpdate = {
		updatedJob: jobList.filter((data, i) => i !== jobId),
	};

	const studentId = store.getState().firebase.auth.uid;

	database
		.collection("StudentProfile")
		.doc(studentId)
		.update({
			job: dataToUpdate.updatedJob,
		})
		.then((res) => {
			dispatch({ type: actionTypes.STOP_CANDIDATE_DATA_LOADING });
			message.success("Data deleted successfully");
		})
		.catch(function (error) {
			dispatch({ type: actionTypes.STOP_CANDIDATE_DATA_LOADING });
			message.error("Error while removing data !");
		});
};

// Education
export const addNewCandidateEducation = (newEducation) => (dispatch) => {
	newEducation = JSON.parse(JSON.stringify(newEducation));
	dispatch({ type: actionTypes.START_CANDIDATE_DATA_LOADING });
	dispatch({
		type: actionTypes.DATA_SAVE_PROGRESS,
		payload: actionTypes.dataSavingState.SAVING,
	});
	dispatch({
		type: actionTypes.CANDIDATE_UPDATE_ACTION_IN_PROGRESS,
		payload: true,
	});

	const studentId = store.getState().firebase.auth.uid;

	database
		.collection("StudentProfile")
		.doc(studentId)
		.update({
			education: firebase.firestore.FieldValue.arrayUnion(newEducation),
		})
		.then(() => {
			dispatch({
				type: actionTypes.CANDIDATE_UPDATE_ACTION_IN_PROGRESS,
				payload: false,
			});
			dispatch({ type: actionTypes.STOP_CANDIDATE_DATA_LOADING });
			dispatch({
				type: actionTypes.DATA_SAVE_PROGRESS,
				payload: actionTypes.dataSavingState.SAVED,
			});
			message.success("Data added successfully");
		})
		.catch(function (error) {
			console.log(error);
			dispatch({ type: actionTypes.STOP_CANDIDATE_DATA_LOADING });
			dispatch({
				type: actionTypes.DATA_SAVE_PROGRESS,
				payload: actionTypes.dataSavingState.SAVED,
			});
			message.error("Error in adding student education!");
			dispatch({
				type: actionTypes.CANDIDATE_UPDATE_ACTION_IN_PROGRESS,
				payload: false,
			});
		});
};

export const updateStudentEducation =
	(updatedInformation, index) =>
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

export const deleteCandidateEducation =
	(educationList, educationId) => (dispatch) => {
		dispatch({ type: actionTypes.START_CANDIDATE_DATA_LOADING });

		var dataToUpdate = {
			updatedEducation: educationList.filter((data, i) => i !== educationId),
		};

		const studentId = store.getState().firebase.auth.uid;

		database
			.collection("StudentProfile")
			.doc(studentId)
			.update({
				education: dataToUpdate.updatedEducation,
			})
			.then((res) => {
				dispatch({ type: actionTypes.STOP_CANDIDATE_DATA_LOADING });
				message.success("Data deleted successfully");
			})
			.catch(function (error) {
				dispatch({ type: actionTypes.STOP_CANDIDATE_DATA_LOADING });
				message.error("Error while removing data !");
			});
	};

// Project
export const addNewCandidateProject = (newProject) => (dispatch) => {
	dispatch({ type: actionTypes.START_CANDIDATE_DATA_LOADING });
	dispatch({
		type: actionTypes.DATA_SAVE_PROGRESS,
		payload: actionTypes.dataSavingState.SAVING,
	});
	dispatch({
		type: actionTypes.CANDIDATE_UPDATE_ACTION_IN_PROGRESS,
		payload: true,
	});

	const studentId = store.getState().firebase.auth.uid;

	database
		.collection("StudentProfile")
		.doc(studentId)
		.update({
			projects: firebase.firestore.FieldValue.arrayUnion(newProject),
		})
		.then(() => {
			dispatch({
				type: actionTypes.CANDIDATE_UPDATE_ACTION_IN_PROGRESS,
				payload: false,
			});
			dispatch({ type: actionTypes.STOP_CANDIDATE_DATA_LOADING });
			dispatch({
				type: actionTypes.DATA_SAVE_PROGRESS,
				payload: actionTypes.dataSavingState.SAVED,
			});
			message.success("Data added successfully");
		})
		.catch(function (error) {
			console.log(error);
			dispatch({ type: actionTypes.STOP_CANDIDATE_DATA_LOADING });
			dispatch({
				type: actionTypes.DATA_SAVE_PROGRESS,
				payload: actionTypes.dataSavingState.SAVED,
			});
			message.error("Error while adding project data !");
			dispatch({
				type: actionTypes.CANDIDATE_UPDATE_ACTION_IN_PROGRESS,
				payload: false,
			});
		});
};

export const updateCandidateProject =
	(studentProjectBeforeUpdate, updatedInformation, index) =>
	(dispatch, getState, { getFirebase, getFirestore }) => {
		dispatch({
			type: actionTypes.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS_IN_STUDENT_MODULE,
			payload: true,
		});

		const studentId = getState().firebase.profile.id;
		const database = getFirestore();

		let updatedStudentProject = studentProjectBeforeUpdate.map((x, i) => {
			let data = { ...x };
			if (i === index) {
				return updatedInformation;
			}
			return data;
		});

		database
			.collection("StudentProfile")
			.doc(studentId)
			.update({
				projects: updatedStudentProject.map((x) => ({
					title: x.title || "",
					projectDomain: x.projectDomain || "",
					otherProjectDomain: x.projectDomain || "",
					skillsUsed: x.skillsUsed || [],
					projectCategory: x.projectCategory || "",
					projectType: x.projectType || "",
					projectMode: x.projectMode || "",
					organisation: x.organisation || "",
					internshipOrJob: x.internshipOrJob || "",
					teamSize: x.teamSize || "",
					role: x.role || "",
					projectLink: x.projectLink || "",
					projectDemo: x.projectDemo || "",
					startDate: x.startDate,
					endDate: x.endDate,
					location: x.location || "",
					description: x.description || "",
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

export const deleteCandidateProject =
	(projectsList, projectId) => (dispatch) => {
		dispatch({ type: actionTypes.START_CANDIDATE_DATA_LOADING });

		var dataToUpdate = {
			updatedProject: projectsList.filter((_data, i) => i !== projectId),
		};
		const studentId = store.getState().firebase.auth.uid;

		database
			.collection("StudentProfile")
			.doc(studentId)
			.update({
				projects: dataToUpdate.updatedProject,
			})
			.then((res) => {
				message.success("Data deleted successfully");
				dispatch({ type: actionTypes.STOP_CANDIDATE_DATA_LOADING });
			})
			.catch(function (error) {
				dispatch({ type: actionTypes.STOP_CANDIDATE_DATA_LOADING });
				message.error("Error while deleting data !");
			});
	};

// Certificate
export const createCandidateCertificate =
	(newCertificate) =>
	(dispatch, getState, { getFirebase, getFirestore }) => {
		dispatch({
			type: actionTypes.CANDIDATE_UPDATE_ACTION_IN_PROGRESS,
			payload: true,
		});

		const studentId = getState().firebase.profile.id;
		const database = getFirestore();

		database
			.collection("StudentProfile")
			.doc(studentId)
			.update({
				certificates: firebase.firestore.FieldValue.arrayUnion(newCertificate),
			})
			.then(() => {
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

export const updateCandidateCertificate =
	(updatedInformation) =>
	(dispatch, getState, { getFirebase, getFirestore }) => {
		dispatch({
			type: actionTypes.CANDIDATE_UPDATE_ACTION_IN_PROGRESS,
			payload: true,
		});

		const studentId = getState().firebase.profile.id;
		let studentCertificatesBeforeUpdate =
			getState().firebase.profile.certificates || [];
		const database = getFirestore();

		let updatedStudentCertificates = studentCertificatesBeforeUpdate.map(
			(item, i) => {
				let data = { ...item };
				if (i === updatedInformation.certificateIndex) {
					return updatedInformation.dataToUpdate;
				}
				return data;
			}
		);

		database
			.collection("StudentProfile")
			.doc(studentId)
			.update({
				certificates: updatedStudentCertificates.map((x) => ({
					title: x.title || "",
					certificateCategory: x.certificateCategory || "",
					courseName: x.courseName || "",
					startDate: x.startDate || "",
					endDate: x.endDate || "",
					certificateProvider: x.certificateProvider || "",
					certifiedSkill: x.certifiedSkill || "",
					projectName: x.projectName || "",
					skillsUsed: x.skillsUsed || [],
					link: x.link || "",
					issueDate: x.issueDate || "",
					description: x.description || "",
				})),
			})
			.then(() => {
				dispatch({
					type: actionTypes.UPDATE_STUDENT_CERTIFICATE_INFORMATION,
					payload: [...updatedStudentCertificates],
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

export const deleteCandidateCertificate =
	(certificateIndex) =>
	(dispatch, getState, { getFirebase, getFirestore }) => {
		dispatch({
			type: actionTypes.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS_IN_STUDENT_MODULE,
			payload: true,
		});

		const studentId = getState().firebase.profile.id;
		let studentCertificatesBeforeUpdate =
			getState().firebase.profile.certificates || [];
		const database = getFirestore();

		let updatedStudentCertificatesList = studentCertificatesBeforeUpdate.filter(
			(item, i) => i !== certificateIndex
		);

		database
			.collection("StudentProfile")
			.doc(studentId)
			.update({
				certificates: updatedStudentCertificatesList,
			})
			.then(() => {
				dispatch({
					type: actionTypes.UPDATE_STUDENT_CERTIFICATE_INFORMATION,
					payload: [...updatedStudentCertificatesList],
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

// Personal Interest
export const addNewCandidatePersonalInterest =
	(newExtraCurricular) =>
	(dispatch, getState, { getFirebase, getFirestore }) => {
		dispatch({
			type: actionTypes.CANDIDATE_UPDATE_ACTION_IN_PROGRESS,
			payload: true,
		});

		const studentId = getState().firebase.profile.id;
		let studentPersonalInterestBeforeUpdate =
			getState().firebase.profile.personalInterest || [];
		const database = getFirestore();

		let newExtraCurricularUpdatedWithId = {
			...newExtraCurricular,
			id: studentPersonalInterestBeforeUpdate.length,
		};

		studentPersonalInterestBeforeUpdate.push(newExtraCurricularUpdatedWithId);
		let updatedPersonalInterest = [...studentPersonalInterestBeforeUpdate];

		database
			.collection("StudentProfile")
			.doc(studentId)
			.update({
				personalInterest: updatedPersonalInterest.map((x) => ({
					title: x.title,
					description: x.description,
				})),
			})
			.then(() => {
				dispatch({
					type: actionTypes.UPDATE_STUDENT_EXTRACURRICULAR_INFORMATION,
					payload: [...updatedPersonalInterest],
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

export const updateCandidatePersonalInterest =
	(updatedInformation) =>
	(dispatch, getState, { getFirebase, getFirestore }) => {
		dispatch({
			type: actionTypes.CANDIDATE_UPDATE_ACTION_IN_PROGRESS,
			payload: true,
		});

		const studentId = getState().firebase.profile.id;
		let studentPersonalInterestBeforeUpdate =
			getState().firebase.profile.personalInterest || [];
		const database = getFirestore();

		let updatedStudentExtraCurricular = studentPersonalInterestBeforeUpdate.map(
			(item, i) => {
				let data = { ...item };
				if (i === updatedInformation.editIndex) {
					data.title = updatedInformation.dataToUpdate.title;
					data.description = updatedInformation.dataToUpdate.description;
				}
				return data;
			}
		);

		database
			.collection("StudentProfile")
			.doc(studentId)
			.update({
				personalInterest: updatedStudentExtraCurricular.map((x) => ({
					title: x.title,
					description: x.description,
				})),
			})
			.then(() => {
				dispatch({
					type: actionTypes.UPDATE_STUDENT_EXTRACURRICULAR_INFORMATION,
					payload: [...updatedStudentExtraCurricular],
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

export const deleteCandidatePersonalInterest =
	(index) =>
	(dispatch, getState, { getFirebase, getFirestore }) => {
		dispatch({
			type: actionTypes.CANDIDATE_UPDATE_ACTION_IN_PROGRESS,
			payload: true,
		});

		const studentId = getState().firebase.profile.id;
		let studentPersonalInterestBeforeUpdate =
			getState().firebase.profile.personalInterest || [];
		const database = getFirestore();

		let updatedPersonalInterest = studentPersonalInterestBeforeUpdate.filter(
			(_item, i) => i !== index
		);

		database
			.collection("StudentProfile")
			.doc(studentId)
			.update({
				personalInterest: updatedPersonalInterest,
			})
			.then(() => {
				dispatch({
					type: actionTypes.UPDATE_STUDENT_EXTRACURRICULAR_INFORMATION,
					payload: [...updatedPersonalInterest],
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

// Introduction
export const updateIntroOnly = (selfIntro) => (dispatch) => {
	const studentId = store.getState().firebase.auth.uid;
	dispatch({ type: actionTypes.START_CANDIDATE_DATA_LOADING });
	dispatch({
		type: actionTypes.DATA_SAVE_PROGRESS,
		payload: actionTypes.dataSavingState.SAVING,
	});
	database
		.collection("StudentProfile")
		.doc(studentId)
		.update({ selfIntro: selfIntro })
		.then(() => {
			dispatch({ type: actionTypes.STOP_CANDIDATE_DATA_LOADING });
			dispatch({
				type: actionTypes.DATA_SAVE_PROGRESS,
				payload: actionTypes.dataSavingState.SAVED,
			});
			message.success("Data updated Successfylly");
		})
		.catch(function (error) {
			dispatch({ type: actionTypes.STOP_CANDIDATE_DATA_LOADING });
			dispatch({
				type: actionTypes.DATA_SAVE_PROGRESS,
				payload: actionTypes.dataSavingState.SAVED,
			});
			message.error("Error updating data !");
		});
};

// Intro Video
export const updateCandidateIntroVideo =
	(introVideo, selfIntro) => (dispatch) => {
		dispatch({ type: actionTypes.START_CANDIDATE_DATA_LOADING });
		dispatch({
			type: actionTypes.DATA_SAVE_PROGRESS,
			payload: actionTypes.dataSavingState.SAVING,
		});
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
					let updateObj = { video: downloadURL };
					if (selfIntro) updateObj = { ...updateObj, selfIntro };

					database
						.collection("StudentProfile")
						.doc(studentId)
						.update(updateObj)
						.then(() => {
							dispatch({ type: actionTypes.STOP_CANDIDATE_DATA_LOADING });
							dispatch({
								type: actionTypes.DATA_SAVE_PROGRESS,
								payload: actionTypes.dataSavingState.SAVED,
							});
							message.success("Video uploaded successfully");
						})
						.catch(function (error) {
							dispatch({ type: actionTypes.STOP_CANDIDATE_DATA_LOADING });
							dispatch({
								type: actionTypes.DATA_SAVE_PROGRESS,
								payload: actionTypes.dataSavingState.SAVED,
							});
							message.error("Error in uploading file !");
						});
				});
			}
		);
	};

// Video Thumbnail
export const updateCandidateVideoThumbnail = (thumbnail) => (dispatch) => {
	const studentId = store.getState().firebase.auth.uid;
	const storageRef = storage.ref();
	storageRef
		.child(`CandidateVideoThumbnail/${studentId}.png`)
		.put(thumbnail, { contentType: "image/png" })
		.then((res) => {
			res.ref.getDownloadURL().then((downloadURL) => {
				database
					.collection("StudentProfile")
					.doc(studentId)
					.update({ videoThumb: downloadURL });
			});
		});
};

// Publish Profile
export const publishCandidateProfile = () => (dispatch) => {
	const starEarnedDetails = {
		title: "Profile publish",
		description:
			"The first star student gets when he/she completes and publishes his/her profile.",
		date: moment().format("DD/MM/YYYY"),
		star: "1",
	};

	const studentId = store.getState().firebase.auth.uid;
	dispatch({ type: actionTypes.START_CANDIDATE_DATA_LOADING });
	dispatch({
		type: actionTypes.DATA_SAVE_PROGRESS,
		payload: actionTypes.dataSavingState.SAVING,
	});
	database
		.collection("StudentProfile")
		.doc(studentId)
		.update({
			profileCompletionStatus: true,
			starsEarned: firebase.firestore.FieldValue.arrayUnion(starEarnedDetails),
		})
		.then(() => {
			message.success("Profile Published successfully");
			dispatch({ type: actionTypes.STOP_CANDIDATE_DATA_LOADING });
			dispatch({
				type: actionTypes.DATA_SAVE_PROGRESS,
				payload: actionTypes.dataSavingState.SAVED,
			});
		})
		.catch(function (error) {
			message.error("Error in publishing profile !");
			dispatch({ type: actionTypes.STOP_CANDIDATE_DATA_LOADING });
			dispatch({
				type: actionTypes.DATA_SAVE_PROGRESS,
				payload: actionTypes.dataSavingState.SAVED,
			});
		});
};
