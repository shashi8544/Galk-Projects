import * as actionTypes from "../actions/types";

const initialState = {
	userId: null,
	isLoading: false,
	user: null,
	isUserAuthenticated: false,
	isEmailVerified: false,
	isAuthDataLoading: false,
};
const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.USER_LOADING:
			return {
				...state,
				isLoading: !state.isLoading,
			};
		case actionTypes.USER_LOADED:
			return {
				...state,
				isLoading: false,
				user: action.payload,
			};
		case actionTypes.LOGIN_SUCCESS:
		case actionTypes.REGISTER_SUCCESS:
			localStorage.setItem("userID", action.payload);
			return {
				...state,
				isLoading: false,
				userId: action.payload,
			};
		case actionTypes.LOGIN_FAIL:
		case actionTypes.LOGOUT_SUCCESS:
		case actionTypes.REGISTER_FAIL:
			localStorage.removeItem("userID");
			return {
				...state,
				userId: null,
				isLoading: false,
			};

		case actionTypes.AUTH_ERROR:
		case actionTypes.SET_AUTHENTICATED:
			return {
				...state,
				isUserAuthenticated: true,
				userId: action.payload,
				isEmailVerified: true,
			};
		case actionTypes.SET_UNAUTHENTICATED:
			return initialState;
		case actionTypes.SET_EMAIL_UNVERIFIED:
			return initialState;
		case actionTypes.SET_AUTH_DATA_LOADING:
			return {
				...state,
				isAuthDataLoading: action.payload,
			};
		default:
			return state;
	}
};

export default authReducer;
