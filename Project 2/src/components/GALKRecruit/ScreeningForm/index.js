import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import FormEnd from "./FormEnd.js";
import ProgMeter from "./ProgMeter";
import FormStart from "./FormStart.js";
import SCQuestions from "./SingleChoiceQuestions/singleChoiceQuestions";
import MCQuestions from "./MultipleChoiceQuestions/multipleChoiceQuestions";
import ShortAnswerQuestions from "./ShortAnswerQuestions/shortAnswerQuestions";

import { getScreeningQuestions } from "../../../actions/organisationDataActions";
import { addCandidateScreeningAnswers } from "../../../actions/candidateActions.js";

import "./index.css";

const ScreeningForm = ({
	getScreeningQuestions,
	addCandidateScreeningAnswers,
	screeningQuestions,
}) => {
	useEffect(() => {
		getScreeningQuestions();
	});

	const [inputs, setInputs] = useState({});
	const [quesNum, setQuesNum] = useState(1);
	const [isStart, setIsStart] = useState(false);
	const [isSubmit, setIsSubmit] = useState(false);
	const [inputsMulti, setInputsMulti] = useState({});
	const [selectedOption, setSelectedOption] = useState("");
	const [selectedOptions, setSelectedOptions] = useState([]);

	const totalQuestions = screeningQuestions.length;

	const updateIsStart = (state) => {
		setIsStart(state);
	};
	const updateQuesNum = (state) => {
		setQuesNum(state);
	};

	const handleSubmit = async (events) => {
		setIsSubmit(true);
		events.preventDefault();
		addCandidateScreeningAnswers(inputs);
	};

	const handleSingleChoiceChange = (event) => {
		const { name, value, title } = event.target;

		if (name === "option") {
			if (value === "Other") {
				setInputs({ ...inputs, [title]: "" });
				setSelectedOption(value);
			} else {
				setInputs({ ...inputs, [title]: value });
				setSelectedOption(value);
			}
		} else if (name === "otherOption") {
			setInputs({ ...inputs, [title]: value });
		}
	};

	const handleShortAnsChange = (event) => {
		const { name, value } = event.target;
		setInputs({ ...inputs, [name]: value });
	};

	const handleMultipleChoiceChange = (event) => {
		const { name, checked, value } = event.target;

		let updatedOptions = [];
		if (checked) {
			updatedOptions = [...selectedOptions, value];
		} else {
			updatedOptions = selectedOptions.filter((option) => option !== value);
		}
		const updatedInputs = {
			...inputsMulti,
			[name]: updatedOptions.length ? updatedOptions : null,
		};

		setInputsMulti(updatedInputs);
		setSelectedOption("");

		setSelectedOptions(updatedOptions);

		setInputs({ ...inputs, [name]: updatedInputs[name] });
	};

	const handleOtherMultipleChoiceChange = (event) => {
		const { name, checked, value } = event;

		let updatedOptions = [];
		if (checked) {
			updatedOptions = [...selectedOptions, value];
		} else {
			updatedOptions = selectedOptions.filter((option) => option !== value);
		}

		const updatedInputs = {
			...inputsMulti,
			[name]: updatedOptions.length ? updatedOptions : null,
		};

		setSelectedOption("");
		setInputsMulti(updatedInputs);

		setSelectedOptions(updatedOptions);
		setInputs({ ...inputs, [name]: updatedInputs[name] });
	};

	const question = screeningQuestions[quesNum - 1];

	return (
		<>
			<section
				className="screening-form-container"
				style={{
					backgroundColor: `${
						isStart && !isSubmit ? "rgba(0, 0, 0, 0.5)" : "transparent"
					}`,
				}}
			>
				{isStart && !isSubmit ? (
					<>
						<div className="progmeter-div">
							<ProgMeter
								questionNum={quesNum}
								totalQuestions={totalQuestions}
							></ProgMeter>
						</div>
						<form className="form-container" onSubmit={handleSubmit} action="">
							{question.type === "1" && (
								<MCQuestions
									questionNum={quesNum}
									title={question.title}
									options={question.options}
									totalQuestions={totalQuestions}
									selectedOptions={selectedOptions}
									triggerUpdateQuesNum={updateQuesNum}
									handleChange={handleMultipleChoiceChange}
									triggerUpdateOtherOption={handleOtherMultipleChoiceChange}
								/>
							)}
							{question.type === "2" && (
								<SCQuestions
									inputs={inputs}
									questionNum={quesNum}
									title={question.title}
									options={question.options}
									selectedOption={selectedOption}
									totalQuestions={totalQuestions}
									triggerUpdateQuesNum={updateQuesNum}
									handleChange={handleSingleChoiceChange}
								/>
							)}
							{question.type === "3" && (
								<ShortAnswerQuestions
									inputs={inputs}
									questionNum={quesNum}
									title={question.title}
									label1={question.label1}
									label2={question.label2}
									totalQuestions={totalQuestions}
									handleChange={handleShortAnsChange}
									triggerUpdateQuesNum={updateQuesNum}
									placeholder1={question.placeholder1}
									placeholder2={question.placeholder2}
								/>
							)}
						</form>
					</>
				) : (
					<>
						<div className="head-container">
							<p className="have-interview">Have an interview</p>
							<p className="know-more">
								We want to know more about you before recommending to a company.
							</p>
						</div>
						{isSubmit ? (
							<FormEnd />
						) : (
							<FormStart triggerIsStart={updateIsStart} />
						)}
					</>
				)}
			</section>
		</>
	);
};

const mapStateToProps = (state) => ({
	screeningQuestions: state.user.screeningQuestions,
});

export default connect(mapStateToProps, {
	getScreeningQuestions,
	addCandidateScreeningAnswers,
})(ScreeningForm);
