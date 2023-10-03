import { combineReducers } from "redux";
import companyReducer from "./companyReducer";
import studentReducer from "./studentReducer";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import languageReducer from "./languageReducer";
import appReducer from "./appReducer";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";
import adminActivityReducer from "./adminActivityReducer";
import GALKLabStudentReducer from "./studentReducerGalkLab";
import jobProgressReducer from "./jobProgressReducer";
import mentorReducer from "./mentorReducer";
import galkLabAttendanceReducer from "./galkLabAttendanceReducer";
import quickInterviewReducer from "./quickInterviewReducer";
import organisationDataReducer from "./organisationDataReducer";

export default combineReducers({
  app: appReducer,
  company: companyReducer,
  student: studentReducer,
  auth: authReducer,
  error: errorReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  language: languageReducer,
  adminActivity: adminActivityReducer,
  GALKLabStudents: GALKLabStudentReducer,
  jobProgress: jobProgressReducer,
  mentor: mentorReducer,
  attendance: galkLabAttendanceReducer,
  quickInterview: quickInterviewReducer,
  questionnaire: organisationDataReducer,
});
