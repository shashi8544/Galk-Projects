import { Form, Select } from "antd";
import { connect } from "react-redux";

import {
	getSkills,
	getSpokenLanguages,
} from "../../../../actions/organisationDataActions";

const { Option } = Select;

const SkillsSetInput = (props) => {
	const {
		isEditable,
		skillSets,
		spokenLanguages,
		getSkills,
		getSpokenLanguages,
	} = props;

	if (skillSets.length === 0) {
		getSkills();
	}
	if (spokenLanguages.length === 0) {
		getSpokenLanguages();
	}

	return (
		<>
			<Form.Item
				name="skills"
				label="Experience based skills"
				rules={[
					{
						type: "array",
						required: true,
						message: "Please select experienced based skills",
					},
				]}
			>
				<Select
					mode="tags"
					placeholder="Please select skill"
					disabled={!isEditable}
					tokenSeparators={[","]}
				>
					{skillSets &&
						skillSets.map((skill, i) => (
							<Option key={`skill:${i}`} value={skill}>
								{skill}
							</Option>
						))}
				</Select>
			</Form.Item>
			<Form.Item
				name="secondarySkills"
				label="Knowledge based skills"
				rules={[
					{
						type: "array",
						required: true,
						message: "Please select knowledge based skills",
					},
				]}
			>
				<Select
					mode="tags"
					placeholder="Please select skill"
					disabled={!isEditable}
					tokenSeparators={[","]}
				>
					{skillSets &&
						skillSets.map((skill, i) => (
							<Option key={`secondSkill:${i}`} value={skill}>
								{skill}
							</Option>
						))}
				</Select>
			</Form.Item>
			<Form.Item
				name="spokenLanguages"
				label="Languages this student can speak"
				rules={[{ type: "array", required: true }]}
			>
				<Select
					mode="tags"
					placeholder="Please select speaking language"
					disabled={!isEditable}
					tokenSeparators={[","]}
				>
					{spokenLanguages &&
						spokenLanguages.map((language, i) => (
							<Option key={`language:${i}`} value={language}>
								{language}
							</Option>
						))}
				</Select>
			</Form.Item>
		</>
	);
};

const mapStateToProps = (state) => ({
	skillSets: state.organisationData.skills,
	spokenLanguages: state.organisationData.spokenLanguages,
});

export default connect(mapStateToProps, { getSkills, getSpokenLanguages })(
	SkillsSetInput
);
