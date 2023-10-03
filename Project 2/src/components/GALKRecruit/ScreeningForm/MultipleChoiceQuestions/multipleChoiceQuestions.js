import React, { useState } from "react";
import { RightOutlined } from "@ant-design/icons";

import "./multipleChoiceQuestions.css";

const MultipleChoiceQuestion = ({
	title,
	options,
	questionNum,
	handleChange,
	totalQuestions,
	selectedOptions,
	triggerUpdateQuesNum,
	triggerUpdateOtherOption,
}) => {
	const [text, setText] = useState({});
	const [isOther, setIsOther] = useState(false);

	const changeQues = () => {
		if (isOther) {
			if (!text["Other"]) {
				alert("Please specify the 'Other' option");
			} else {
				triggerUpdateOtherOption({
					name: title,
					checked: true,
					value: text["Other"],
				});
				triggerUpdateQuesNum(questionNum + 1);
			}
		} else {
			if (selectedOptions.length === 0) {
				alert("Please select at least one option");
			} else {
				triggerUpdateQuesNum(questionNum + 1);
			}
		}
	};
	const handleText = (event) => {
		const { name, value } = event.target;
		setText({ ...text, [name]: value });
	};

	return (
		<div className="ques-container">
			<div className="que-title">{title}</div>
			<div className="que-num">
				<span>Q{questionNum}</span>
			</div>
			<div className="que-cover">
				{options.map((option, index) => (
					<label key={index}>
						<input
							type="checkbox"
							name={title}
							value={option === "Other" ? text.other : option}
							onChange={
								option === "Other"
									? () => {
											setIsOther(!isOther);
									  }
									: handleChange
							}
							checked={
								option === "Other" ? isOther : selectedOptions.includes(option)
							}
						/>
						{"\u00a0"}
						{option}
					</label>
				))}
				{options.includes("Other") && (
					<textarea
						type="text"
						name="Other"
						value={text["Other"] || ""}
						placeholder="Write your reason"
						onChange={handleText}
						disabled={!isOther}
						required={isOther}
						className="shortAns"
					/>
				)}
			</div>
			<div className="next-button-container">
				{questionNum < totalQuestions ? (
					<div className="que-link" onClick={changeQues}>
						<p>Next</p>
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
};

export default MultipleChoiceQuestion;
