import * as actionType from "./types";
import { returnErrors, clearErrors } from "./errorActions";
import { CompanyAccountType } from "../utils/constants";

export const loadUserData =
	(id) =>
	(dispatch, getState, { getFirestore }) => {
		dispatch({ type: actionType.USER_LOADING });
		const database = getFirestore();
		database
			.collection("CompanyUserProfile")
			.doc(id)
			.get()
			.then((doc) => {
				var data = doc.data();
				dispatch({
					type: actionType.USER_LOADED,
					payload: data,
				});
			})
			.catch((err) => {
				console.log("User data load error: ", err);
				dispatch(returnErrors("Error during user data load."));
				dispatch({
					type: actionType.AUTH_ERROR,
				});
			});
	};

export const setUserType =
	(userId) =>
	(dispatch, getState, { getFirebase, getFirestore }) => {
		const database = getFirestore();
		database
			.collection("AdminProfiles")
			.doc(userId)
			.get()
			.then((doc) => {
				if (doc.exists) {
					dispatch({
						type: actionType.SET_USER_TYPE,
						payload: CompanyAccountType.GALKAdmin,
					});
					dispatch({
						type: actionType.SET_AUTH_DATA_LOADING,
						payload: false,
					});
				} else {
					database
						.collection("GalkMentorProfiles")
						.doc(userId)
						.get()
						.then((doc) => {
							if (doc.exists) {
								dispatch({
									type: actionType.SET_USER_TYPE,
									payload: CompanyAccountType.Mentor,
								});
								dispatch({
									type: actionType.SET_AUTH_DATA_LOADING,
									payload: false,
								});
							} else {
								getFirebase().logout();
								dispatch({
									type: actionType.LOGIN_FAIL,
								});
								dispatch(
									returnErrors("You do not have permission to acces this site.")
								);
								dispatch({
									type: actionType.SET_AUTH_DATA_LOADING,
									payload: false,
								});
							}
						});
				}
			});
	};

export const login =
	(email, password, history) =>
	(dispatch, getState, { getFirebase, getFirestore }) => {
		dispatch({
			type: actionType.SET_AUTH_DATA_LOADING,
			payload: true,
		});

		getFirebase()
			.login({ email, password })
			.then(({ user }) => {
				dispatch(clearErrors());
				dispatch({
					type: actionType.LOGIN_SUCCESS,
				});
				dispatch(setUserType(user.user.uid));
			})
			.catch((error) => {
				console.log("Errror during login:", error);
				dispatch(returnErrors(error.message));
				dispatch({
					type: actionType.LOGIN_FAIL,
				});
				dispatch({
					type: actionType.SET_AUTH_DATA_LOADING,
					payload: false,
				});
			});
	};

export const logout =
	(history) =>
	(dispatch, getState, { getFirebase }) => {
		// dispatch({type: USER_LOADING});

		const firebase = getFirebase();
		firebase
			.auth()
			.signOut()
			.then(() => {
				// history.push("/");
				dispatch({ type: actionType.LOGOUT_SUCCESS });
				dispatch({ type: actionType.CLEAR_STORE_DATA });
			});
	};
