import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { usePreviousState } from "../../../utils/customHooks";
import { updateStudentBasicInformation } from "../../../actions/profileActions";
import {
	skillsets,
	collegeNames,
	fieldOfStudies,
	spokenLanguages,
	studentStrengthEntries,
} from "../../../utils/constants";
import { searchArrayItemByText } from "../../../utils/javaScriptHelper";
import {
	Card,
	Button,
	Form,
	Input,
	Select,
	Divider,
	Radio,
	DatePicker,
	Switch,
	Space,
} from "antd";
import {
	CheckOutlined,
	CloseOutlined,
	MinusCircleOutlined,
	PlusOutlined,
} from "@ant-design/icons";
import moment from "moment";

const { Option } = Select;

const formItemLayout = {
	labelCol: {
		span: 8,
	},
	wrapperCol: {
		span: 9,
	},
};

const BasicInformation = ({
	studentBasicDetails,
	isActionProgress,
	updateStudentBasicInformation,
}) => {
	const [form] = Form.useForm();
	const prevActionInProgressValue = usePreviousState(isActionProgress);
	const [isEditable, setIsEditable] = useState(false);
	const [branchOptions, setBranchOptions] = useState([]);

	useEffect(() => {
		if (!isActionProgress && prevActionInProgressValue) {
			setIsEditable(false);
		}
	}, [isActionProgress]);

	useEffect(() => {
		return () => {
			resetAll();
		};
	}, []);

	const resetAll = () => {
		form.resetFields();
		setIsEditable(false);
	};

	const updateInformation = (values) => {
		let updatedValue = {
			name: values.name || "",
			gender: values.gender || "male",
			//emailVerified: values.emailVerified,
			personalEmail: values.personalEmail || "",
			yearOfAdmission:
				moment(values.yearOfAdmission).format("LL").split(" ")[2] || null,
			yearOfGraduation:
				moment(values.yearOfGraduation).format("LL").split(" ")[2] || null,
			yearOfRegistration:
				moment(values.yearOfRegistration).format("LL").split(" ")[2] || null,
			JEERank: values.JEERank || "",
			collegeName: values.collegeName || "",
			branchName: values.branchName || "",
			collegeGrade: values.collegeGrade || "",
			minorDegree: values.minorDegree || "",
			skills: values.skills || [],
			secondarySkills: values.secondarySkills || [],
			spokenLanguages: values.spokenLanguages || [],
			dob: moment(values.dob).format("LL") || null,
			eatingHabbit: values.eatingHabbit,
			githubProfileLink: values.githubProfileLink || "",
			linkedinURL: values.linkedinURL || "",
			skypeId: values.skypeId || "",
			// selfStrength: values.selfStrength || "",
			// selfWeakness: values.selfWeakness || "",
			myStrength: values.myStrength || [],
			whatToContribute: values.whatToContribute || "",
			whyInJapan: values.whyInJapan || "",
			//selfIntro: values.selfIntro || "",
			placeOfBirth: values.placeOfBirth || "",
			livingBackground: values.livingBackground || "",
			vaccinated: values.vaccinated || false,
			medicallyFit: values.medicallyFit || true,
		};
		// console.log("UPDATE:", updatedValue);
		updateStudentBasicInformation(updatedValue);
	};

	const handleBranchSearch = (value) => {
		if (value) {
			let newOptions = searchArrayItemByText(value, fieldOfStudies);
			if (newOptions.length == 1) newOptions = ["Others"]
			else newOptions = newOptions.slice(1)
			setBranchOptions(newOptions);
		} else {
			setBranchOptions([]);
		}
	};

	return (
		<Card
			type="inner"
			title="Basic information"
			extra={
				isEditable ? (
					<>
						<Button
							onClick={resetAll}
							disabled={isActionProgress}
							style={{ marginRight: 10 }}
						>
							Cancel
						</Button>
						<Button
							type="primary"
							onClick={() => form.submit()}
							disabled={false}
							loading={isActionProgress}
						>
							Save
						</Button>
					</>
				) : (
					<Button onClick={() => setIsEditable(true)}>Edit</Button>
				)
			}
		>
			{studentBasicDetails && Object.entries(studentBasicDetails).length > 0 && (
				<Form
					{...formItemLayout}
					form={form}
					initialValues={
						studentBasicDetails && {
							name: studentBasicDetails.name || "",
							gender: studentBasicDetails.gender || "male",
							email: studentBasicDetails.email,
							emailVerified: studentBasicDetails.emailVerified,
							personalEmail: studentBasicDetails.personalEmail || "",
							yearOfAdmission: studentBasicDetails.yearOfAdmission
								? moment(studentBasicDetails.yearOfAdmission)
								: null,
							yearOfGraduation: studentBasicDetails.yearOfGraduation
								? moment(studentBasicDetails.yearOfGraduation)
								: null,
							yearOfRegistration:
								moment(studentBasicDetails.yearOfRegistration) || null,
							JEERank: studentBasicDetails.JEERank || "",
							collegeName: studentBasicDetails.collegeName || "",
							branchName: studentBasicDetails.branchName || "",
							collegeGrade: studentBasicDetails.collegeGrade || "",
							minorDegree: studentBasicDetails.minorDegree || "",
							skills: studentBasicDetails.skills || [],
							secondarySkills: studentBasicDetails.secondarySkills || [],
							spokenLanguages: studentBasicDetails.spokenLanguages || [],
							dob: studentBasicDetails.dob
								? moment(studentBasicDetails.dob)
								: null,
							eatingHabbit: studentBasicDetails.eatingHabbit,
							githubProfileLink: studentBasicDetails.githubProfileLink || "",
							linkedinURL: studentBasicDetails.linkedinURL || "",
							skypeId: studentBasicDetails.skypeId || "",
							myStrength: studentBasicDetails.myStrength || [],
							// myStrength: studentBasicDetails.myStrength || [],
							// selfStrength: studentBasicDetails.selfStrength || "",
							// selfWeakness: studentBasicDetails.selfWeakness || "",
							whatToContribute: studentBasicDetails.whatToContribute || "",
							whyInJapan: studentBasicDetails.whyInJapan || "",
							selfIntro: studentBasicDetails.selfIntro || "",
							placeOfBirth: studentBasicDetails.placeOfBirth || "",
							livingBackground: studentBasicDetails.livingBackground || "",
							vaccinated: studentBasicDetails.vaccinated || false,
							medicallyFit: studentBasicDetails.medicallyFit || true,
						}
					}
					onFinish={updateInformation}
				>
					<Form.Item
						label="Student name"
						name="name"
						rules={[{ required: true, message: "Enter name" }]}
					>
						<Input placeholder="Student name..." disabled={!isEditable} />
					</Form.Item>
					<Form.Item label="Gender" name="gender"
						rules={[{ required: true, message: "Select gender" }]}
					>
						<Radio.Group disabled={!isEditable}>
							<Radio.Button value="male">Male</Radio.Button>
							<Radio.Button value="female">Female</Radio.Button>
							<Radio.Button value="other">Other</Radio.Button>
						</Radio.Group>
					</Form.Item>
					<Form.Item label="Place of birth (City & State)" name="placeOfBirth">
						<Input
							placeholder="Example: Kolkata, Westbengal"
							disabled={!isEditable}
						/>
					</Form.Item>
					{/* <Form.Item label="Self introduction" name="selfIntro">
						<Input.TextArea
							autoSize={{ minRows: 3, maxRows: 8 }}
							placeholder="self introduction..."
							disabled={!isEditable}
						/>
					</Form.Item> */}
					<Form.Item label="Living background" name="livingBackground">
						<Input.TextArea
							autoSize={{ minRows: 3, maxRows: 8 }}
							placeholder="living background..."
							disabled={!isEditable}
						/>
					</Form.Item>
					<Divider />
					<Form.Item
						label="Vaccinated"
						name="vaccinated"
						valuePropName="checked"
					>
						<Switch
							disabled={!isEditable}
							checkedChildren={<CheckOutlined />}
							unCheckedChildren={<CloseOutlined />}
						/>
					</Form.Item>
					<Form.Item
						label="Medically fit"
						name="medicallyFit"
						valuePropName="checked"
					>
						<Switch
							disabled={!isEditable}
							checkedChildren={<CheckOutlined />}
							unCheckedChildren={<CloseOutlined />}
						/>
					</Form.Item>
					<Divider />
					<Form.Item label="Student email" name="email">
						<Input disabled />
					</Form.Item>
					{/* <Form.Item
						label="Email verified"
						name="emailVerified"
						valuePropName="checked"
					>
						<Switch
							disabled={!isEditable}
							checkedChildren={<CheckOutlined />}
							unCheckedChildren={<CloseOutlined />}
						/>
					</Form.Item> */}
					<Form.Item label="Student personal email" name="personalEmail"
						rules={[{ required: true, message: "Enter personal email" }]}
					>
						<Input disabled={!isEditable} />
					</Form.Item>
					<Divider />
					<Form.Item
						label={studentBasicDetails.status != "graduate" ? "Year of Admission" : "Year of Graduation"}
						name={studentBasicDetails.status != "graduate" ? "yearOfAdmission" : "yearOfGraduation"}
						rules={[{
							required: true,
							message: studentBasicDetails.status != "graduate" ? "Year of Admission" : "Year of Graduation"
						}]}
					>
						<DatePicker picker="year" disabled={!isEditable} />
					</Form.Item>
					<Form.Item label="Year of registration" name="yearOfRegistration"
						rules={[{ required: true, message: "Enter year of registration" }]}
					>
						<DatePicker picker="year" disabled={!isEditable} />
					</Form.Item>
					<Form.Item
						label="JEE Advanced rank"
						name="JEERank"
						rules={[{ required: true, message: "Enter JEE Advanced rank" }]}
					>
						<Input type="number" placeholder="JEE Advanced rank..." disabled={!isEditable} />
					</Form.Item>
					<Form.Item name="collegeName" label="College name"
						rules={[{ required: true, message: "Enter College name" }]}
					>
						<Select placeholder="Please select college" disabled={!isEditable} >
							{collegeNames &&
								collegeNames.map((college, i) => (
									<Option key={i} value={college}>
										{college}
									</Option>
								))}
						</Select>
					</Form.Item>
					<Form.Item name="branchName" label="Branch name"
						rules={[{ required: true, message: "Enter Branch name" }]}
					>
						<Select
							showSearch
							defaultActiveFirstOption={false}
							showArrow={false}
							filterOption={false}
							onSearch={handleBranchSearch}
							notFoundContent={null}
							disabled={!isEditable}
						>
							{branchOptions &&
								branchOptions.map((skill, i) => (
									<Option key={i} value={skill}>
										{skill}
									</Option>
								))}
						</Select>
					</Form.Item>
					<Form.Item label=" CGPA" name="collegeGrade"
						rules={[{ required: true, message: "Enter CGPA" }]}>
						<Input type="number" disabled={!isEditable} />
					</Form.Item>
					<Form.Item label="Minor degree" name="minorDegree">
						<Input disabled={!isEditable} />
					</Form.Item>
					<Form.Item
						name="skills"
						label="Primary Technical skills"
						rules={[{ type: "array", required: true, message: "Please select Techincal skills"  }]}
					>
						<Select
							mode="tags"
							placeholder="Please select skill"
							disabled={!isEditable}
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
							disabled={!isEditable}
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
					<Divider />
					<Form.Item
						name="spokenLanguages"
						label="Languages this student can speak"
						rules={[{ type: "array" }]}
					>
						<Select
							mode="tags"
							placeholder="Please select speaking language"
							disabled={!isEditable}
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
					<Form.Item label="Date of birth" name="dob"
						rules={[{ required: true, message: "Enter date of birth" }]}
					>
						<DatePicker picker="date" disabled={!isEditable} />
					</Form.Item>
					<Form.Item label="Eating habbit" name="eatingHabbit">
						<Radio.Group disabled={!isEditable}>
							<Radio.Button value="veg">Veg</Radio.Button>
							<Radio.Button value="nonveg">Non-veg</Radio.Button>
						</Radio.Group>
					</Form.Item>
					<Form.Item label="GitHub link" name="githubProfileLink">
						<Input disabled={!isEditable} />
					</Form.Item>
					<Form.Item label="LinkedIn link" name="linkedinURL">
						<Input disabled={!isEditable} />
					</Form.Item>
					<Form.Item label="skypeId" name="skypeId">
						<Input disabled={!isEditable} />
					</Form.Item>
					<Divider />
					<Form.List name="myStrength">
						{(fields, { add, remove }) => (
							<>
								<Form.Item label="Self strength: ">
									<Button
										type="dashed"
										onClick={() => add()}
										block
										icon={<PlusOutlined />}
										disabled={!isEditable}
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
											style={{ marginLeft: 314 }}
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
												disabled={!isEditable}
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
												style={{ width: 450 }}
												disabled={!isEditable}
											/>
										</Form.Item>
										<MinusCircleOutlined onClick={() => remove(name)} />
									</Space>
								))}
							</>
						)}
					</Form.List>
					{/* <Form.Item
						name="myStrength"
						label="Strength of this student"
						rules={[{ type: "array" }]}
					>
						<Select
							mode="tags"
							placeholder="Please type your input and select from list."
							disabled={!isEditable}
							tokenSeparators={[","]}
						>
							{studentStrengthEntries &&
								studentStrengthEntries.map((strength, i) => (
									<Option key={i} value={strength}>
										{strength}
									</Option>
								))}
						</Select>
					</Form.Item>*/}
					{/*<Form.Item
						label="Strength"
						name="selfStrength"
						extra="This field is only visible to ADMIN and will be used as reference to update the new strength field above in tag mode"
					>
						<Input.TextArea
							autoSize={{ minRows: 3, maxRows: 8 }}
							placeholder="strength..."
							disabled={!isEditable}
						/>
					</Form.Item>*/}
					{/*<Form.Item
						label="Weakness"
						name="selfWeakness"
						extra="This field is only visible to ADMIN and will be used as reference to update the new strength field above in tag mode"
					>
						<Input.TextArea
							autoSize={{ minRows: 3, maxRows: 8 }}
							placeholder="Weakness..."
							disabled={!isEditable}
						/>
					</Form.Item> */}
					<Form.Item label="Contribution to Japan" name="whatToContribute">
						<Input.TextArea
							autoSize={{ minRows: 3, maxRows: 8 }}
							placeholder="Contribution..."
							disabled={!isEditable}
						/>
					</Form.Item>
					<Form.Item label="Why in Japan" name="whyInJapan">
						<Input.TextArea
							autoSize={{ minRows: 3, maxRows: 8 }}
							placeholder="Why in Japan..."
							disabled={!isEditable}
						/>
					</Form.Item>
				</Form>
			)}
		</Card>
	);
};
const mapStateToProps = (state) => ({
	isActionProgress: state.profile.actionInProgress,
	studentBasicDetails: state.firebase.profile
});

export default connect(mapStateToProps, { updateStudentBasicInformation })(
	BasicInformation
);
