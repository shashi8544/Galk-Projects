import * as actionTypes from "../actions/types";
import { ItemStatus } from "../Models/ItemStatus";

const initialState = {
	isLoading: ItemStatus.Unknown,
	jobList: null,
	allJobList: null,

	allProjectsList: null,
	confidentProjectsList: null,
	shortlistedProjectsList: null,
	shortlistedProjectsByCompanyList: null,

	matchedJobsList: null,
	companyProfileIndex: -1,
	matchedJobsLoading: false,
};

export default function galkLabReducer(state = initialState, action) {
	switch (action.type) {
		case actionTypes.GET_GALKLAB_JOBS:
			return {
				...state,
				jobList: [...action.payload],
				isLoading: ItemStatus.Loaded,
			};
			case actionTypes.GET_GALKRECRUIT_ALL_PROJECTS:
				return {
					...state,
					allProjectsList: [...action.payload],
					isLoading: ItemStatus.Loaded,
				};
		case actionTypes.GET_GALKRECRUIT_CONFIDENT_PROJECTS:
				return {
					...state,
					confidentProjectsList: [...action.payload],
					isLoading: ItemStatus.Loaded,
				};
		case actionTypes.GET_GALKRECRUIT_SHORTLISTED_PROJECTS:
				return {
					...state,
					shortlistedProjectsList: [...action.payload],
					isLoading: ItemStatus.Loaded,
				};
		case actionTypes.GET_GALKRECRUIT_SHORTLISTED_PROJECTS_BY_COMPANY:
				return {
					...state,
					shortlistedProjectsByCompanyList: [...action.payload],
					isLoading: ItemStatus.Loaded,
				};
		case actionTypes.GALKRECRUIT_ALL_PROJECTS_LOADING:
				return {
					...state,
					isLoading: action.payload,
				};
		case actionTypes.GALKRECRUIT_CONFIDENT_PROJECTS_LOADING:
				return {
					...state,
					isLoading: action.payload,
				};
		case actionTypes.GALKRECRUIT_SHORTLISTED_PROJECTS_LOADING:
				return {
					...state,
					isLoading: action.payload,
				};
		case actionTypes.GALKRECRUIT_SHORTLISTED_PROJECTS_BY_COMPANY_LOADING:
				return {
					...state,
					isLoading: action.payload,
				};
		case actionTypes.GALKRECRUIT_ALL_PROJECTS_ERROR:
				return {
					...state,
					isLoading: ItemStatus.LoadError,
				};
		case actionTypes.GALKRECRUIT_CONFIDENT_PROJECTS_ERROR:
				return {
					...state,
					isLoading: ItemStatus.LoadError,
				};
		case actionTypes.GALKRECRUIT_SHORTLISTED_PROJECTS_ERROR:
				return {
					...state,
					isLoading: ItemStatus.LoadError,
				};
		case actionTypes.GALKRECRUIT_SHORTLISTED_PROJECTS_BY_COMPANY_ERROR:
				return {
					...state,
					isLoading: ItemStatus.LoadError,
				};
		case actionTypes.GALKLAB_MATCHED_JOBS_INDEX:
			return {
				...state,
				companyProfileIndex: action.payload,
			};
		case actionTypes.GET_GALKLAB_MATCHED_JOBS:
			return {
				...state,
				matchedJobsList: action.payload,
				isLoading: ItemStatus.Loaded,
			};
		case actionTypes.GALKLAB_MATCHED_JOBS_LOADING:
			return {
				...state,
				matchedJobsLoading: action.payload,
			};
		case actionTypes.GET_GALKLAB_ALL_JOBS:
			return {
				...state,
				allJobList: action.payload,
				isLoading: ItemStatus.Loaded,
			};
		case actionTypes.UPDATE_TIMESHEET_IN_GALKLAB_JOB:
			const jobList = state.jobList?.map((comp) => {
				comp.jobs = comp.jobs?.map((elm) => {
					if (elm.jobId === action.payload.jobId) {
						const studentId = action.payload.studentId;
						const date = action.payload.selectedDate;
						const data = action.payload.updateObj;
						if (!elm.timesheet) {
							elm.timesheet = { [studentId]: { [date]: data } };
						} else if (!elm.timesheet[studentId]) {
							elm.timesheet[studentId] = { [date]: data };
						} else {
							elm.timesheet[studentId][date] = data;
						}
					}
					return elm;
				});
				return comp;
			});
			return { ...state, jobList: jobList };
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