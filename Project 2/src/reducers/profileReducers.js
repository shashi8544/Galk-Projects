import * as actionTypes from "../actions/types";

const initialState = {
	isLoading: false,
	isSaving: actionTypes.dataSavingState.IDLE,
	isEditing: false,
	isInternship: false,
	isGalkLab: false,
	activeStep: 0,
	tabProgress: 0,
	imageUploadResult: null,
	actionInProgress: false,
};

const ProfileReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.GET_CANDIDATE_DETAILS:
			return {
				...state,
				isLoading: false,
				activeStep: action.payload.activeStep,
				tabProgress: action.payload.tabProgress,
			};
		case actionTypes.GET_ACTIVE_FORM_STEP:
			return {
				...state,
				activeStep: action.payload,
			};
		case actionTypes.SET_CANDIDATE_GALK_SUBSCRIPTION:
			return {
				...state,
				isLoading: false,
			};
		case actionTypes.GET_USER_PROGRAM:
			return {
				...state,
				isInternship: action.payload.isInternship,
				isGalkLab: action.payload.isGalkLab,
			};
		case actionTypes.GO_NEXT_STEP:
			return {
				...state,
				activeStep: state.activeStep + 1,
			};
		case actionTypes.GO_PREV_STEP:
			return {
				...state,
				activeStep: state.activeStep - 1,
			};
		case actionTypes.STOP_PROFILE_IMAGE_UPLOAD:
			return {
				...state,
				isLoading: false,
				imageUploadResult: action.payload,
			};
		case actionTypes.START_PROFILE_IMAGE_UPLOAD:
			return {
				...state,
				isLoading: true,
			};
		case actionTypes.STOP_CANDIDATE_DATA_LOADING:
			return {
				...state,
				isLoading: false,
			};
		case actionTypes.START_CANDIDATE_DATA_LOADING:
			return {
				...state,
				isLoading: true,
			};
		case actionTypes.DATA_SAVE_PROGRESS:
			return {
				...state,
				isSaving: action.payload,
			};
		case actionTypes.DATA_EDIT_IN_PROGRESS:
			return {
				...state,
				isEditing: action.payload,
			};
		case actionTypes.CANDIDATE_UPDATE_ACTION_IN_PROGRESS:
			return {
				...state,
				actionInProgress: action.payload,
			};
		default:
			return state;
	}
};
export default ProfileReducer;
