import { connect } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import {
	Modal,
	Form,
	Input,
	Button,
	Select,
	DatePicker,
	Radio,
	Row,
	Col,
} from "antd";

import {
	getSkills,
	getProjectDomains,
} from "../../../../actions/organisationDataActions";
import { projectCategories } from "../../../../utils/constants";
import { searchArrayItemByText } from "../../../../utils/javaScriptHelper";
import { addNewCandidateProject } from "../../../../actions/candidateActions";

const { TextArea } = Input;
const { Option } = Select;

function usePrevious(value) {
	const ref = useRef();
	useEffect(() => {
		ref.current = value;
	});
	return ref.current;
}

const CreateProjectModal = ({
	modalCloseHandler,
	isActionProgress,
	addNewCandidateProject,
	skillSets,
	projectDomains,
	getSkills,
	getProjectDomains,
}) => {
	if (skillSets.length === 0) {
		getSkills();
	}
	if (projectDomains.length === 0) {
		getProjectDomains();
	}

	const [form] = Form.useForm();
	const [selectedEndDate, setSelectedEndDate] = useState();
	const [selectedStartDate, setSelectedStartDate] = useState();
	const prevActionInProgressValue = usePrevious(isActionProgress);
	const [selectedProjectType, setSelectedProjectType] = useState();
	const [selectedProjectMode, setSelectedProjectMode] = useState();
	const [projectDomainOptions, setProjectDomainOptions] = useState([]);
	const [selectedProjectDomain, setSelectedProjectDomain] = useState();
	const [selectedProjectCategory, setSelectedProjectCategory] = useState();

	useEffect(() => {
		if (!isActionProgress && prevActionInProgressValue) {
			modalCloseHandler();
		}
	}, [isActionProgress]); // eslint-disable-line react-hooks/exhaustive-deps

	const createProject = (formValues) => {
		if (formValues.projectDomain === "Other") {
			formValues.projectDomain = formValues.otherProjectDomain || "Other";
		}
		formValues.startDate = formValues.startDate.format("DD/MM/YYYY");
		formValues.endDate = formValues.endDate.format("DD/MM/YYYY");

		let { otherProjectDomain, ...projectToCreate } = formValues;

		projectToCreate = Object.fromEntries(
			Object.entries(projectToCreate).filter(
				([_, value]) => value !== undefined
			)
		);

		addNewCandidateProject(projectToCreate);
		modalCloseHandler();
	};

	const handleProjectDomainSearch = (value) => {
		if (value) {
			let newOptions = searchArrayItemByText(value, projectDomains);
			if (newOptions.length === 1) newOptions = ["Other"];
			else newOptions = newOptions.slice(1);
			setProjectDomainOptions(newOptions);
		} else {
			setProjectDomainOptions(projectDomains);
		}
	};

	return (
		<Modal
			title="Add new project"
			visible={true}
			onCancel={modalCloseHandler}
			footer={null}
		>
			<Form layout="vertical" form={form} onFinish={createProject}>
				<Form.Item
					label="Title"
					name="title"
					rules={[{ required: true, message: "Please enter project title!" }]}
				>
					<Input placeholder="Project title..." />
				</Form.Item>
				<Form.Item
					name="projectDomain"
					label="Project Domain"
					rules={[{ required: true, message: "Enter your project domain" }]}
				>
					<Select
						showSearch
						showArrow={false}
						placeholder="Project domain..."
						filterOption={false}
						notFoundContent={null}
						onChange={(value) => {
							setSelectedProjectDomain(value);
						}}
						onSearch={handleProjectDomainSearch}
						onFocus={() => {
							setProjectDomainOptions(projectDomains);
						}}
						defaultActiveFirstOption={false}
					>
						{projectDomainOptions &&
							projectDomainOptions.map((projectDomain, i) => (
								<Option key={`projectDomain${i}`} value={projectDomain}>
									{projectDomain}
								</Option>
							))}
					</Select>
				</Form.Item>
				{selectedProjectDomain === "Other" && (
					<Form.Item
						label="Enter the Project Domain if Other is selected"
						name="otherProjectDomain"
						rules={[{ required: true, message: "Enter your project domain" }]}
					>
						<Input placeholder="Your project domain..." />
					</Form.Item>
				)}
				<Form.Item
					name="skillsUsed"
					label="Technical skills used"
					rules={[
						{
							type: "array",
							required: true,
							message: "Please select technical skills used in the project",
						},
					]}
				>
					<Select
						mode="tags"
						placeholder="Please select skill"
						disabled={isActionProgress}
						tokenSeparators={[","]}
					>
						{skillSets &&
							skillSets.map((skill, i) => (
								<Option key={`skill${i}`} value={skill}>
									{skill}
								</Option>
							))}
					</Select>
				</Form.Item>
				<Form.Item
					name="projectCategory"
					label="Project Category"
					rules={[
						{ required: true, message: "Please selcet project category" },
					]}
				>
					<Select
						placeholder="Project category..."
						onChange={(value) => {
							setSelectedProjectCategory(value);
						}}
					>
						{projectCategories &&
							projectCategories.map((projectCategory, i) => (
								<Option key={`projectCategory${i}`} value={projectCategory}>
									{projectCategory}
								</Option>
							))}
					</Select>
				</Form.Item>
				{selectedProjectCategory &&
					selectedProjectCategory === "Industry Project" && (
						<>
							<Form.Item
								label="Organisation name"
								name="organisation"
								rules={[
									{ required: true, message: "Please enter organisation name" },
								]}
							>
								<Input placeholder="Organisation name ..." />
							</Form.Item>
							<Form.Item
								label="Your role"
								name="role"
								rules={[{ required: true, message: "Please enter your role" }]}
							>
								<Input placeholder="Your role..." />
							</Form.Item>
							<Form.Item
								name="internshipOrJob"
								label="Project was a part of?"
								rules={[
									{ required: true, message: "Please select any option" },
								]}
							>
								<Select placeholder="Internship / Job...">
									{["Internship", "Part-time Job"].map((value, i) => (
										<Option key={`value${i}`} value={value}>
											{value}
										</Option>
									))}
								</Select>
							</Form.Item>
						</>
					)}
				{selectedProjectCategory &&
					selectedProjectCategory !== "Industry Project" && (
						<>
							<Form.Item
								label="Project Type"
								name="projectType"
								rules={[
									{ required: true, message: "Please select the project type" },
								]}
							>
								<Radio.Group
									onChange={(value) => {
										setSelectedProjectType(value.target.value);
									}}
								>
									<Radio value="individual">Individual Project</Radio>
									<Radio value="group">Group Project</Radio>
								</Radio.Group>
							</Form.Item>
							{selectedProjectType && selectedProjectType === "group" && (
								<>
									<Form.Item
										label="Team size"
										name="teamSize"
										rules={[{ required: true, message: "Enter team size" }]}
									>
										<Input type="number" placeholder="Team Size..." />
									</Form.Item>
									<Form.Item
										label="Your role"
										name="role"
										rules={[
											{ required: true, message: "Please enter your role" },
										]}
									>
										<Input placeholder="Your role..." />
									</Form.Item>
								</>
							)}
							<Form.Item
								label="Project Link"
								name="projectLink"
								rules={[
									{
										required:
											selectedProjectType &&
											selectedProjectType === "individual",
										message: "Please provide project link",
									},
								]}
							>
								<Input placeholder="Project link..." />
							</Form.Item>
							<Form.Item
								label="Project demo video"
								name="projectDemo"
								rules={[
									{
										required:
											selectedProjectType &&
											selectedProjectType === "individual",
										message: "Please provide project demo video link",
									},
								]}
							>
								<Input placeholder="Project demo video link..." />
							</Form.Item>
						</>
					)}
				<Row>
					<Col span={12}>
						<Form.Item
							label="Start data"
							name="startDate"
							rules={[
								{
									required: true,
									message: "Enter starting date of your project",
								},
							]}
						>
							<DatePicker
								picker="date"
								disabledDate={(current) =>
									selectedEndDate && current > selectedEndDate
								}
								onChange={(date) => {
									setSelectedStartDate(date);
								}}
							/>
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item
							label="End data"
							name="endDate"
							rules={[
								{
									required: true,
									message: "Enter ending date of your project",
								},
							]}
						>
							<DatePicker
								picker="date"
								disabledDate={(current) =>
									selectedStartDate && current < selectedStartDate
								}
								onChange={(date) => {
									setSelectedEndDate(date);
								}}
							/>
						</Form.Item>
					</Col>
				</Row>
				<Form.Item
					label="Project Mode"
					name="projectMode"
					rules={[{ required: true, message: "Select project mode" }]}
				>
					<Radio.Group
						onChange={(value) => {
							setSelectedProjectMode(value.target.value);
						}}
					>
						<Radio.Button value="online">Online</Radio.Button>
						<Radio.Button value="offline">Offline</Radio.Button>
					</Radio.Group>
				</Form.Item>
				{selectedProjectMode && selectedProjectMode === "offline" && (
					<Form.Item
						label="Location"
						name="location"
						rules={[
							{ required: true, message: "Please enter project location" },
						]}
					>
						<Input placeholder="Location..." />
					</Form.Item>
				)}
				<Form.Item
					label="Description"
					name="description"
					rules={[
						{ required: true, message: "Please enter project description!" },
					]}
				>
					<TextArea
						autoSize={{ minRows: 3, maxRows: 8 }}
						placeholder="Project description..."
					/>
				</Form.Item>
				<Form.Item style={{ marginTop: 20 }}>
					<Button
						type="primary"
						htmlType="submit"
						block
						loading={isActionProgress}
					>
						Submit
					</Button>
				</Form.Item>
			</Form>
		</Modal>
	);
};

const mapStateToProps = (state) => ({
	skillSets: state.organisationData.skills,
	projectDomains: state.organisationData.projectDomains,
	isActionProgress: state.profile.studentToShowActionInProgress,
});

export default connect(mapStateToProps, {
	addNewCandidateProject,
	getSkills,
	getProjectDomains,
})(CreateProjectModal);
