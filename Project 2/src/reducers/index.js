import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

import appReducer from "./appReducer";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import userReducer from "./candidateReducer";
import galkLabReducer from "./galkLabReducer";
import profileReducer from "./profileReducers";
import chatRoomReducer from "./chatRoomReducer";
import organisationDataReducer from "./organisationDataReducer";
import galkLabAttendanceReducer from "./galkLabAttendanceReducer";

export default combineReducers({
	user: userReducer,
	auth: authReducer,
	error: errorReducer,
	app: appReducer,
	firestore: firestoreReducer,
	firebase: firebaseReducer,
	profile: profileReducer,
	galkLab: galkLabReducer,
	attendance: galkLabAttendanceReducer,
	chatRoom: chatRoomReducer,
	organisationData: organisationDataReducer,
});
