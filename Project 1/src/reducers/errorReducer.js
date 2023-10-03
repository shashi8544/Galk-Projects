import {
    GET_ERRORS,
    CLEAR_ERRORS
} from '../actions/types';

const initialState = {
    error: ""
}
const errorReducer = (state = initialState, action)=> {
    switch (action.type) {
        case GET_ERRORS:
            return {
                ...state,
                error: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: ""
            };
        default:
            return state;
    }
}

export default errorReducer