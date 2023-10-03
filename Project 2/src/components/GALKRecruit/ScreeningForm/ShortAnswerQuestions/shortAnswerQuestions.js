import React from "react";
import { RightOutlined } from "@ant-design/icons";

import "./shortAnswerQuestions.css";

function ShortAnswerQuestion({
	title,
	label1,
	label2,
	inputs,
	questionNum,
	placeholder1,
	placeholder2,
	handleChange,
	totalQuestions,
	triggerUpdateQuesNum,
}) {
	const changeQues = () => {
		if (!inputs[label1] || !inputs[label2]) {
			alert("All inputs are required");
		} else {
			triggerUpdateQuesNum(questionNum + 1);
		}
	};

	const handleTextAreaFocus = (event) => {
		event.target.value = "";
	};

	return (
		<div className="ques-container">
			<div className="que-title">{title}</div>
			<div className="que-num">
				<span>Q{questionNum}</span>
			</div>
			<div className="que-cover1">
				<label>{label1}</label>
				<textarea
					required
					type="text"
					name={label1}
					className="shortAns"
					onChange={handleChange}
					placeholder={placeholder1}
					value={inputs[label1] || ""}
					onFocus={handleTextAreaFocus}
				/>
				<label>{label2}</label>
				<textarea
					required
					type="text"
					name={label2}
					className="shortAns"
					onChange={handleChange}
					placeholder={placeholder2}
					value={inputs[label2] || ""}
					onFocus={handleTextAreaFocus}
				/>
			</div>
			<div className="next-button-container">
				{questionNum < totalQuestions ? (
					<div className="que-link" onClick={changeQues}>
						<p> Next </p>
						<RightOutlined />
					</div>
				) : (
					<div className="que-submit">
						<input type="submit" value="Finish" />
					</div>
				)}
			</div>
		</div>
	);
}

export default ShortAnswerQuestion;
