import * as actionTypes from "../actions/types";

const adminActivityReducer = (state = { state: actionTypes.NOTIFICATION_STATES.idle }, action) => {
    switch (action.type) {
        case actionTypes.NOTIFICATION_PROCESSING:
            return { state: actionTypes.NOTIFICATION_STATES.processing }
        case actionTypes.NOTIFICATION_SUCCESS:
            return { state: actionTypes.NOTIFICATION_STATES.success }
        case actionTypes.NOTIFICATION_FAILED:
            return { state: actionTypes.NOTIFICATION_STATES.failed }
        case actionTypes.NOTIFICATION_IDLE:
            return { state: actionTypes.NOTIFICATION_STATES.idle };
        default:
            return { state: actionTypes.NOTIFICATION_STATES.idle };

    }
}
export default adminActivityReducer;