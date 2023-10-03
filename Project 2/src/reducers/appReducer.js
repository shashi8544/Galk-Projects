import * as actionTypes from "../actions/types";
import { ApplicationModule } from "../utils/models/applicationModules";

const initialState = {
	isLoading: false,
	appModule: ApplicationModule.Default,
};

const appReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SET_APP_LOADING:
			return {
				...state,
				isLoading: action.payload,
			};
		case actionTypes.SET_APPLIACTION_MODULE:
			return {
				...state,
				appModule: action.payload,
			};
		default:
			return state;
	}
};
export default appReducer;
