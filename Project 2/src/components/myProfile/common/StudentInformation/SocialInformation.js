import { connect } from "react-redux";
import React, { useState } from "react";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Form, Input, Select, Divider, Radio, DatePicker, Switch } from "antd";

import { searchArrayItemByText } from "../../../../utils/javaScriptHelper";
import {
	getBranches,
	getColleges,
	getFoods,
	getReligions,
} from "../../../../actions/organisationDataActions";

const { Option } = Select;

const SocialInformation = (props) => {
	const {
		isEditable,
		studentBasicDetails,
		colleges,
		branches,
		religions,
		foods,
		getColleges,
		getBranches,
		getReligions,
		getFoods,
	} = props;

	if (colleges.length === 0) {
		getColleges();
	}
	if (branches.length === 0) {
		getBranches();
	}
	if (religions.length === 0) {
		getReligions();
	}
	if (foods.length === 0) {
		getFoods();
	}

	const [branchOptions, setBranchOptions] = useState([]);
	const [religionOptions, setReligionOptions] = useState([]);
	const [selectedBranch, setSelectedBranch] = useState(
		studentBasicDetails.branchName || ""
	);
	const [selectedReligion, setSelectedReligion] = useState(
		studentBasicDetails.religion || ""
	);
	const [medicallyFit, setMedicallyFit] = useState(
		studentBasicDetails.medicallyFit !== undefined
			? studentBasicDetails.medicallyFit
			: true
	);
	const [minorDegree, setMinorDegree] = useState(
		studentBasicDetails.minorDegree || ""
	);

	const handleBranchSearch = (value) => {
		if (value) {
			let newOptions = searchArrayItemByText(value, branches);
			if (newOptions.length === 1) newOptions = ["Other"];
			else newOptions = newOptions.slice(1);
			setBranchOptions(newOptions);
		} else {
			setBranchOptions(branches);
		}
	};

	const handleReligionSearch = (value) => {
		if (value) {
			let newOptions = searchArrayItemByText(value, religions);
			if (newOptions.length === 1) newOptions = ["Other"];
			else newOptions = newOptions.slice(1);
			setReligionOptions(newOptions);
		} else {
			setReligionOptions(religions);
		}
	};

	const isValidLinkedInProfile = (link) => {
		const regex =
			/^https?:\/\/(www\.)?linkedin\.com\/(in|pub)\/[a-zA-Z0-9_-]+\/?$/;
		return regex.test(link);
	};

	const isValidGitHubProfile = (link) => {
		const regex = /^https?:\/\/(www\.)?github\.com\/[a-zA-Z0-9_-]+\/?$/;
		return regex.test(link);
	};

	const validateMobileNumber = (number) => {
		const pattern = /^\d{10}$/;

		return pattern.test(number);
	};

	return (
		<>
			<Form.Item
				label="Student name"
				name="name"
				rules={[{ required: true, message: "Enter name" }]}
			>
				<Input placeholder="Student name..." disabled={!isEditable} />
			</Form.Item>
			<Form.Item
				label="Gender"
				name="gender"
				rules={[{ required: true, message: "Select gender" }]}
			>
				<Radio.Group disabled={!isEditable}>
					<Radio.Button value="male">Male</Radio.Button>
					<Radio.Button value="female">Female</Radio.Button>
					<Radio.Button value="other">Other</Radio.Button>
				</Radio.Group>
			</Form.Item>
			<Form.Item
				label="Place of birth (City & State)"
				name="placeOfBirth"
				rules={[{ required: true }]}
			>
				<Input
					placeholder="Example: Kolkata, Westbengal"
					disabled={!isEditable}
				/>
			</Form.Item>
			<Form.Item
				name="religion"
				label="Religion"
				rules={[{ required: true, message: "Enter your religion" }]}
			>
				<Select
					showSearch
					showArrow={false}
					filterOption={false}
					notFoundContent={null}
					disabled={!isEditable}
					onChange={(value) => {
						setSelectedReligion(value);
					}}
					onSearch={handleReligionSearch}
					onFocus={() => {
						setReligionOptions(religions);
					}}
					defaultActiveFirstOption={false}
				>
					{religionOptions &&
						religionOptions.map((religion, i) => (
							<Option key={`religion${i}`} value={religion}>
								{religion}
							</Option>
						))}
				</Select>
			</Form.Item>
			{selectedReligion === "Other" && (
				<Form.Item
					label="Enter the Religion if Other is selected"
					name="otherReligion"
					rules={[{ required: true, message: "Enter your religion" }]}
				>
					<Input placeholder="Your religion..." disabled={!isEditable} />
				</Form.Item>
			)}
			<Form.Item
				label="Medically fit"
				name="medicallyFit"
				valuePropName="checked"
			>
				<Switch
					onChange={(value) => {
						setMedicallyFit(value);
					}}
					disabled={!isEditable}
					checkedChildren={<CheckOutlined />}
					unCheckedChildren={<CloseOutlined />}
				/>
			</Form.Item>
			{medicallyFit === false && (
				<Form.Item
					label="Specify the medical problem"
					name="medicallyNotFitReason"
					rules={[{ required: true, message: "Enter medical problem" }]}
				>
					<Input
						placeholder="Allergic to house dust, Peanut, etc"
						disabled={!isEditable}
					/>
				</Form.Item>
			)}
			<Form.Item label="Registered email" name="email">
				<Input disabled />
			</Form.Item>
			<Form.Item
				label="Secondary email"
				name="personalEmail"
				rules={[{ required: true, message: "Enter secondary email" }]}
			>
				<Input disabled={!isEditable} />
			</Form.Item>
			<Form.Item
				label="Mobile number"
				name="mobileNumber"
				rules={[
					{
						required: true,
						validator(_, value) {
							if (value) {
								if (!validateMobileNumber(value)) {
									return Promise.reject(
										new Error("Please enter a valid mobile number!")
									);
								}
								return Promise.resolve();
							} else {
								return Promise.reject(new Error("Please enter mobile number"));
							}
						},
					},
				]}
			>
				<Input disabled={!isEditable} />
			</Form.Item>
			<Divider />
			<Form.Item
				label={
					studentBasicDetails.status !== "graduate"
						? "Year of Admission"
						: "Year of Graduation"
				}
				name={
					studentBasicDetails.status !== "graduate"
						? "yearOfAdmission"
						: "yearOfGraduation"
				}
				rules={[
					{
						required: true,
						message:
							studentBasicDetails.status !== "graduate"
								? "Year of Admission"
								: "Year of Graduation",
					},
				]}
			>
				<DatePicker picker="year" disabled={!isEditable} />
			</Form.Item>
			<Form.Item
				label="Year of registration"
				name="yearOfRegistration"
				rules={[{ required: true, message: "Enter year of registration" }]}
			>
				<DatePicker picker="year" disabled={!isEditable} />
			</Form.Item>
			<Form.Item
				label="JEE Advanced rank"
				name="JEERank"
				rules={[{ required: true, message: "Enter JEE Advanced rank" }]}
			>
				<Input
					type="number"
					placeholder="JEE Advanced rank..."
					disabled={!isEditable}
				/>
			</Form.Item>
			<Form.Item
				name="collegeName"
				label="College name"
				rules={[{ required: true, message: "Please select college" }]}
			>
				<Select placeholder="College..." disabled={!isEditable}>
					{colleges &&
						colleges.map((college, i) => (
							<Option key={`college${i}`} value={college}>
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
					showArrow={false}
					filterOption={false}
					notFoundContent={null}
					disabled={!isEditable}
					onChange={(value) => {
						setSelectedBranch(value);
					}}
					onSearch={handleBranchSearch}
					onFocus={() => {
						setBranchOptions(branches);
					}}
					defaultActiveFirstOption={false}
				>
					{branchOptions &&
						branchOptions.map((branch, i) => (
							<Option key={`branch${i}`} value={branch}>
								{branch}
							</Option>
						))}
				</Select>
			</Form.Item>
			{selectedBranch === "Other" && (
				<Form.Item
					label="Enter the Branch name if Other is selected"
					name="otherBranchName"
					rules={[{ required: true, message: "Enter Branch name" }]}
				>
					<Input placeholder="Branch name..." disabled={!isEditable} />
				</Form.Item>
			)}
			<Form.Item
				label=" CGPA"
				name="collegeGrade"
				rules={[{ required: true, message: "Enter CGPA" }]}
			>
				<Input type="number" disabled={!isEditable} />
			</Form.Item>
			<Form.Item name="minorDegree" label="Minor degree">
				<Select
					showSearch
					showArrow={false}
					filterOption={false}
					notFoundContent={null}
					disabled={!isEditable}
					onChange={(value) => {
						setMinorDegree(value);
					}}
					onSearch={handleBranchSearch}
					onFocus={() => {
						setBranchOptions(branches);
					}}
					defaultActiveFirstOption={false}
				>
					{branchOptions &&
						branchOptions.map((branch, i) => (
							<Option key={`minorDegree${i}`} value={branch}>
								{branch}
							</Option>
						))}
				</Select>
			</Form.Item>
			{minorDegree === "Other" && (
				<Form.Item
					label="Enter the Minor degree if Other is selected"
					name="otherMinorDegree"
					rules={[{ required: true, message: "Enter minor degree name" }]}
				>
					<Input placeholder="Minor degree..." disabled={!isEditable} />
				</Form.Item>
			)}
			<Form.Item
				label="Date of birth"
				name="dob"
				rules={[{ required: true, message: "Enter date of birth" }]}
			>
				<DatePicker picker="date" disabled={!isEditable} />
			</Form.Item>
			<Form.Item
				name="foodPrefer"
				label="Food you prefer"
				rules={[
					{
						type: "array",
						required: true,
						message: "Please select food you prefer",
					},
				]}
			>
				<Select
					mode="tags"
					placeholder="Egg, Chicken, ..."
					disabled={!isEditable}
					tokenSeparators={[","]}
				>
					{foods &&
						foods.map((food, i) => (
							<Option key={`foodPrefer${i}`} value={food}>
								{food}
							</Option>
						))}
				</Select>
			</Form.Item>
			<Form.Item
				name="foodAvoid"
				label="Food you avoid"
				rules={[
					{
						type: "array",
						required: true,
						message: "Please select food you avoid",
					},
				]}
			>
				<Select
					mode="tags"
					placeholder="Egg, Chicken, ..."
					disabled={!isEditable}
					tokenSeparators={[","]}
				>
					{foods &&
						foods.map((food, i) => (
							<Option key={`foodAvoid${i}`} value={food}>
								{food}
							</Option>
						))}
				</Select>
			</Form.Item>
			<Form.Item
				label="Do you have passport?"
				name="hasPassport"
				valuePropName="checked"
			>
				<Switch
					disabled={!isEditable}
					checkedChildren={<CheckOutlined />}
					unCheckedChildren={<CloseOutlined />}
				/>
			</Form.Item>
			<Form.Item
				label="GitHub link"
				name="githubProfileLink"
				rules={[
					{
						validator(_, value) {
							if (value && !isValidGitHubProfile(value)) {
								return Promise.reject(
									new Error("Please enter a valid GitHub profile URL!")
								);
							}
							return Promise.resolve();
						},
					},
				]}
			>
				<Input disabled={!isEditable} />
			</Form.Item>
			<Form.Item
				label="LinkedIn link"
				name="linkedinURL"
				rules={[
					{
						validator(_, value) {
							if (value && !isValidLinkedInProfile(value)) {
								return Promise.reject(
									new Error("Please enter a valid LinkedIn profile URL!")
								);
							}
							return Promise.resolve();
						},
					},
				]}
			>
				<Input disabled={!isEditable} />
			</Form.Item>
			<Form.Item
				name="japaneseProficiency"
				label="What is your proficiency level in Japanese based on JLPT?"
				rules={[
					{
						required: true,
						message: "Enter Japanese profecency level based on JLPT",
					},
				]}
			>
				<Select
					placeholder="Enter Japanese profecency level based on JLPT"
					disabled={!isEditable}
				>
					{["N1", "N2", "N3", "N4", "N5", "No Knowledge"].map(
						(profecency, i) => (
							<Option key={`profecency${i}`} value={profecency}>
								{profecency}
							</Option>
						)
					)}
				</Select>
			</Form.Item>
		</>
	);
};

const mapStateToProps = (state) => ({
	colleges: state.organisationData.colleges,
	branches: state.organisationData.branches,
	religions: state.organisationData.religions,
	foods: state.organisationData.foods,
});

export default connect(mapStateToProps, {
	getColleges,
	getBranches,
	getReligions,
	getFoods,
})(SocialInformation);
