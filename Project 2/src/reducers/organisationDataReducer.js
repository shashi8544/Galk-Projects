import * as actionTypes from "../actions/types";

const initialState = {
	colleges: [],
	branches: [],
	certificateCourses: [],
	foods: [],
	religions: [],
	skills: [],
	spokenLanguages: [],
	projectDomains: [],
};

const organisationDataReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SET_COLLEGES:
			return {
				...state,
				colleges: action.payload,
			};
		case actionTypes.SET_BRANCHES:
			return {
				...state,
				branches: action.payload,
			};
		case actionTypes.SET_CERTIFICATE_COURSES:
			return {
				...state,
				certificateCourses: action.payload,
			};
		case actionTypes.SET_FOODS:
			return {
				...state,
				foods: action.payload,
			};
		case actionTypes.SET_RELIGIONS:
			return {
				...state,
				religions: action.payload,
			};
		case actionTypes.SET_SKILLS:
			return {
				...state,
				skills: action.payload,
			};
		case actionTypes.SET_SPOKEN_LANGUAGES:
			return {
				...state,
				spokenLanguages: action.payload,
			};
		case actionTypes.SET_PROJECT_DOMAINS:
			return {
				...state,
				projectDomains: action.payload,
			};
		default:
			return state;
	}
};

export default organisationDataReducer;
