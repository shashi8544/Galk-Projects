import * as actionTypes from "../actions/types";

const initialState = {
	isLoading: false,
	user: null,
	currentTab: 0,
	tabProgress: 0,
	isVideoUploading: 0,
	video: "",
	videoUploadProgress: 0,
	studentToShowActionInProgress: false,
	screeningQuestions: [],
};

const candidateReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS_IN_STUDENT_MODULE:
			return {
				...state,
				studentToShowActionInProgress: action.payload,
			};
		case actionTypes.UPDATE_USER_DATA:
			return {
				...state,
				user: action.payload,
			};
		case actionTypes.UPDATE_VIDEO_UPLOAD_PROGRESS:
			return {
				...state,
				videoUploadProgress: action.payload,
			};
		case actionTypes.GET_SCREENING_QUESTIONS:
			return {
				...state,
				screeningQuestions: action.payload,
			};
		case actionTypes.SCREENING_QUESTIONS_LOADING:
			return {
				...state,
				isLoading: action.payload,
			};
		case actionTypes.SCREENING_QUESTION_LOAD_ERROR:
			return {
				...state,
				isLoading: false,
			};
		default:
			return state;
	}
};

export default candidateReducer;
