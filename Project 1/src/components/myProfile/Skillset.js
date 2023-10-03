import React, { useState } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { updateStudentBasicInformation } from "../../actions/profileActions";
import { Card, Button, Form, Select, Input, Typography, Space } from "antd";
import "./form.css";
import "./chooseProgram.css";
import {
	skillsets,
	spokenLanguages,
	studentStrengthEntries,
} from "./../../utils/constants";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const { Option } = Select;
const { Title } = Typography;

const Skillset = ({
	isActionProgress,
	studentProfile,
	updateStudentBasicInformation,
}) => {
	const [form] = Form.useForm();

	const updateSocialDetails = (values) => {
		let updatedValue = {
			skills: values.skills || [],
			secondarySkills: values.secondarySkills || [],
			spokenLanguages: values.spokenLanguages || [],
			myStrength: values.myStrength || [],
			whatToContribute: values.whatToContribute || "",
			whyInJapan: values.whyInJapan || "",
		};
		// console.log("UPDATE:", updatedValue);
		updateStudentBasicInformation(updatedValue);
	};

	return (
		<Card
			className="Forms"
			title={
				<Title level={4} style={{ marginBottom: 0 }}>
					Technical and other skillsets
				</Title>
			}
		>
			<Form
				layout="vertical"
				form={form}
				initialValues={{
					skills: studentProfile.skills || [],
					secondarySkills: studentProfile.secondarySkills || [],
					spokenLanguages: studentProfile.spokenLanguages || [],
					myStrength: studentProfile.myStrength || [],
					whatToContribute: studentProfile.whatToContribute || "",
					whyInJapan: studentProfile.whyInJapan || "",
				}}
				onFinish={updateSocialDetails}
			>
				<Form.Item
					name="skills"
					label="Primary Technical skills"
					rules={[{ type: "array", required: true, message: "Please select Techincal skills"  }]}
				>
					<Select
						mode="tags"
						placeholder="Please select skill"
						disabled={isActionProgress}
						tokenSeparators={[","]}
					>
						{skillsets &&
							skillsets.map((skill, i) => (
								<Option key={i} value={skill}>
									{skill}
								</Option>
							))}
					</Select>
				</Form.Item>
				<Form.Item
					name="secondarySkills"
					label="Secondary Technical skills"
					rules={[{ type: "array" }]}
				>
					<Select
						mode="tags"
						placeholder="Please select skill"
						disabled={isActionProgress}
						tokenSeparators={[","]}
					>
						{skillsets &&
							skillsets.map((skill, i) => (
								<Option key={i} value={skill}>
									{skill}
								</Option>
							))}
					</Select>
				</Form.Item>
				<Form.Item
					name="spokenLanguages"
					label="Languages this student can speak"
					rules={[{ type: "array" }]}
				>
					<Select
						mode="tags"
						placeholder="Please select speaking language"
						disabled={isActionProgress}
						tokenSeparators={[","]}
					>
						{spokenLanguages &&
							spokenLanguages.map((language, i) => (
								<Option key={i} value={language}>
									{language}
								</Option>
							))}
					</Select>
				</Form.Item>
				<Form.List name="myStrength">
					{(fields, { add, remove }) => (
						<>
							<Form.Item label="Self strength: ">
								<Button
									type="dashed"
									onClick={() => add()}
									block
									icon={<PlusOutlined />}
									disabled={isActionProgress}
								>
									Add self strength
								</Button>
							</Form.Item>
							{fields.map(({ key, name, fieldKey, ...restField }, index) => (
								<Space
									key={key}
									style={{ display: "flex", marginBottom: 8 }}
									align="baseline"
								>
									<Form.Item
										{...restField}
										name={[name, "title"]}
										fieldKey={[fieldKey, "title"]}
										rules={[
											{
												required: true,
												message: "Missing strength title",
											},
										]}
									>
										<Select
											placeholder="Select.."
											disabled={isActionProgress}
											tokenSeparators={[","]}
											style={{ width: 140 }}
										>
											{studentStrengthEntries &&
												studentStrengthEntries.map((strength, i) => (
													<Option key={i} value={strength}>
														{strength}
													</Option>
												))}
										</Select>
									</Form.Item>
									<Form.Item
										{...restField}
										name={[name, "description"]}
										fieldKey={[fieldKey, "description"]}
										rules={[{ required: true, message: "Missing last name" }]}
									>
										<Input
											placeholder="Description..."
											style={{ width: 300 }}
											disabled={isActionProgress}
										/>
									</Form.Item>
									<MinusCircleOutlined onClick={() => remove(name)} />
								</Space>
							))}
						</>
					)}
				</Form.List>
				<Form.Item label="Contribution to Japan" name="whatToContribute">
					<Input.TextArea
						autoSize={{ minRows: 3, maxRows: 8 }}
						placeholder="Contribution..."
						disabled={isActionProgress}
					/>
				</Form.Item>
				<Form.Item label="Why in Japan" name="whyInJapan">
					<Input.TextArea
						autoSize={{ minRows: 3, maxRows: 8 }}
						placeholder="Why in Japan..."
						disabled={isActionProgress}
					/>
				</Form.Item>
				<Form.Item style={{ marginTop: 20, width: "100%" }}>
					<Button
						type="primary"
						htmlType="submit"
						block
						loading={isActionProgress}
						style={{ width: "100%" }}
					>
						Submit
					</Button>
				</Form.Item>
			</Form>
		</Card>
	);
};

const mapStateToProps = (state) => ({
	isActionProgress: state.profile.actionInProgress,
	studentProfile: state.firebase.profile,
});

export default connect(mapStateToProps, { updateStudentBasicInformation })(
	Skillset
);
