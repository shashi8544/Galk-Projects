import React from "react";
import "./questionnaire.css";
import close from "../assets/close.svg";

const Questionnaire = ({
  questionId,
  questionTitle,
  questionResponse,
  isEditing,
  onQuestionTitleChange,
  onQuestionResponseChange,
  onRemoveQuestion,
}) => {
  return (
    <div>
      {isEditing ? (
        <div className="text-box">
          <h2>Question Title and Text Box</h2>
          <div className="question-header">
            <input
              type="text"
              value={questionTitle}
              onChange={onQuestionTitleChange}
              placeholder="Enter question title"
              className="question-title"
            />
            <button className="remove-button" onClick={() => onRemoveQuestion(questionId)}>
              <img src={close} alt="close" height="15" width="15" />
            </button>
          </div>
          <textarea
            rows="4"
            value={questionResponse}
            onChange={onQuestionResponseChange}
            placeholder="Enter placeholder text"
            className="question-placeholder"
            resize="none"
          ></textarea>
        </div>
      ) : (
        <div className="text-box">
          <h2>Question Title and Text Box</h2>
          <div className="questionheader">
            <textarea
              rows="1"
              value={questionTitle}
              className="question-title"
              resize="none"
            ></textarea>
            <button className="remove-button" onClick={() => onRemoveQuestion(questionId)}>
              <img src={close} alt="close" height="15" width="15" />
            </button>
          </div>
          <textarea
            rows="4"
            value={questionResponse}
            className="question-placeholder"
            resize="none"
          ></textarea>
        </div>
      )}
    </div>
  );
};

export default Questionnaire;
