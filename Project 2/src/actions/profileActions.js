import * as actionTypes from "./types";
import { getLastFilledStep } from "./actionHelper";
import { getGraduateLastFilledStep } from "./actionHelper";
import { database } from "../utils/configs/firebaseConfig"; // might need to change this import
import { storage } from "../utils/configs/firebaseConfig";
import store from "../store";
import { message } from "antd";
export const resetImageUploadState = () => (dispatch) => {
	dispatch({ type: actionTypes.STOP_PROFILE_IMAGE_UPLOAD, payload: null });
};
export const uploadCandidateImage = (profilepic) => (dispatch) => {
	dispatch({ type: actionTypes.START_PROFILE_IMAGE_UPLOAD });

	const studentId = store.getState().firebase.auth.uid;

	const base64Image = profilepic?.split(",") || [null, null];
	const format = base64Image[0]?.split(";")[0]?.split(":")[1] || "image/jpeg";

	const storageRef = storage.ref();
	const uploadTask = storageRef
		.child(`CandidateProfilePic/${studentId}.jpg`)
		.putString(base64Image[1], "base64", { contentType: format });

	uploadTask.on(
		"state_changed",
		(snapshot) => {
			// const progress = Math.round(
			//   (snapshot.bytesTransferred / snapshot.totalBytes) * 100
			// );
			// this.setState({ progress });
		},
		(err) => {
			dispatch({
				type: actionTypes.STOP_PROFILE_IMAGE_UPLOAD,
				payload: "failed",
			});
		},
		() => {
			uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
				database
					.collection("StudentProfile")
					.doc(studentId)
					.update({ img: downloadURL })
					.then((res) => {
						dispatch({
							type: actionTypes.STOP_PROFILE_IMAGE_UPLOAD,
							payload: "success",
						});
					})
					.catch(function (error) {
						dispatch({
							type: actionTypes.STOP_PROFILE_IMAGE_UPLOAD,
							payload: "failed",
						});
					});
			});
		}
	);
};

export const updateGalkSubscription =
	({ subscribedInInternship, subscribedInGalkLab }) =>
	(dispatch, getState, { getFirebase, getFirestore }) => {
		dispatch({
			type: actionTypes.CANDIDATE_UPDATE_ACTION_IN_PROGRESS,
			payload: true,
		});

		const state = getState();
		const db = getFirestore();

		const studentId = state.firebase.profile.id;

		db.collection("StudentProfile")
			.doc(studentId)
			.update({
				subscribedInInternship: subscribedInInternship,
				subscribedInGalkLab: subscribedInGalkLab,
			})
			.then(() => {
				// dispatch({
				// 	type: actionTypes.SET_CANDIDATE_GALK_SUBSCRIPTION,
				// 	payload: { subscribedInInternship, subscribedInGalkLab },
				// });
				dispatch({
					type: actionTypes.CANDIDATE_UPDATE_ACTION_IN_PROGRESS,
					payload: false,
				});
			})
			.catch((err) => {
				dispatch({
					type: actionTypes.CANDIDATE_UPDATE_ACTION_IN_PROGRESS,
					payload: false,
				});
			});
	};

export const getStudentProgram =
	(details) =>
	(dispatch, getState, { getFirebase }) => {
		// database
		// .collection("StudentProfile")
		// .doc(studentId)
		// .get()
		// .then((doc) => {
		//     dispatch({
		//         type: actionTypes.GET_USER_PROGRAM,
		//         payload: {isInternship:doc.data().subscribedInInternship,isGalkLab:doc.data().subscribedInGalkLab},
		//     })
		// })
	};

export const updateSocialDetails =
	(details) =>
	(dispatch, getState, { getFirebase }) => {
		// database
		// .collection("StudentProfile")
		// .doc(studentId)
		// .update({
		//    ...details
		// })
		// .then(() => {
		//     dispatch({
		//         type: actionTypes.ADDED_PROGRAM_CHOICE_IN_PORFILE,
		//         payload: {isInternship,isGalkLab},
		//     });
		// })
	};

export const getProfileFillProgressStatus =
	() =>
	(dispatch, getState, { getFirebase }) => {
		const studentId = getState().firebase.auth.uid;
		database
			.collection("StudentProfile")
			.doc(studentId)
			.get()
			.then((doc) => {
				var data = doc.data();
				if (data) {
					if (data.status && data.status === "graduate") {
						let lastFilledStep = getGraduateLastFilledStep(data);
						dispatch({
							type: actionTypes.GET_CANDIDATE_DETAILS,
							payload: {
								// userData: data,
								activeStep: lastFilledStep + 1,
								tabProgress: Math.round((lastFilledStep / 9) * 100),
							},
						});
					} else {
						let lastFilledStep = getLastFilledStep(data);
						dispatch({
							type: actionTypes.GET_CANDIDATE_DETAILS,
							payload: {
								// userData: data,
								activeStep: lastFilledStep + 1,
								tabProgress: Math.round((lastFilledStep / 10) * 100),
							},
						});
					}
				}
			});
	};

export const goNext = () => (dispatch) => {
	dispatch({
		type: actionTypes.GO_NEXT_STEP,
	});
};

export const goBack = () => (dispatch) => {
	dispatch({
		type: actionTypes.GO_PREV_STEP,
	});
};

export const getStudentData = () => (dispatch) => {
	const studentId = store.getState().firebase.auth.uid;
	let unsuscribe = database
		.collection("StudentProfile")
		.doc(studentId)
		.onSnapshot((res) => {
			const data = res.data();
			dispatch({ type: actionTypes.UPDATE_USER_DATA, payload: data });
		});
	return unsuscribe;
};

export const updateStudentBasicInformation =
	(updatedInformation) =>
	(dispatch, getState, { getFirebase, getFirestore }) => {
		dispatch({
			type: actionTypes.CANDIDATE_UPDATE_ACTION_IN_PROGRESS,
			payload: true,
		});

		const studentId = store.getState().firebase.auth.uid;
		const database = getFirestore();

		database
			.collection("StudentProfile")
			.doc(studentId)
			.update({
				...updatedInformation,
			})
			.then(() => {
				message.success("Updated successfully");
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
