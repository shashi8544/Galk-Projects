import * as actionTypes from "../actions/types";
import moment from "moment";

const calculateDaysOfWeek = (currentWeek) => {
  const daysOfWeek = [];
  // Generate an array of 7 days in the current week
  let startOfWeek = moment(currentWeek).startOf("week");
  for (let i = 0; i < 7; i++) {
    daysOfWeek.push(moment(startOfWeek));
    startOfWeek.add(1, "day");
  }
  return daysOfWeek
};

const initialState = {
  currentWeek: moment(),
  daysOfWeek: calculateDaysOfWeek(moment()),
  slotsData: null,
  isLoading: false,
  meetingLink: "",
  isModalDisplayed: false
};

const QuickInterviewReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.DATA_LOADING:
      return {
        ...state,
        isLoading: payload,
      };
      case actionTypes.MODAL_DISPLAY:
      return {
        ...state,
        isModalDisplayed: payload,
      };
    case actionTypes.GO_TO_NEXT_WEEK:
      return {
        ...state,
        currentWeek: moment(payload).add(1, "week"),
        daysOfWeek: calculateDaysOfWeek(moment(payload).add(1, "week"))
      };
    case actionTypes.GO_TO_PREVIOUS_WEEK:
      return {
        ...state,
        currentWeek: moment(payload).subtract(1, "week"),
        daysOfWeek: calculateDaysOfWeek(moment(payload).subtract(1, "week"))
      };
    case actionTypes.UPDATE_SLOTS_DATA:
      return {
        ...state,
        slotsData: payload,
      };
    case actionTypes.UPDATE_MEETING_LINK:
      return {
        ...state,
        meetingLink: payload
      }
    default:
      return state;
  }
};

export default QuickInterviewReducer;
