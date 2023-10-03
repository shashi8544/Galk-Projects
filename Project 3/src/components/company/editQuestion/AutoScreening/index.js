import React, { useState, useEffect, useRef } from 'react';
import { database } from "../../../../utils/configs/firebaseConfig";
import { Button, Modal, message } from 'antd';
import { PlusCircleFilled, MinusCircleFilled, RightOutlined, CloseSquareFilled, CloseOutlined, PlusOutlined, CheckCircleFilled, LeftOutlined } from '@ant-design/icons';
import "./style.css"
import { Card } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {addNewEditQuestion} from '../../../../actions/organisationDataAction';
import QuestionTitle from './questionTitle';
import QuestionTitleWidTextBox from './shortAns/questionTitleWithTextBox';
import CheckBox from './checkBoxAns/index';
import RadioBox from './radioAns/index';
// import RadioButtonWithInput from './widgets/radioButton';
export default function AutoScreening() {
  const dispatch = useDispatch();
// //   const studentList = useSelector(state => state.studentList); // Replace 'studentList' with the correct name of the state where you store the data

//   useEffect(() => {
//     // Dispatch the action to get the data from the backend
//     dispatch(addNewEditQuestion("screeningQuestions"))
//   }, [dispatch]);

//   useEffect(() => {
//     // Here, you can access the data from the backend through 'studentList'
//     // console.log(studentList);
//   }, []);
const [questionDataList, setQuestionDataList] = useState([]);
const [boxes, setBoxes] = useState([]);
const [numerator, setNumerator] = useState(1);
const [open, setOpen] = useState(false);
const [denominator, setDenominator] = useState(5);
const [editMode, setEditMode] = useState(false);
const [showCard, setShowCard] = useState(false);
const [moreQuestion, setMoreQuestion] = useState({});
const [showAddItemButtonOfMoreText, setShowAddItemButtonOfMoreText] = useState(false);
const [selectedText, setSelectedText] = useState('');
const [quesT, setQuesTitle] = useState(1);
const [quesTitleWithBox, setQuesTitleWithBox] = useState(0);
const [showQTitleBox, setShowQTitleBox] = useState(false);
const [showItemBox, setShowItemBox] = useState(true);
const [showCheckBox, setShowCheckBox] = useState(false);
const [showRadioBox, setShowRadioBox] = useState(false);
const [canUpdate, setCanUpdate] = useState(false);
const [questionTitle, setQuestionTitle] = useState("");
const [showPopup, setShowPopup] = useState(false);
const [showAddItem, setShowAddItem] = useState(true);
const showSuccessPopup = () => {
  setShowPopup(true);
  setTimeout(() => {
    setShowPopup(false);
  }, 3000); // Set the timeout to hide the pop-up after 3 seconds (adjust as needed)
};
const checkBoxRef = useRef(null);
const radioBoxRef = useRef(null);
const updateQuestionData = (questionData) => {
  const docRef = database.collection("OrganisationData").doc("screeningQuestions");

  docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        const existingQuestions = doc.data().questions || [];
        const updatedQuestions = [...existingQuestions, questionData];

        docRef
          .update({ questions: updatedQuestions })
          .then(() => {
            console.log("Question data updated successfully.");
            message.success('Data added successfully');
            showSuccessPopup();
          })
          .catch((error) => {
            console.error("Error updating question data:", error);
          });
      } else {
        console.log("Question data doesn't exist.");
        docRef
          .set({ questions: [questionData] })
          .then(() => {
            console.log("Question data created successfully.");
          })
          .catch((error) => {
            console.error("Error creating question data:", error);
          });
      }
    })
    .catch((error) => {
      console.error("Error fetching existing questions:", error);
    });
    setCanUpdate(false);
  return;
};
const handleUpdateQuestionData = (boxId, newData) => {
  setQuestionDataList((prevList) => {
    // Find the index of the box data in the list based on the boxId
    const boxIndex = prevList.findIndex((item) => item.boxId === boxId);

    if (boxIndex !== -1) {
      // If the box data exists in the list, update it
      const updatedList = [...prevList];
      updatedList[boxIndex] = { ...newData, boxId: boxId };
      return updatedList;
    } else {
      // If the box data doesn't exist in the list, add it
      return [...prevList, { ...newData, boxId: boxId }];
    }
  });
};

const handleUpdateWithBox = () => {
  // Call the backend function and pass the questionDataList to save the data
  // Replace 'saveQuestionDataToBackend' with the correct backend function
  // addNewEditQuestion(questionDataList,"screeningQuestions")
  //   useEffect(() => {
  // Dispatch the action to get the data from the backend
  dispatch(addNewEditQuestion(questionDataList,"screeningQuestions",questionTitle))
//   }, [dispatch])
  //   .then(() => {
  //     message.success('Questions updated successfully');
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //     message.error('Error in updating the questions!');
  //   });
};
const handleTextClick = (text) => {
  setSelectedText(text);
};
const handleQuestionTitleClick = () => {
  setSelectedText('Text 1');
  setQuesTitle(quesT + 1);
};
const handleQuestionTitleWithBoxClick = () => {
  setShowQTitleBox(true);
  setShowCard(!showCard);
  setSelectedText('Text 2');
  setShowAddItemButtonOfMoreText(true);
  setQuesTitleWithBox(quesTitleWithBox + 1);
  const newBoxId = Date.now(); // Generate a unique ID for the new box
  setBoxes([...boxes, { id: newBoxId }]);
};
const renderQuestionTitles = (quesT, questionTitle, setQuestionTitle) => {
  const questionTitles = [];

  for (let i = 0; i < quesT; i++) {
      // Pass the questionTitle and setQuestionTitle as props to each QuestionTitle component
      questionTitles.push(
          <QuestionTitle
              key={i}
              questionTitle={questionTitle}
              setQuestionTitle={setQuestionTitle}
          />
      );
  }

  return questionTitles;
};


const renderQuestionTitlesWithBox = (boxes, setBoxes, quesTitleWithBox, setQuesTitleWithBox) => {
  return boxes.map((box, index) => (
    <QuestionTitleWidTextBox
      key={box.id}
      boxId={box.id}
      boxes={boxes}
      setBoxes={setBoxes}
      quesTitleWithBox={quesTitleWithBox}
      setQuesTitleWithBox={setQuesTitleWithBox}
      updateQuestionData={handleUpdateQuestionData} // Pass the function here
    />
  ));
};

  // const renderQuestionTitlesWithBox = (quesTitleWithBox,setQuesTitleWithBox) => {
//     const questionTitlesWithBox = [];

//     // Render the <h1> element only if quesTitleWithBox is greater than 0
//     if (quesTitleWithBox > 0) {
//         questionTitlesWithBox.push(
//             <div key="header" style={{ color: '#424242', fontSize: 16, fontFamily: 'RobotoCustom', fontWeight: '700', wordWrap: 'break-word' }}>
//                 Question’s title with text box
//             </div>
//         );
//     }

//     // Render the <QuestionTitleWidTextBox> components based on the loop
//     for (let i = 0; i < quesTitleWithBox; i++) {
//         questionTitlesWithBox.push(<QuestionTitleWidTextBox quesTitleWithBox={quesTitleWithBox}
//             updateQuesTitleWithBox={setQuesTitleWithBox} key={i} />);
//     }

//     return questionTitlesWithBox;
// };

const handleButtonClick = () => {
  setShowCard(!showCard);
};
const handleButtonClickWithTextBoxAddition = () => {
  setShowCard(!showCard);
  setShowAddItemButtonOfMoreText(true);
  setQuesTitleWithBox(quesTitleWithBox + 1);
  const newBoxId = Date.now(); // Generate a unique ID for the new box
  setBoxes([...boxes, { id: newBoxId }]);

};


const handleIncrease = () => {
  setDenominator(denominator + 1);
};

const handleDecrease = () => {
  setOpen(true);
};
const handleDelete = () => {
  setDenominator(denominator - 1);
  setOpen(false);
}

const handleArrowRight = () => {
  if (numerator < denominator) {
      setShowCheckBox(false);
      setShowRadioBox(false);
      setShowItemBox(true);
      setShowCard(false);
      setQuestionTitle("");
      setShowQTitleBox(false);
      setNumerator(numerator + 1);
  }
};
const handleArrowLeft = () => {
  if(numerator>1) {
      setNumerator(numerator - 1);
  }
};

const handleEdit = () => {
  // handleUpdateWithBox();
  setEditMode(true);
};

const handleCancel = () => {
  setEditMode(false);
};

const handleUpdate = () => {
  // setEditMode(false);
  setCanUpdate(true);
  if (showCheckBox && checkBoxRef.current) {
  checkBoxRef.current.handleUpdateQuestionData();
  } else if (showRadioBox && radioBoxRef.current) {
  radioBoxRef.current.handleUpdateQuestionData();
  }
  else if (showQTitleBox)
  {
      handleUpdateWithBox();
  }
};
const handleCheckBoxClick = () => {
  setShowRadioBox(false);
  setShowCheckBox(true);
  setShowItemBox(false);
  setShowCard(false);
  setShowQTitleBox(false);
  // setShowAddItemButton(false);
};

const handleRadioBoxClick = () => {
  setShowCheckBox(false);
  setShowRadioBox(true);
  setShowItemBox(false);
  setShowCard(false);
  setShowQTitleBox(false);
  // setShowAddItemButton(false);
};

return (
  <div style={{
      height: "70vh",
      padding: 20,
      paddingTop: 0,
  }} >

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', marginLeft: '' }}>
              {
                  <LeftOutlined onClick={handleArrowLeft} style={{ marginRight: '42px', cursor: 'pointer' }} />
              }

              <sup style={{ color: 'black', fontSize: '20px', fontFamily: 'RobotoCustom', fontWeight: '700' }}>{numerator}</sup>
              <span style={{ fontSize: '40px', color: 'black', fontWeight: '5', transform: 'rotate(20deg)' }}>&frasl;</span>
              <sub style={{ color: '#BDBDBD', fontSize: '12px', fontFamily: 'RobotoCustom', fontWeight: '700', marginTop: '15px', alignContent: 'flex-start' }}>{denominator}</sub>

              <RightOutlined onClick={handleArrowRight} style={{ marginLeft: '42px', cursor: 'pointer' }} />
              <span>
                  <PlusCircleFilled onClick={handleIncrease} style={{ fontSize: '16px', marginLeft: '32px', cursor: 'pointer', color: 'var(--main-01, #3977F5)' }} />
                  <MinusCircleFilled onClick={handleDecrease} style={{ fontSize: '16px', marginLeft: '22px', cursor: 'pointer', color: 'var(--main-01, #3977F5)' }} />
              </span>
          </div>
          <div>
              {editMode ? (
                  <>
                      <button className='cancel-btn' onClick={handleCancel}>Cancel</button>
                      <button className='update-btn' onClick={handleUpdate}>Update</button>
                  </>
              ) : (
                  <button className='edit-btn' onClick={handleEdit}>Edit</button>
              )}
          </div>
      </div>
      <div className='question-screen'>
          {renderQuestionTitles(quesT, questionTitle, setQuestionTitle)}
          {quesTitleWithBox != 0 &&
              showQTitleBox && (
                  <div key="header" style={{ color: '#424242', fontSize: 16, fontFamily: 'RobotoCustom', fontWeight: '700', wordWrap: 'break-word' }}>
                    Question’s title with text box
                  </div>
                )}
                
          {showQTitleBox && renderQuestionTitlesWithBox(boxes, setBoxes, quesTitleWithBox, setQuesTitleWithBox,handleUpdateQuestionData)}
      {showCheckBox && (
      <CheckBox
        questionTitle={questionTitle}
        updateQuestionData={updateQuestionData}
        canUpdate={canUpdate} // Add the `canUpdate` prop to allow updating only in edit mode
        ref={checkBoxRef}
      />
    )}
    {showRadioBox && (
      <RadioBox
        questionTitle={questionTitle}
        updateQuestionData={updateQuestionData}
        canUpdate={canUpdate} // Add the `canUpdate` prop to allow updating only in edit mode
        ref={radioBoxRef}
      />
    )}
          {/* <RadioButtonWithInput/> */}
          <div style={{
              marginTop: '16px'
          }}>
              { showItemBox && (
                  quesTitleWithBox == 0 && <button className='add-item-button' onClick={handleButtonClick}>
                      <PlusOutlined style={{ fontSize: '13px', color: 'var(--gray-000, #FFF)', marginRight: '11px' }} />
                      Add item
                  </button>
              )}
              { showItemBox && (
                  quesTitleWithBox != 0 && showAddItemButtonOfMoreText && <button className='add-item-button' onClick={handleButtonClickWithTextBoxAddition}>
                      <PlusOutlined style={{ fontSize: '13px', color: 'var(--gray-000, #FFF)', marginRight: '11px' }} />
                      Add item
                  </button>
              )}
              {showCard && (
                  <div>
                      <Card className="add-item-card">
                          <div
                              className={`text-item ${selectedText === 'Text 2' ? 'selected' : ''}`}
                              onClick={() => handleQuestionTitleWithBoxClick()}
                          >
                              Question's title with text box
                              {selectedText === 'Text 2' && <CheckCircleFilled className="tick-icon" />}
                          </div>
                          <div
                              className={`text-item ${selectedText === 'Text 3' ? 'selected' : ''}`}
                              // onClick={() => handleTextClick('Text 3')}
                              onClick={handleRadioBoxClick}
                          >
                              Radio button
                              {selectedText === 'Text 3' && <CheckCircleFilled className="tick-icon" />}
                          </div>
                          <div
                              className={`text-item ${selectedText === 'Text 4' ? 'selected' : ''}`}
                              // onClick={() => handleTextClick('Text 4')}
                              onClick={handleCheckBoxClick}
                          >
                              Check box
                              {selectedText === 'Text 4' && <CheckCircleFilled className="tick-icon" />}
                          </div>
                          {/* <div
                              className={`text-item ${selectedText === 'Text 5' ? 'selected' : ''}`}
                              onClick={() => handleTextClick('Text 5')}
                          >
                              Text box
                              {selectedText === 'Text 5' && <CheckCircleFilled className="tick-icon" />}
                          </div> */}

                      </Card>
                  </div>
              )}
          </div>
      </div>
      <Modal
          centered
          visible={open}
          onCancel={() => setOpen(false)}
          footer={null}
          width={800}
      >
          <p className='modal-title'>Are you sure you want to delete this question part?</p>
          <div key="delete" style={{ display: 'flex', justifyContent: 'center' }}>

              <Button className="delete-button" type="primary" danger onClick={handleDelete}>
                  Delete
              </Button>
          </div>
      </Modal>
  </div>
);
}