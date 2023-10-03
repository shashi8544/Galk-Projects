import * as actionTypes from "../actions/types";

const initialState = {
	isSaving: actionTypes.NOTIFICATION_STATES.idle,
	studentId: undefined,
	attendance: undefined,
};
const galkLabAttendanceReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.GET_GALKLAB_ATTENDANCE:
			return {
				...state,
				attendance: action.payload.attendance,
				studentId: action.payload.studentId,
			};
		case actionTypes.GALKLAB_ATTENDANCE_CHANGE_STATE:
			return {
				...state,
				isSaving: action.payload,
			};
		case actionTypes.GALKLAB_ATTENDANCE_UPDATE:
			return {
				...state,
				isSaving: actionTypes.NOTIFICATION_STATES.processing,
			};
		default:
			return state;
	}
};

export default galkLabAttendanceReducer;
