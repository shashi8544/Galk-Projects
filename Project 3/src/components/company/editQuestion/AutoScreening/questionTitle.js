import React, { useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';

export default function QuestionTitle({ questionTitle, setQuestionTitle }) {
    const [showInputBox, setShowInputBox] = useState(true);
    
    const handleQuestionTitleChange = (e) => {
        setQuestionTitle(e.target.value);
      };
    const handleCrossClick = () => {
        setShowInputBox(false);
    };
    return (
        <div>

            <div className="input-box-wrapper">
                    <div className="input-box">
                        <div style={{ color: '#424242', fontSize: 16, fontFamily: 'RobotoCustom', fontWeight: '700', wordWrap: 'break-word' }}>Question’s title</div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                        }}>
                            <input className='question-title-input-box' type="text" placeholder="Question's title" value={questionTitle}
            onChange={handleQuestionTitleChange}/>
                        </div>
                    </div>
            </div>
        </div>
    )
}