import React, { useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';

export default function QuestionTitleWidTextBox({
  boxId,
  boxes,
  setBoxes,
  quesTitleWithBox,
  setQuesTitleWithBox,
  updateQuestionData, // Add a new prop to update the question data
}) {
  const [showInputBox, setShowInputBox] = useState(true);
  const [label, setLabel] = useState('');
  const [placeholder, setPlaceholder] = useState('');

  const handleCrossClick = () => {
    setBoxes(boxes.filter((box) => box.id !== boxId));
    setQuesTitleWithBox(quesTitleWithBox - 1);
  };

  // Update the question data in the parent component state whenever the user enters data
  const handleLabelChange = (e) => {
    setLabel(e.target.value);
    updateQuestionData(boxId, { label: e.target.value, placeholder });
  };

  // Update the question data in the parent component state whenever the user enters data
  const handlePlaceholderChange = (e) => {
    setPlaceholder(e.target.value);
    updateQuestionData(boxId, { label, placeholder: e.target.value });
  };
  const labelInputClass = label ? 'question-title-input-box-active' : 'question-title-input-box';
  const placeholderInputClass = placeholder ? 'question-title-with-text-input-active' : 'question-title-with-text-input';
  return (
    <div>
      <div className="input-box-wrapper">
        {showInputBox && (
          <div className="input-box">
            <input
              className={labelInputClass}
              type="text"
              placeholder="Question's title"
              value={label}
              onChange={handleLabelChange}
            />
            <CloseOutlined className="cross-icon" onClick={handleCrossClick} />
            <input
              className={placeholderInputClass}
              type="text"
              placeholder="placeholder"
              value={placeholder}
              onChange={handlePlaceholderChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}