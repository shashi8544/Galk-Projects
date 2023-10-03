import React from "react";
import { RightOutlined } from "@ant-design/icons";

import "./singleChoiceQuestions.css";

function SingleChoiceQuestion({
	title,
	inputs,
	options,
	questionNum,
	handleChange,
	selectedOption,
	totalQuestions,
	triggerUpdateQuesNum,
}) {
	const changeQues = () => {
		if (!selectedOption) {
			alert("Please select an option");
		} else if (selectedOption === "Other" && !inputs[title]) {
			alert("Please specify the 'Other' option");
		} else {
			triggerUpdateQuesNum(questionNum + 1);
		}
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
							type="radio"
							name="option"
							title={title}
							value={option}
							onChange={handleChange}
							checked={selectedOption === option}
						/>
						{"\u00a0"}
						{option}
					</label>
				))}
				{options.includes("Other") && (
					<textarea
						type="text"
						title={title}
						name="otherOption"
						onChange={handleChange}
						value={inputs.otherOption}
						placeholder="please specify"
						required={selectedOption === "Other"}
						disabled={selectedOption !== "Other"}
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
}

export default SingleChoiceQuestion;
