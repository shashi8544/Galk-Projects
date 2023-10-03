import * as actionTypes from "../actions/types";


const initialState = {
    isLoading: false,
    openIssues: null,
    closedIssues: null,
    openPulls: null,
    closedPulls: null,
    addRepoState: actionTypes.NOTIFICATION_STATES.idle,
    err: false,
    body: null,
    timeline: null,
    timelineLoading: false
};
const jobProgressReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.JOB_PROGRESS_LOADING:
            return {
                ...state,
                isLoading: true,
                err: false
            }
        case actionTypes.TIMELINE_LOADED:
            return {
                ...state,
                timeline: action.payload.filter(elm => elm.event === 'commented'),
                timelineLoading: false,
            }
        case actionTypes.ISSUE_LOADING:
            return {
                ...state,
                timelineLoading: action.payload,

            }
        case actionTypes.RESET_TIMELINE:
            return {
                ...state,
                timeline: null
            }
        case actionTypes.BODY_LOADED:
            return {
                ...state,
                body: action.payload,
                timelineLoading: false,
            }
        case actionTypes.JOB_PROGRESS_FAILED:
            return {
                ...state,
                err: true,
            }
        case actionTypes.JOB_PROGRESS_OPEN_ISSUES:
            return {
                ...state,
                openIssues: action.payload.filter(issue => !issue.pull_request),
                err: false
            }
        case actionTypes.JOB_PROGRESS_CLOSED_ISSUES:
            return {
                ...state,
                closedIssues: action.payload.filter(issue => !issue.pull_request),
                err: false
            }
        case actionTypes.JOB_PROGRESS_CLOSED_PULL:
            return {
                ...state,
                closedPulls: action.payload,
                err: false
            }
        case actionTypes.JOB_PROGRESS_OPEN_PULL:
            return {
                ...state,
                openPulls: action.payload,
                err: false
            }
        case actionTypes.ADD_REPO_PROCESSING:
            return {
                ...state,
                addRepoState: actionTypes.NOTIFICATION_STATES.processing
            }
        case actionTypes.ADD_REPO_SUCCESS:
            return {
                ...state,
                addRepoState: actionTypes.NOTIFICATION_STATES.success,
                err: false,
            }
        case actionTypes.ADD_REPO_FAILED:
            return {
                ...state,
                addRepoState: actionTypes.NOTIFICATION_STATES.failed
            }
        case actionTypes.ADD_REPO_IDLE:
            return {
                ...state,
                addRepoState: actionTypes.NOTIFICATION_STATES.idle
            }
        case actionTypes.RESET_ERROR:
            return {
                ...state,
                err: action.payload
            }
        default:
            return state;

    }
}
export default jobProgressReducer;