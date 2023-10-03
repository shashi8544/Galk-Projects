import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import appReducer from "./appReducer";
import profileReducer from "./profileReducers";
import userReducer from "./candidateReducer";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";
import galkLabReducer from "./galkLabReducer";
import galkLabAttendanceReducer from "./galkLabAttendanceReducer";
import chatRoomReducer from './chatRoomReducer'
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
});
