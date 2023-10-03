import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getQuestionnaireQuestions, updateQuestionnaireQuestions} from "../../../../actions/organisationDataAction";
import Questionnaire from "./questionnaire";
import "./index.css";
import { set } from "lodash";
import plus from "../assets/plus.svg";

const Index = ({
  originalQuestions,
  getQuestionnaireQuestions, // Action to fetch original questions
  updateQuestionnaireQuestions, // Action to update questionnaire questions
  }) => {

  // Fetch the original questions from the database on component mount
  useEffect(() => {
    getQuestionnaireQuestions();
  }, [getQuestionnaireQuestions]);

  // Update the component state when originalQuestions changes
  useEffect(() => {
    setQuestions(originalQuestions);
  }, [originalQuestions]);
  
  // console.log("originalQuestions: ", originalQuestions);
  // console.log("questions: ", questions);
  // Fetch the original questions from the database on component mount
  // useEffect(() => {
    //   getQuestionnaireQuestions();
    // }, []);
    
    const handleAddQuestion = () => {
      setQuestions((prevQuestions) => [
        ...prevQuestions,
        { id: Date.now(), que: "", placeholder: "" },
      ]);
      setIsEditing(true);
    };
    
    const handleEditQuestions = () => {
      setIsEditing(true);
    };
    
    const handleQuestionTitleChange = (event, questionId) => {
      const value = event.target.value;
      setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
      question.id === questionId ? { ...question, que: value } : question
      )
      );
    };
    
    const handleQuestionResponseChange = (event, questionId) => {
      const value = event.target.value;
      setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
      question.id === questionId ? { ...question, placeholder: value } : question
      )
      );
    };
    
    const handleRemoveQuestion = (questionId) => {
      setQuestions((prevQuestions) =>
      prevQuestions.filter((question) => question.id !== questionId)
      );
    };
    
    const handleSubmit = async (event) => {
      // Create JSON object from questions and display in alert
      // const json = JSON.stringify(questions, null, 2);
      // setIsEditing(false);
      // alert(json);
      event.preventDefault();
      setIsEditing(false);
      // console.log(originalQuestions);
      // Dispatch the action to update questionnaire questions
      updateQuestionnaireQuestions(questions);
    };

    const [questions, setQuestions] = useState(originalQuestions);
    const [isEditing, setIsEditing] = useState(false);
    
    return (
      <div>
      <div className="header">
        <div className="header-text">These are your {questions.length} questions you added</div>
        <div className="buttons">
          {questions.length > 0 && (
            <>
              {isEditing ? (
                <>
                  <div className="button-container">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="white-button"
                    >
                      Cancel
                    </button>
                    <button onClick={handleSubmit} className="blue-button">
                      Update
                    </button>
                  </div>
                </>
              ) : (
                <button onClick={handleEditQuestions} className="blue-button">
                  Edit Questions
                </button>
              )}
            </>
          )}
        </div>
      </div>
      <div className="question-container">
        {questions.map((question) => (
          <Questionnaire
            key={question.id}
            questionId={question.id}
            questionTitle={question.que}
            questionResponse={question.placeholder}
            isEditing={isEditing}
            onQuestionTitleChange={(event) =>
              handleQuestionTitleChange(event, question.id)
            }
            onQuestionResponseChange={(event) =>
              handleQuestionResponseChange(event, question.id)
            }
            onRemoveQuestion={() => handleRemoveQuestion(question.id)}
          />
        ))}
      </div>
      {/* {questions.length > 0 && !isEditing && (
        <button onClick={handleEditQuestions}>Edit Questions</button>
        )}
      <button onClick={handleSubmit}>Submit</button> */}
      <button onClick={handleAddQuestion} className="add-button">
        <img src={plus} alt="plus" className="plus" />
        Add Question
      </button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  originalQuestions: state.questionnaire.questions, // Access original questions from redux state
});

export default connect(mapStateToProps, { getQuestionnaireQuestions, updateQuestionnaireQuestions })(Index);
