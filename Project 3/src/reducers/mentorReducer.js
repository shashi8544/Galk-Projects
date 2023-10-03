import * as actionTypes from "../actions/types";
import company from "../components/company";

const initialState = {
	error: false,
	loading: false,
	allJobs: null,
	studentLoading: false,
	studentList: null,
	assignProcessing: false,
};
const mentorReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.GALKLAB_JOB_LOADING_MENTOR:
			return { ...state, loading: true, error: false };
		case actionTypes.GALKLAB_JOB_LOAD_ERROR_MENTOR:
			return { ...state, loading: false, error: true };
		case actionTypes.GET_GALKLAB_JOBS_MENTOR:
			let data = action.payload;
			if (data.length === 0) data = null;
			return {
				...state,
				loading: false,
				error: false,
				allJobs: data,
			};
		case actionTypes.GALKLAB_SET_STUDENT_LIST_LOADING_MENTOR:
			return {
				...state,
				studentLoading: action.payload,
			};
		case actionTypes.GALKLAB_GET_STUDENT_LIST_MENTOR:
			return {
				...state,
				studentLoading: false,
				studentList: action.payload,
			};
		case actionTypes.UPDATE_GALK_LAB_JOB_ASSIGN_PORCESSING_MENTOR:
			return {
				...state,
				assignProcessing: action.payload,
			};
		case actionTypes.UPDATE_GALK_LAB_JOB_ASSIGNED_ENGINEER_MENTOR:
			const { studentId, jobId } = action.payload;
			const newAllJobs = state.allJobs?.map((company) => {
				const { companyData, jobs } = company;
				const newJobs = jobs?.map((job) => {
					if (job.jobId === jobId) {
						job.candidateAssignedList.push(studentId);
					}
					return job;
				});
				return { companyData, jobs: newJobs };
			});
			return {
				...state,
				allJobs: newAllJobs,
				assignProcessing: false,
			};
		case actionTypes.UPDATE_GALK_LAB_JOB_UNASSIGNED_MENTOR:
			const _studentId = action.payload.studentId;
			const _jobId = action.payload.jobId;
			const _newAllJobs = state.allJobs?.map((company) => {
				const { companyData, jobs } = company;
				const newJobs = jobs?.map((job) => {
					if (job.jobId === _jobId) {
						const index = job.candidateAssignedList.indexOf(_studentId);
						job.candidateAssignedList.splice(index, 1);
					}
					return job;
				});
				return { companyData, jobs: newJobs };
			});
			return {
				...state,
				allJobs: _newAllJobs,
				assignProcessing: false,
			};
		case actionTypes.UPDATE_TIMESHEET_IN_GALKLAB_JOB_MENTOR:
			let jobListOld = state.allJobs?.map((company) => {
				let { companyData, jobs } = company;

				let newJobs = jobs?.map((elm) => {
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
				return { companyData, jobs: [...newJobs] };
			});
			return {
				...state,
				allJobs: [...jobListOld],
			};
		case actionTypes.APPROVE_TIMESHEET_WEEKLY_IN_GALKLAB_MENTOR:
			let updatedGalkLabJobList = state.allJobs?.map((company) => {
				let { companyData, jobs } = company;

				let newJobs = jobs?.map((elm) => {
					if (elm.jobId === action.payload.jobId) {
						const studentId = action.payload.studentId;
						const datesToApprove = action.payload.datesToApprove;

						let timeObject = {};
						datesToApprove.forEach((dt) => {
							const key = dt.key;
							timeObject[key] = { ...dt };
						});

						if (!elm.timesheet) {
							elm.timesheet = { [studentId]: { ...timeObject } };
						} else if (!elm.timesheet[studentId]) {
							elm.timesheet[studentId] = { ...timeObject };
						} else {
							datesToApprove.forEach((dt) => {
								const key = dt.key;
								elm.timesheet[studentId][key] = { ...dt };
							});
						}
					}
					return elm;
				});
				return { companyData, jobs: [...newJobs] };
			});
			return {
				...state,
				allJobs: [...updatedGalkLabJobList],
			};
		default:
			return state;
	}
};

export default mentorReducer;
