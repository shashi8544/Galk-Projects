import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { updateStudentToShowProject } from "../../../../actions/candidateActions";
import { skillsets, projectTypeOptions } from "../../../../utils/constants";
import { Modal, Form, Input, Button, Select, AutoComplete } from "antd";

const { TextArea } = Input;
const { Option } = Select;

const typeOptions = [];
projectTypeOptions.map((type) =>
	typeOptions.push(<Option key={type}>{type}</Option>)
);

function usePrevious(value) {
	const ref = useRef();
	useEffect(() => {
		ref.current = value;
	});
	return ref.current;
}

const EditProjectModal = ({
	modalCloseHandler,
	isActionProgress,
	projectDetails,
	updateStudentToShowProject,
	id,projectList
}) => {
	const [form] = Form.useForm();
	const prevActionInProgressValue = usePrevious(isActionProgress);

	useEffect(() => {
		if (!isActionProgress && prevActionInProgressValue) {
			modalCloseHandler();
		}
	}, [isActionProgress]);

	const updateProject = (formValues) => {
		let dataToUpdate = {...formValues}
		updateStudentToShowProject(projectList,dataToUpdate,id);
	};
	return (
		<Modal
			title="Edit project"
			visible={true}
			onCancel={modalCloseHandler}
			footer={null}
		>
			<Form
				layout="vertical"
				form={form}
				initialValues={projectDetails && { ...projectDetails }}
				onFinish={updateProject}
			>
				<Form.Item
					label="Title"
					name="title"
					rules={[{ required: true, message: "Please enter project title!" }]}
				>
					<Input placeholder="Project title.." />
				</Form.Item>
				<Form.Item
					label="Project type"
					name="type"
					rules={[{ required: true, message: "Please enter project type!" }]}
				>
					<AutoComplete
						dataSource={typeOptions}
						placeholder="Example: Web development"
						id="type"
						allowClear={true}
						filterOption={(inputValue, option) =>
							option.props.children
								.toUpperCase()
								.indexOf(inputValue.toUpperCase()) !== -1
						}
					/>
				</Form.Item>
				<Form.Item
					name="skillsUsed"
					label="Technical skills used"
					// rules={[{ type: "array" }]}
				>
					<Select
						mode="tags"
						placeholder="Please select skill"
						disabled={isActionProgress}
						tokenSeparators={[","]}
						labelInValue={true}
					>
						{skillsets &&
							skillsets.map((skill, i) => (
								<Option key={i} value={skill}>
									{skill}
								</Option>
							))}
					</Select>
				</Form.Item>
				<Form.Item label="Location" name="place">
					<Input placeholder="Location.." />
				</Form.Item>
				<Form.Item label="Start date" name="startDate">
					<Input placeholder="Date in format DD/MM/YYYY" />
				</Form.Item>
				<Form.Item label="End date" name="endDate">
					<Input placeholder="Date in format DD/MM/YYYY" />
				</Form.Item>
				<Form.Item
					label="Description"
					name="description"
					rules={[
						{ required: true, message: "Please enter education description!" },
					]}
				>
					<TextArea
						autoSize={{ minRows: 3, maxRows: 8 }}
						placeholder="Education description..."
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
	isActionProgress: state.profile.studentToShowActionInProgress,
	projectList: Array.from(state.firebase.profile?.project)
});

export default connect(mapStateToProps, { updateStudentToShowProject })(
	EditProjectModal
);
