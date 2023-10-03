import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import "./index.css";
// import close from "../../../../../assets/images/close-fill.svg";
import { CloseOutlined } from "@ant-design/icons";

const CheckBox = forwardRef(({ questionTitle, updateQuestionData, canUpdate }, ref) => {
  const [checkboxes, setCheckboxes] = useState([
    { id: 1, text: "", checked: false },
    { id: 2, text: "", checked: false },
    { id: 3, text: "", checked: false },
    { id: 4, text: "", checked: false },
  ]);
  const [otherbox, setOtherbox] = useState({ id: 1, text: "", checked: false });
  const [showOther, setShowOther] = useState(false);

  const handleAddCheckSection = () => {
    const newCheckboxId = checkboxes.length > 0 ? checkboxes[checkboxes.length - 1].id + 1 : 1;
    setCheckboxes((prevState) => [
      ...prevState,
      { id: newCheckboxId, text: "", checked: false },
    ]);
  };
  

  const handleAddOtherSection = () => {
    setOtherbox({ id: 1, text: "", checked: false });
    setShowOther(true);
  };

  const handleRemoveCheckbox = (id) => {
    setCheckboxes((prevState) =>
      prevState.filter((checkbox) => checkbox.id !== id)
    );
  };

  const handleRemoveOtherbox = () => {
    setOtherbox(null);
    setShowOther(false);
  };

  const handleUpdateQuestionData = () => {
    const options = checkboxes.map((checkbox) => checkbox.text).filter(Boolean);
    const otherBoxText = otherbox ? otherbox.text : "";
    const placeholderInput = document.querySelector(".additional-input");
    const placeholderText = placeholderInput?.value || "";
  
    const questionData = {
      title: questionTitle,
      type: 1,
      options: options,
    };
  
    if (otherbox && otherBoxText.trim() !== "") {
      questionData.options.push(otherBoxText);
    }
  
    if (placeholderText.trim() !== "") {
      questionData.placeholder = placeholderText;
    }
  
    if (canUpdate) {
      updateQuestionData(questionData);
    }
  };
  
  

  useEffect(() => {
    handleUpdateQuestionData();
  }, [checkboxes, otherbox, canUpdate]);

  useImperativeHandle(ref, () => ({
    handleUpdateQuestionData: () => {
      handleUpdateQuestionData();
    },
  }));

  return (
    <div className="scrollable-container">
      <div className="checkbox-container">
        <h3 className="checkbox-heading">Check Box</h3>
        {checkboxes.map((checkbox) => (
          <div className="checkbox-line" key={checkbox.id}>
            <label className="checkbox-label">
              <span className="box-square" />
              <input
                type="text"
                className="checkbox-input"
                placeholder="Check box"
                value={checkbox.text}
                onChange={(e) =>
                  setCheckboxes((prevState) =>
                    prevState.map((cb) =>
                      cb.id === checkbox.id ? { ...cb, text: e.target.value } : cb
                    )
                  )
                }
              />
              <CloseOutlined className="close-icon" onClick={() => handleRemoveCheckbox(checkbox.id)}/>
              {/* <button
                className="close-button"
                onClick={() => handleRemoveCheckbox(checkbox.id)}
              >
                <img src={close} alt="Close" className="close-icon" />
              </button> */}
            </label>
          </div>
        ))}

        {showOther && (
          <div className="checkbox-line">
            <label className="checkbox-label">
              <span className="box-square" />
              <input
                type="text"
                className="checkbox-input"
                placeholder="Other"
                value={otherbox.text}
                onChange={(e) =>
                  setOtherbox((prevState) => ({ ...prevState, text: e.target.value }))
                }
              />
              <CloseOutlined className="close-icon"onClick={handleRemoveOtherbox}/>
              {/* <button className="close-button" onClick={handleRemoveOtherbox}>
                <img src={close} alt="Close" className="close-icon" />
              </button> */}
            </label>
          </div>
        )}

        {showOther && (
          <input type="text" className="additional-input" placeholder="Placeholder" />
        )}

        <div className="add-section-buttons">
          <button className="add-checkbox-btn" onClick={handleAddCheckSection}>
            + Add Check Box
          </button>
          {!showOther && (
            <div className="or-section">
              <span className="or-text">or</span>
              <button className="add-other-btn" onClick={handleAddOtherSection}>
                + Add Other
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default CheckBox;