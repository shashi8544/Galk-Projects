// organisationDataReducer.js

import * as actionTypes from "../actions/types";

const initialState = {
  questions: [], // Initialize questions with an empty array
  loading: false,
  error: false,
};

const organisationDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_QUESTIONNAIRE_QUESTIONS:
      return {
        ...state,
        questions: action.payload, // Set questions with the data from the action payload
      };
    case actionTypes.QUESTIONNAIRE_QUESTIONS_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case actionTypes.QUESTIONNAIRE_QUESTION_LOAD_ERROR:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
};

export default organisationDataReducer;
