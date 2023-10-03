import { message } from "antd";

import * as actionTypes from "./types";

export const getColleges =
	() =>
	(dispatch, _getState, { getFirestore }) => {
		const database = getFirestore();

		database
			.collection("OrganisationData")
			.doc("colleges")
			.get()
			.then((doc) => {
				let colleges = doc.data().colleges;

				dispatch({
					type: actionTypes.SET_COLLEGES,
					payload: colleges,
				});
			})
			.catch((err) => {
				console.log("Colleges loading error ", err);
				message.error("Error while loading colleges data !");
			});
	};

export const getBranches =
	() =>
	(dispatch, _getState, { getFirestore }) => {
		const database = getFirestore();

		database
			.collection("OrganisationData")
			.doc("branches")
			.get()
			.then((doc) => {
				let branches = doc.data().branches;

				dispatch({
					type: actionTypes.SET_BRANCHES,
					payload: branches,
				});
			})
			.catch((err) => {
				console.log("Branches loading error ", err);
				message.error("Error while loading branches data !");
			});
	};

export const getCertificateCourses =
	() =>
	(dispatch, _getState, { getFirestore }) => {
		const database = getFirestore();

		database
			.collection("OrganisationData")
			.doc("certificateCourses")
			.get()
			.then((doc) => {
				let certificateCourses = doc.data().courses;

				dispatch({
					type: actionTypes.SET_CERTIFICATE_COURSES,
					payload: certificateCourses,
				});
			})
			.catch((err) => {
				console.log("Certificate courses loading error ", err);
				message.error("Error while loading certificate courses data !");
			});
	};

export const getFoods =
	() =>
	(dispatch, _getState, { getFirestore }) => {
		const database = getFirestore();

		database
			.collection("OrganisationData")
			.doc("foods")
			.get()
			.then((doc) => {
				let foods = doc.data().foods;

				dispatch({
					type: actionTypes.SET_FOODS,
					payload: foods,
				});
			})
			.catch((err) => {
				console.log("Foods loading error ", err);
				message.error("Error while loading foods data !");
			});
	};

export const getReligions =
	() =>
	(dispatch, _getState, { getFirestore }) => {
		const database = getFirestore();

		database
			.collection("OrganisationData")
			.doc("religions")
			.get()
			.then((doc) => {
				let religions = doc.data().religions;

				dispatch({
					type: actionTypes.SET_RELIGIONS,
					payload: religions,
				});
			})
			.catch((err) => {
				console.log("Religions loading error ", err);
				message.error("Error while loading religions data !");
			});
	};

export const getSkills =
	() =>
	(dispatch, _getState, { getFirestore }) => {
		const database = getFirestore();

		database
			.collection("OrganisationData")
			.doc("skills")
			.get()
			.then((doc) => {
				let skills = doc.data().skills;

				dispatch({
					type: actionTypes.SET_SKILLS,
					payload: skills,
				});
			})
			.catch((err) => {
				console.log("Skills loading error ", err);
				message.error("Error while loading skills data !");
			});
	};

export const getSpokenLanguages =
	() =>
	(dispatch, _getState, { getFirestore }) => {
		const database = getFirestore();

		database
			.collection("OrganisationData")
			.doc("spokenLanguages")
			.get()
			.then((doc) => {
				let spokenLanguages = doc.data().spokenLanguages;

				dispatch({
					type: actionTypes.SET_SPOKEN_LANGUAGES,
					payload: spokenLanguages,
				});
			})
			.catch((err) => {
				console.log("Spoken language loading error ", err);
				message.error("Error while loading spoken language data !");
			});
	};

export const getProjectDomains =
	() =>
	(dispatch, _getState, { getFirestore }) => {
		const database = getFirestore();

		database
			.collection("OrganisationData")
			.doc("projectDomains")
			.get()
			.then((doc) => {
				let projectDomains = doc.data().projectDomains;

				dispatch({
					type: actionTypes.SET_PROJECT_DOMAINS,
					payload: projectDomains,
				});
			})
			.catch((err) => {
				console.log("Project domains loading error ", err);
				message.error("Error while loading project domains data !");
			});
	};

export const getScreeningQuestions =
	() =>
	(dispatch, _getState, { getFirestore }) => {
		dispatch({ type: actionTypes.SCREENING_QUESTIONS_LOADING, payload: true });

		const database = getFirestore();

		database
			.collection("OrganisationData")
			.doc("screeningQuestions")
			.get()
			.then((doc) => {
				let screeningQuestions = doc.data().questions;

				dispatch({
					type: actionTypes.GET_SCREENING_QUESTIONS,
					payload: screeningQuestions,
				});
				dispatch({
					type: actionTypes.SCREENING_QUESTIONS_LOADING,
					payload: false,
				});
			})
			.catch((err) => {
				console.log("Error retrieving questions data: ", err);
				dispatch({ type: actionTypes.SCREENING_QUESTION_LOAD_ERROR });
			});
	};
