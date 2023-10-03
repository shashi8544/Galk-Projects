import { message } from "antd";
import * as actionTypes from "./types";
import { firebase, database, storage } from "../utils/configs/firebaseConfig";

export const getQuestionnaireQuestions =
  () =>
  (dispatch, _getState, { getFirestore }) => {
    dispatch({
      type: actionTypes.QUESTIONNAIRE_QUESTIONS_LOADING,
      payload: true,
    });

    const database = getFirestore();

    database
      .collection("OrganisationData")
      .doc("questionerQuestions")
      .get()
      .then((doc) => {
        let questionerQuestions = doc.data().questions;

        dispatch({
          type: actionTypes.GET_QUESTIONNAIRE_QUESTIONS,
          payload: questionerQuestions,
        });
        dispatch({
          type: actionTypes.QUESTIONNAIRE_QUESTIONS_LOADING,
          payload: false,
        });
      })
      .catch((err) => {
        console.log("Error retrieving questions data: ", err);
        dispatch({ type: actionTypes.QUESTIONNAIRE_QUESTION_LOAD_ERROR });
      })
      .finally(() => {
        // This part will be executed whether the fetch is successful or not.
        // Here we can update the component state with the fetched data.
        // If originalQuestions is available, update the questions state with it.
        dispatch({ type: actionTypes.QUESTIONNAIRE_QUESTIONS_LOADING });
      });
  };

export const updateQuestionnaireQuestions = (questions) => (dispatch) => {
  dispatch({
    type: actionTypes.UPDATE_QUESTIONNAIRE_QUESTION,
    payload: true,
  });

  database
    .collection("OrganisationData")
    .doc("questionerQuestions")
    .update({
      questions: questions,
    })
    .then(() => {
      dispatch({
        type: actionTypes.UPDATE_QUESTIONNAIRE_QUESTION,
        payload: false,
      });
      message.success("Questionnaire questions updated successfully");
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.UPDATE_QUESTIONNAIRE_QUESTION_ERROR,
        payload: false,
      });
      message.error("Error updating questionnaire questions");
      console.log("Error updating questionnaire questions: ", err);
    });
};

export const addNewEditQuestion =
  (newJob, documentId, questionTitle) => (dispatch) => {
    console.log(newJob);
    // const typeData = { type: "3" };
    // const titleData = { title: "Here Will be Question title" };
    const typeData = '3';
    const titleData = questionTitle;
    let convertedObject = {
      question: Object.fromEntries(
        Object.entries(newJob).map(([key, value]) => {
          const { boxId, ...rest } = value;
          return [key, rest];
        })
      ),
      type: typeData,
      title: titleData,
    };
    console.log(convertedObject);
    // convertedObject = {question:{...convertedObject},...typeData};
    console.log(convertedObject);
    // convertedObject = { question: convertedObject };
    convertedObject = JSON.parse(JSON.stringify(convertedObject));
    console.log(convertedObject);
    dispatch({
      type: actionTypes.GET_DATA_LOADING_FOR_EDIT_QUESTION,
      payload: true,
    });

    return new Promise((resolve, reject) => {
      database
        .collection("OrganisationData")
        .doc(documentId)
        .update({
          questions: firebase.firestore.FieldValue.arrayUnion(convertedObject),
        })
        .then(() => {
          dispatch({
            type: actionTypes.SET_DATA_LOADING_FOR_EDIT_QUESTION,
            payload: true,
          });
          message.success("Data added successfully");
          resolve(); // Resolve the Promise on successful update
        })
        .catch((error) => {
          console.log(error);
          message.error("Error in adding student job!");
          reject(error); // Reject the Promise on error
        });
    });
  };
