import * as actionTypes from "../actions/types";
import { ItemStatus } from "../Models/ItemStatus";

const initialState = {
    isLoading: ItemStatus.Unknown,
    jobList: null,
    allJobList: null,
};

export default function galkLabReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_GALKLAB_JOBS:
            return {
                ...state,
                jobList: [...action.payload],
                isLoading: ItemStatus.Loaded,
            };
        case actionTypes.GET_GALKLAB_ALL_JOBS:
            return {
                ...state,
                allJobList: action.payload,
                isLoading: ItemStatus.Loaded,
            }
        case actionTypes.UPDATE_TIMESHEET_IN_GALKLAB_JOB:

            const jobList = state.jobList?.map((comp) => {

                comp.jobs = comp.jobs?.map(elm => {
                    if (elm.jobId === action.payload.jobId) {
                        const studentId = action.payload.studentId
                        const date = action.payload.selectedDate
                        const data = action.payload.updateObj
                        if (!elm.timesheet) {
                            elm.timesheet = { [studentId]: { [date]: data } }
                        }
                        else if (!elm.timesheet[studentId]) {
                            elm.timesheet[studentId] = { [date]: data }
                        } else {
                            elm.timesheet[studentId][date] = data
                        }
                    }
                    return elm;
                })
                return comp
            })
            return { ...state, jobList: jobList }
        case actionTypes.GALKLAB_JOB_LOADING:
            return {
                ...state,
                isLoading: ItemStatus.Loading,
            };
        case actionTypes.GALKLAB_JOB_LOAD_ERROR:
            return {
                ...state,
                isLoading: ItemStatus.LoadError,
            };
        default:
            return state;
    }
}
