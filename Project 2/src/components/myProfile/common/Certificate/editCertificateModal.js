import moment from "moment";
import { connect } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import { Modal, Form, Input, Button, Select, Row, Col, DatePicker } from "antd";

import {
	getSkills,
	getCertificateCourses,
} from "../../../../actions/organisationDataActions";
import { certificateCategories } from "../../../../utils/constants";
import { searchArrayItemByText } from "../../../../utils/javaScriptHelper";
import { updateCandidateCertificate } from "../../../../actions/candidateActions";

const { TextArea } = Input;
const { Option } = Select;

function usePrevious(value) {
	const ref = useRef();
	useEffect(() => {
		ref.current = value;
	});
	return ref.current;
}

const EditCertificateModal = ({
	modalCloseHandler,
	isActionProgress,
	certificateDetails,
	certificateIndex,
	updateCandidateCertificate,
	skillSets,
	certificateCourses,
	getSkills,
	getCertificateCourses,
}) => {
	if (skillSets.length === 0) {
		getSkills();
	}
	if (certificateCourses.length === 0) {
		getCertificateCourses();
	}

	const [form] = Form.useForm();
	const [skillsOptions, setSkillOptions] = useState([]);
	const [coursesOptions, setCoursesOptions] = useState([]);
	const prevActionInProgressValue = usePrevious(isActionProgress);

	const [selectedEndDate, setSelectedEndDate] = useState(
		certificateDetails && certificateDetails.endDate
			? moment(certificateDetails.endDate, "DD/MM/YYYY")
			: null
	);
	const [selectedStartDate, setSelectedStartDate] = useState(
		certificateDetails && certificateDetails.startDate
			? moment(certificateDetails.startDate, "DD/MM/YYYY")
			: null
	);
	const [selectedCertifiedSkill, setSelectedCertifiedSkill] = useState(
		certificateDetails && certificateDetails.certifiedSkill
	);
	const [selectedCertifiedCourse, setSelectedCertifiedCourse] = useState(
		certificateDetails && certificateDetails.courseName
	);
	const [selectedCertificateCategory, setSelectedCertificateCategory] =
		useState(certificateDetails && certificateDetails.certificateCategory);

	useEffect(() => {
		if (!isActionProgress && prevActionInProgressValue) {
			modalCloseHandler();
		}
	}, [isActionProgress]); // eslint-disable-line react-hooks/exhaustive-deps

	const updateCertificate = (formValues) => {
		if (formValues.certifiedSkill === "Other") {
			formValues.certifiedSkill = formValues.otherCertifiedSkill || "Other";
		}
		if (formValues.courseName === "Other") {
			formValues.courseName = formValues.otherCourseName || "Other";
		}
		if (formValues.startDate && formValues.endDate) {
			formValues.startDate = formValues.startDate.format("DD/MM/YYYY");
			formValues.endDate = formValues.endDate.format("DD/MM/YYYY");
		}
		formValues.issueDate = formValues.issueDate.format("DD/MM/YYYY");

		let { otherCertifiedSkill, otherCourseName, ...dataToUpdate } = formValues;
		dataToUpdate.id = certificateDetails.id;

		dataToUpdate = Object.fromEntries(
			Object.entries(dataToUpdate).filter(([_, value]) => value !== undefined)
		);

		updateCandidateCertificate({ dataToUpdate, certificateIndex });
	};

	const handleSkillSearch = (value) => {
		if (value) {
			let newOptions = searchArrayItemByText(value, skillSets);
			if (newOptions.length === 1) newOptions = ["Other"];
			else newOptions = newOptions.slice(1);
			setSkillOptions(newOptions);
		} else {
			setSkillOptions(skillSets);
		}
	};

	const handleCourseSearch = (value) => {
		if (value) {
			let newOptions = searchArrayItemByText(value, certificateCourses);
			if (newOptions.length === 1) newOptions = ["Other"];
			else newOptions = newOptions.slice(1);
			setCoursesOptions(newOptions);
		} else {
			setCoursesOptions(certificateCourses);
		}
	};

	return (
		<Modal
			title="Edit certificate"
			visible={true}
			onCancel={modalCloseHandler}
			footer={null}
		>
			<Form
				layout="vertical"
				form={form}
				initialValues={
					certificateDetails && {
						title: certificateDetails.title,
						certificateCategory: certificateDetails.certificateCategory,
						courseName: certificateDetails.courseName,
						startDate: certificateDetails.startDate
							? moment(certificateDetails.startDate, "DD/MM/YYYY")
							: null,
						endDate: certificateDetails.endDate
							? moment(certificateDetails.endDate, "DD/MM/YYYY")
							: null,
						certificateProvider: certificateDetails.certificateProvider,
						certifiedSkill: certificateDetails.certifiedSkill,
						projectName: certificateDetails.projectName,
						skillsUsed: certificateDetails.skillsUsed,
						link: certificateDetails.link,
						issueDate: certificateDetails.issueDate
							? moment(certificateDetails.issueDate, "DD/MM/YYYY")
							: null,
						description: certificateDetails.description,
					}
				}
				onFinish={updateCertificate}
			>
				<Form.Item
					label="Title"
					name="title"
					rules={[
						{ required: true, message: "Please enter certificate title!" },
					]}
				>
					<Input placeholder="Certificate title.." />
				</Form.Item>
				<Form.Item
					name="certificateCategory"
					label="Certificate Category"
					rules={[
						{ required: true, message: "Please selcet certificate category" },
					]}
				>
					<Select
						placeholder="Certificate category..."
						onChange={(value) => {
							setSelectedCertificateCategory(value);
						}}
					>
						{certificateCategories &&
							certificateCategories.map((certificateCategory, i) => (
								<Option
									key={`certificateCategory${i}`}
									value={certificateCategory}
								>
									{certificateCategory}
								</Option>
							))}
					</Select>
				</Form.Item>
				{selectedCertificateCategory &&
					selectedCertificateCategory === "Course Completion" && (
						<>
							<Form.Item
								name="courseName"
								label="Course name"
								rules={[
									{ required: true, message: "Please enter course name" },
								]}
							>
								<Select
									showSearch
									showArrow={false}
									placeholder="Course name..."
									filterOption={false}
									notFoundContent={null}
									onChange={(value) => {
										setSelectedCertifiedCourse(value);
									}}
									onSearch={handleCourseSearch}
									onFocus={() => {
										setCoursesOptions(certificateCourses);
									}}
									defaultActiveFirstOption={false}
								>
									{coursesOptions &&
										coursesOptions.map((course, i) => (
											<Option key={`course${i}`} value={course}>
												{course}
											</Option>
										))}
								</Select>
							</Form.Item>
							{selectedCertifiedCourse === "Other" && (
								<Form.Item
									label="Enter the course name if Other is selected"
									name="otherCourseName"
									rules={[{ required: true, message: "Enter the course name" }]}
								>
									<Input placeholder="Course name..." />
								</Form.Item>
							)}
							<Row>
								<Col span={12}>
									<Form.Item
										label="Start data"
										name="startDate"
										rules={[
											{
												required: true,
												message: "Enter starting date of your course",
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
												message: "Enter ending date of your course",
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
								label="Certificate provider"
								name="certificateProvider"
								rules={[
									{
										required: true,
										message: "Please enter certificate provider name",
									},
								]}
							>
								<Input placeholder="Certificate provider..." />
							</Form.Item>
						</>
					)}
				{selectedCertificateCategory &&
					selectedCertificateCategory === "Skill Completion" && (
						<>
							<Form.Item
								name="certifiedSkill"
								label="Skill name"
								rules={[
									{ required: true, message: "Enter certified skill name" },
								]}
							>
								<Select
									showSearch
									showArrow={false}
									placeholder="Skill name..."
									filterOption={false}
									notFoundContent={null}
									onChange={(value) => {
										setSelectedCertifiedSkill(value);
									}}
									onSearch={handleSkillSearch}
									onFocus={() => {
										setSkillOptions(skillSets);
									}}
									defaultActiveFirstOption={false}
								>
									{skillsOptions &&
										skillsOptions.map((skill, i) => (
											<Option key={`skill${i}`} value={skill}>
												{skill}
											</Option>
										))}
								</Select>
							</Form.Item>
							{selectedCertifiedSkill === "Other" && (
								<Form.Item
									label="Enter the skill if Other is selected"
									name="otherCertifiedSkill"
									rules={[{ required: true, message: "Enter the skill name" }]}
								>
									<Input placeholder="Skill name..." />
								</Form.Item>
							)}
							<Form.Item
								label="Certificate provider"
								name="certificateProvider"
								rules={[
									{
										required: true,
										message: "Please enter certificate provider name",
									},
								]}
							>
								<Input placeholder="Certificate provider..." />
							</Form.Item>
						</>
					)}
				{selectedCertificateCategory &&
					selectedCertificateCategory === "Project Completion" && (
						<>
							<Form.Item
								label="Project Name"
								name="projectName"
								rules={[
									{ required: true, message: "Please enter project name" },
								]}
							>
								<Input placeholder="Project name..." />
							</Form.Item>
							<Form.Item
								name="skillsUsed"
								label="Technical skills used"
								rules={[
									{
										type: "array",
										required: true,
										message:
											"Please select technical skills used in the project",
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
							<Row>
								<Col span={12}>
									<Form.Item
										label="Start data"
										name="startDate"
										rules={[
											{
												required: true,
												message: "Enter starting date of your course",
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
												message: "Enter ending date of your course",
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
								label="Certificate provider"
								name="certificateProvider"
								rules={[
									{
										required: true,
										message: "Please enter certificate provider name",
									},
								]}
							>
								<Input placeholder="Certificate provider..." />
							</Form.Item>
						</>
					)}
				<Form.Item
					label="Certificate link"
					name="link"
					rules={[
						{ required: true, message: "Please provide certificate link" },
					]}
				>
					<Input placeholder="Certificate link..." />
				</Form.Item>
				<Form.Item
					label="Issue date"
					name="issueDate"
					rules={[{ required: true, message: "Please enter issue date" }]}
				>
					<DatePicker picker="date" />
				</Form.Item>
				<Form.Item
					label="Description"
					name="description"
					rules={[
						{
							required: true,
							message: "Please enter certificate description!",
						},
					]}
				>
					<TextArea
						autoSize={{ minRows: 3, maxRows: 8 }}
						placeholder="Certificate description..."
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
	certificateCourses: state.organisationData.certificateCourses,
	isActionProgress: state.profile.actionInProgress,
});

export default connect(mapStateToProps, {
	updateCandidateCertificate,
	getSkills,
	getCertificateCourses,
})(EditCertificateModal);
