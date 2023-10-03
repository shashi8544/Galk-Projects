import * as actionTypes from "../actions/types";
import { sortByOption } from "../actions/actionHelper";

const initialState = {
	initialAllStudentList: null,
	allStudentList: null,

	initialThirdYearList: null,
	thirdYearList: null,

	initialFourthYearList: null,
	fourthYearList: null,

	initialGraduateList: null,
	graduateList: null,

	studentListLoading: false,

	studentToShow: null,
	studentToShowLoading: false,
	studentToShowActionInProgress: false,
	studentToShowActionInProgressGalkLab:false
};

const studentReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case actionTypes.GET_ALL_STUDENT_LIST:
			return {
				...state,
				allStudentList: sortByOption([...payload], "name"),
				initialAllStudentList: [...payload],
			};
		case actionTypes.FILTER_STUDENT_LIST:
			return {
				...state,
				allStudentList: sortByOption([...payload], "name"),
			};
		case actionTypes.GET_ALL_THIRD_YEAR_STUDENT_LIST:
			return {
				...state,
				thirdYearList: sortByOption([...payload], "name"),
				initialThirdYearList: [...payload],
			};
		case actionTypes.FILTER_THIRD_YEAR_STUDENT_LIST:
			return {
				...state,
				thirdYearList: sortByOption([...payload], "name"),
			};
		case actionTypes.GET_ALL_FOURTH_YEAR_STUDENT_LIST:
			return {
				...state,
				fourthYearList: sortByOption([...payload], "name"),
				initialFourthYearList: [...payload],
			};
		case actionTypes.FILTER_FOURTH_YEAR_STUDENT_LIST:
			return {
				...state,
				fourthYearList: sortByOption([...payload], "name"),
			};
		case actionTypes.GET_ALL_GRADUATE_STUDENT_LIST:
			return {
				...state,
				graduateList: sortByOption([...payload], "name"),
				initialGraduateList: [...payload],
			};
		case actionTypes.FILTER_GRADUATE_STUDENT_LIST:
			return {
				...state,
				graduateList: sortByOption([...payload], "name"),
			};
		case actionTypes.SET_STUDENT_LIST_LOADING:
			return {
				...state,
				studentListLoading: payload,
			};
		case actionTypes.GET_STUDENT_TO_SHOW_DETAILS_IN_STUDENT_MODULE:
			return {
				...state,
				studentToShow: payload,
			};
		case actionTypes.SET_STUDENT_TO_SHOW_DETAILS_LOADING_IN_STUDENT_MODULE:
			return {
				...state,
				studentToShowLoading: payload,
			};
		case actionTypes.RESET_STUDENT_TO_SHOW_DETAILS_IN_STUDENT_MODULE:
			return {
				...state,
				studentToShow: null,
			};
		case actionTypes.SET_SUBSCRIBED_STUDENT:
			return {
				...state,
				studentToShow: { ...state.studentToShow, subscribedInGalkLab: true },
			};
		case actionTypes.SET_UNSUBSCRIBED_STUDENT:
			return {
				...state,
				studentToShow: { ...state.studentToShow, subscribedInGalkLab: false },
			};
		case actionTypes.SET_STUDENT_PROFILE_IMG:
			let img_oldStudentData = state.studentToShow;
			return {
				...state,
				studentToShow: {
					...img_oldStudentData,
					img: payload,
				},
			};
		case actionTypes.SET_STUDENT_PROFILE_VIDEO:
			let video_oldStudentData = state.studentToShow;
			return {
				...state,
				studentToShow: {
					...video_oldStudentData,
					video: payload,
				},
			};
		case actionTypes.UPDATE_STUDENT_BASIC_INFORMATION:
			let basicInfo_oldStudentData = state.studentToShow;
			return {
				...state,
				studentToShow: {
					...basicInfo_oldStudentData,
					...payload,
				},
			};
		case actionTypes.UPDATE_STUDENT_EDUCATION_INFORMATION:
			return {
				...state,
				studentToShow: {
					...state.studentToShow,
					education: payload,
				},
			};
		case actionTypes.UPDATE_STUDENT_PROJECT_INFORMATION:
			return {
				...state,
				studentToShow: {
					...state.studentToShow,
					project: payload,
				},
			};
		case actionTypes.UPDATE_STUDENT_CERTIFICATE_INFORMATION:
			return {
				...state,
				studentToShow: {
					...state.studentToShow,
					certificate: payload,
				},
			};
		case actionTypes.UPDATE_STUDENT_EXTRACURRICULAR_INFORMATION:
			return {
				...state,
				studentToShow: {
					...state.studentToShow,
					personalInterest: payload,
				},
			};

		case actionTypes.UPDATE_COMPANY_TAG_IN_STUDENT_MODULE:
			return {
				...state,
				studentToShow: {
					...state.studentToShow,
					taggedCompanies: payload,
				},
			};
		case actionTypes.UPDATE_GALK_LAB_COMPANY_TAG_IN_STUDENT_MODULE:
			return {
				...state,
				studentToShow: {
					...state.studentToShow,
					GalktaggedCompanies: payload,
				},
			};
		case actionTypes.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS_IN_STUDENT_MODULE:
			return {
				...state,
				studentToShowActionInProgress: payload,
			};
		case actionTypes.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS_IN_STUDENT_MODULE_GALK_LAB:
			return {
				...state,
				studentToShowActionInProgressGalkLab: payload,
			};
		default:
			return state;
	}
};

export default studentReducer;
