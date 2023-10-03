import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";
import { searchArrayItemByText } from "../../utils/javaScriptHelper";
import { updateStudentBasicInformation } from "../../actions/profileActions";
import {
	Card,
	Button,
	Form,
	Select,
	Input,
	Radio,
	DatePicker,
	Typography,
} from "antd";
import "./form.css";
import "./chooseProgram.css";
import { collegeNames, fieldOfStudies } from "./../../utils/constants";

const { Option } = Select;
const { Title } = Typography;

// const formItemLayout = {
// 	labelCol: {
// 		span: 8,
// 	},
// 	wrapperCol: {
// 		span: 16,
// 	},
// };

const SocialDetailsProfile = ({
	isActionProgress,
	studentProfile,
	updateStudentBasicInformation,
}) => {
	const [formSocialDetails] = Form.useForm();
	const [branchOptions, setBranchOptions] = useState([]);

	const updateSocialDetails = (values) => {
		let updatedValue = {
			name: values.name || "",
			personalEmail: values.personalEmail || "",
			gender: values.gender || "male",
			dob: moment(values.dob).format("LL") || null,
			eatingHabbit: values.eatingHabbit || "veg",
			collegeName: values.collegeName || "",
			branchName: values.branchName || "",
			yearOfAdmission:
				moment(values.yearOfAdmission).format("LL").split(" ")[2] || null,
			yearOfGraduation:
				moment(values.yearOfGraduation).format("LL").split(" ")[2] || null,
			minorDegree: values.minorDegree || "",
			JEERank: values.JEERank || "",
			collegeGrade: values.collegeGrade || "",
			githubProfileLink: values.githubProfileLink || "",
			linkedinURL: values.linkedinURL || "",
			skypeId: values.skypeId || "",
			placeOfBirth: values.placeOfBirth || "",
			livingBackground: values.livingBackground || "",
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
			className="Forms"
			title={
				<Title level={4} style={{ marginBottom: 0 }}>
					Social Details
				</Title>
			}
		>
			<Form
				// {...formItemLayout}
				layout="vertical"
				form={formSocialDetails}
				initialValues={{
					name: studentProfile.name || "",
					email: studentProfile.email,
					personalEmail: studentProfile.personalEmail || "",
					gender: studentProfile.gender || "male",
					dob: studentProfile.dob
						? moment(studentProfile.dob)
						: null,
					eatingHabbit: studentProfile.eatingHabbit || "veg",
					collegeName: studentProfile.collegeName || "",
					branchName: studentProfile.branchName || "",
					yearOfAdmission: studentProfile.yearOfAdmission
						? moment(studentProfile.yearOfAdmission)
						: null,
					yearOfGraduation: studentProfile.yearOfGraduation
						? moment(studentProfile.yearOfGraduation)
						: null,
					minorDegree: studentProfile.minorDegree || "",
					JEERank: studentProfile.JEERank || "",
					collegeGrade: studentProfile.collegeGrade || "",
					githubProfileLink: studentProfile.githubProfileLink || "",
					linkedinURL: studentProfile.linkedinURL || "",
					skypeId: studentProfile.skypeId || "",
					placeOfBirth: studentProfile.placeOfBirth || "",
					livingBackground: studentProfile.livingBackground || "",
				}}
				onFinish={updateSocialDetails}
			>
				<Form.Item
					label="Name"
					name="name"
					rules={[{ required: true, message: "Please enter your name!" }]}
				>
					<Input placeholder="Your name" />
				</Form.Item>
				<Form.Item label="Student email" name="email">
					<Input disabled />
				</Form.Item>
				<Form.Item
					label="Student personal email"
					name="personalEmail"
					rules={[{ required: true, message: "Enter personal email" }]}
				>
					<Input type="email" disabled={isActionProgress} />
				</Form.Item>
				<Form.Item
					label="Gender"
					name="gender"
					rules={[{ required: true, message: "Please enter gender" }]}
				>
					<Radio.Group>
						<Radio value={"male"}>Male</Radio>
						<Radio value={"female"}>Female</Radio>
						<Radio value={"other"}>Other</Radio>
					</Radio.Group>
				</Form.Item>
				<Form.Item
					label="Date of birth"
					name="dob"
					rules={[{ required: true, message: "Enter date of birth" }]}
				>
					<DatePicker picker="date" disabled={isActionProgress} />
				</Form.Item>
				<Form.Item
					label="Eating Habbit"
					name="eatingHabbit"
					rules={[
						{ required: true, message: "Please enter your eating habbit" },
					]}
				>
					<Radio.Group>
						<Radio value={"veg"}>Veg</Radio>
						<Radio value={"nonveg"}>NonVeg</Radio>
					</Radio.Group>
				</Form.Item>
				<Form.Item
					name="collegeName"
					label="College name"
					rules={[{ required: true, message: "Enter College name" }]}
				>
					<Select
						placeholder="Please select college"
						disabled={isActionProgress}
					>
						{collegeNames &&
							collegeNames.map((college, i) => (
								<Option key={i} value={college}>
									{college}
								</Option>
							))}
					</Select>
				</Form.Item>
				<Form.Item
					name="branchName"
					label="Branch name"
					rules={[{ required: true, message: "Enter Branch name" }]}
				>
					<Select
						showSearch
						defaultActiveFirstOption={false}
						showArrow={false}
						filterOption={false}
						onSearch={handleBranchSearch}
						notFoundContent={null}
						disabled={isActionProgress}
					>
						{branchOptions &&
							branchOptions.map((skill, i) => (
								<Option key={i} value={skill}>
									{skill}
								</Option>
							))}
					</Select>
				</Form.Item>
				<Form.Item
					label={studentProfile.status != "graduate" ? "Year of Admission" : "Year of Graduation"}
					name={studentProfile.status != "graduate" ? "yearOfAdmission" : "yearOfGraduation"}
					rules={[{
						required: true,
						message: studentProfile.status != "graduate" ? "Year of Admission" : "Year of Graduation"
					}]}
				>
					<DatePicker picker="year" disabled={isActionProgress} />
				</Form.Item>
				<Form.Item label="Minor degree" name="minorDegree">
					<Input disabled={isActionProgress} />
				</Form.Item>
				<Form.Item
					label="JEE Advanced rank"
					name="JEERank"
					rules={[{ required: true, message: "Enter JEE Advanced rank" }]}
				>
					<Input type="number" placeholder="JEE Advanced rank..." disabled={isActionProgress} />
				</Form.Item>
				<Form.Item
					label="CGPA"
					name="collegeGrade"
					rules={[{ required: true, message: "Enter CGPA" }]}
				>
					<Input type="number" disabled={isActionProgress} />
				</Form.Item>
				<Form.Item label="GitHub link" name="githubProfileLink">
					<Input disabled={isActionProgress} />
				</Form.Item>
				<Form.Item label="LinkedIn link" name="linkedinURL">
					<Input disabled={isActionProgress} />
				</Form.Item>
				<Form.Item label="skypeId" name="skypeId">
					<Input disabled={isActionProgress} />
				</Form.Item>
				<Form.Item label="Place of birth (City & State)" name="placeOfBirth">
					<Input
						placeholder="Example: Kolkata, Westbengal"
						disabled={isActionProgress}
					/>
				</Form.Item>
				<Form.Item label="Living background" name="livingBackground">
					<Input.TextArea
						autoSize={{ minRows: 3, maxRows: 8 }}
						placeholder="living background..."
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
	SocialDetailsProfile
);
