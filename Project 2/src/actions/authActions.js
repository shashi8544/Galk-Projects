import * as actionTypes from "./types";
import { getLastFilledStep } from "./actionHelper";
import { getGraduateLastFilledStep } from "./actionHelper";
import { returnErrors, clearErrors } from "./errorActions";
import { database } from "../utils/configs/firebaseConfig";
import { message } from "antd";
import "antd/dist/antd.css";
import moment from "moment";

export const login =
	(email, password, history) =>
	(dispatch, getState, { getFirebase }) => {
		dispatch({
			type: actionTypes.SET_AUTH_DATA_LOADING,
			payload: true,
		});
		const firebase = getFirebase();

		firebase
			.login({ email, password })
			.then(({ user }) => {
				if (user.user.emailVerified === true) {
					dispatch(clearErrors());

					const userId = user.user.uid;

					dispatch(getApplicationPreloadData(userId, history, firebase));

					dispatch({
						type: actionTypes.SET_AUTH_DATA_LOADING,
						payload: false,
					});
				} else {
					message.error("Email not Verified");
					user.user
						.sendEmailVerification({
							url: "http://candidate.galk.jp.s3-website-ap-northeast-1.amazonaws.com/login",
						})
						.then(() => {
							console.log("verification email sent");
						})
						.catch((e) => {
							console.log("unable to send verification email");
							console.log(e);
						});

					dispatch(
						returnErrors(
							"Your email is not verified yet. Please check your email to verify and login again."
						)
					);
					dispatch({
						type: actionTypes.SET_AUTH_DATA_LOADING,
						payload: false,
					});

					firebase
						.auth()
						.signOut()
						.then(() => {
							dispatch({ type: actionTypes.SET_UNAUTHENTICATED });
						});
				}
			})
			.catch((error) => {
				console.log("Errror during login:", error);
				dispatch(returnErrors(error.message));
				dispatch({
					type: actionTypes.LOGIN_FAIL,
				});
				dispatch({
					type: actionTypes.SET_AUTH_DATA_LOADING,
					payload: false,
				});
			});
	};

export const register =
	(name, gender, status, email, password, history) =>
	(dispatch, getState, { getFirebase, getFirestore }) => {
		dispatch({
			type: actionTypes.SET_AUTH_DATA_LOADING,
			payload: true,
		});

		const firebase = getFirebase();
		const database = getFirestore();

		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then(({ user }) => {
				dispatch(clearErrors());
				const userId = user.uid;

				const studentData = {
					id: user.uid,
					name: name,
					gender: gender,
					status: status,
					email: email,
					img: "",
					video: "",
					videoThumb: "",
					branchName: "",
					collegeName: "",
					collegeGrade: "",
					yearOfAdmission: "",
					dob: "",
					skills: [],
					secondarySkills: [],
					personalInterest: [],
					education: [],
					project: [],
					certificate: [],
					spokenLanguages: [],
					appliedInterships: [],
					linkedinURL: "",
					skypeId: "",
					active: false, //denotes if the candidate has been approved by galk admin
					emailVerified: true, //not implemented
					profileCompletionStatus: false, //denotes if he completed his profile
					interviewCount: [], //stores companies who have called him for interview
					shortListedCount: [], //stores companies who have shortlisted him
					taggedCompanies: [], //stores companies which are tagged for this student
					selectedByCompany: {}, //stores company details who selected this candidate
					yearOfRegistration: "2022", //To filter out only current year students
					newArrived: true, //To denote this candidate as new arrived
					timestamp: moment().format("LL"),
					adminComments: "",
					eatingHabbit: "",
					monthlySalary: "",
					professionType: "",
					avgRating: "",
					experience: "",
					//Added on 8thOct2020
					homeTown: "",
					parentOccupation: "",
					selfStrength: "",
					selfWeakness: "",
					//Added on 7th Nov 2020
					JEERank: "",
					whyInJapan: "",
					personalEmail: "",
					minorDegree: "",
				};

				database
					.collection("StudentProfile")
					.doc(userId)
					.set(studentData)
					.then(() => {
						dispatch({
							type: actionTypes.SET_AUTHENTICATED,
							payload: userId,
						});
						dispatch(getApplicationPreloadData(userId, history, firebase));
						dispatch({
							type: actionTypes.SET_AUTH_DATA_LOADING,
							payload: false,
						});
					})
					.catch((error) => {
						console.log("Errror during registration:", error);
						dispatch(returnErrors(error.message));
						dispatch({
							type: actionTypes.REGISTER_FAIL,
						});
						dispatch({
							type: actionTypes.SET_AUTH_DATA_LOADING,
							payload: false,
						});
					});
			})
			.catch((error) => {
				console.log("Errror during registration:", error);
				dispatch(returnErrors(error.message));
				dispatch({
					type: actionTypes.REGISTER_FAIL,
				});
				dispatch({
					type: actionTypes.SET_AUTH_DATA_LOADING,
					payload: false,
				});
			});
	};

export const logout =
	() =>
	(dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase();

		firebase
			.auth()
			.signOut()
			.then(() => {
				dispatch({ type: actionTypes.SET_UNAUTHENTICATED });
			});

		// history.push("/")
	};

export const resetPassword =
	(newPassword) =>
	(dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase();
		var user = firebase.auth().currentUser;

		user
			.updatePassword(newPassword)
			.then(function () {
				message.success("Your password has been chaanged successfully.");
				dispatch({
					type: actionTypes.RESET_PASSWORD,
				});
			})
			.catch(function (error) {
				console.log(error);
				message.error("Error in changing password !!");
			});
	};

export const getApplicationPreloadData =
	(studentId, history, firebase) =>
	(dispatch, { getFirebase }) => {
		dispatch({
			type: actionTypes.SET_APP_LOADING,
			payload: true,
		});
		dispatch({
			type: actionTypes.SET_CANDIDATE_DATA_LOADING,
			payload: true,
		});

		database
			.collection("StudentProfile")
			.doc(studentId)
			.get()
			.then((doc) => {
				if (!doc.exists) {
					dispatch({
						type: actionTypes.SET_UNAUTHENTICATED,
					});

					firebase
						.auth()
						.signOut()
						.then(() => {
							dispatch({ type: actionTypes.SET_UNAUTHENTICATED });
							dispatch(
								returnErrors("You do not have permission to acces this site.")
							);
						});
				} else {
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

						if (history) {
							history.push("/Home");
						}
						dispatch({
							type: actionTypes.SET_AUTHENTICATED,
							payload: studentId,
						});
						dispatch({
							type: actionTypes.SET_APP_LOADING,
							payload: false,
						});
					}
				}
				dispatch({
					type: actionTypes.SET_CANDIDATE_DATA_LOADING,
					payload: false,
				});
			})
			.catch((err) => {
				console.log("Error in candidate data load:", err);
				message.error("Error in loading user data !");
				dispatch({
					type: actionTypes.SET_UNAUTHENTICATED,
				});
				dispatch({
					type: actionTypes.SET_APP_LOADING,
					payload: true,
				});
				dispatch({
					type: actionTypes.SET_CANDIDATE_DATA_LOADING,
					payload: false,
				});
			});
	};
