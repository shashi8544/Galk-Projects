import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { skillsets } from "../../../utils/constants";
import { updateInternshipJobToShow } from "../../../actions/companyActions";
import { Modal, Form, Input, Select, Button, Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";

const { Option } = Select;
const { TextArea } = Input;
const { Dragger } = Upload;

function usePrevious(value) {
	const ref = useRef();
	useEffect(() => {
		ref.current = value;
	});
	return ref.current;
}

const EditJobModal = ({
	modalCloseHandler,
	isActionProgress,
	jobDetails,
	updateInternshipJobToShow,
}) => {
	const [form] = Form.useForm();
	const prevActionInProgressValue = usePrevious(isActionProgress);
	useEffect(() => {
		if (!isActionProgress && prevActionInProgressValue) {
			modalCloseHandler();
		}
	}, [isActionProgress]);

	const updateJob = (formValues) => {
		let newAttachmentFile = null;
		if (
			formValues.attachmentFileObject &&
			formValues.attachmentFileObject.length > 0
		) {
			newAttachmentFile = formValues.attachmentFileObject[0].originFileObj;
		}
		let dataToUpdate = {
			...formValues,
			jobId: jobDetails.jobId,
			attachmentFileObject: newAttachmentFile,
		};
		updateInternshipJobToShow(dataToUpdate);
	};

	const normalizeFile = (e) => {
		if (Array.isArray(e)) {
			return e;
		}

		return e && e.fileList;
	};

	return (
		<Modal
			title="Edit job"
			visible={true}
			// onOk={updateJob}
			// confirmLoading={isActionProgress}
			onCancel={modalCloseHandler}
			footer={null}
		>
			<Form
				layout="vertical"
				form={form}
				initialValues={
					jobDetails && { ...jobDetails, attachmentFileObject: null }
				}
				// onValuesChange={onFormLayoutChange}
				onFinish={updateJob}
			>
				<Form.Item
					label="Title"
					name="title"
					rules={[{ required: true, message: "Please enter job title!" }]}
				>
					<Input placeholder="job title.." />
				</Form.Item>
				<Form.Item
					label="Description"
					name="description"
					rules={[{ required: true, message: "Please enter job description!" }]}
				>
					<TextArea
						autoSize={{ minRows: 3, maxRows: 8 }}
						placeholder="job description"
					/>
				</Form.Item>
				<Form.Item
					name="skills"
					label="Required technical skills"
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
					name="optionalSkills"
					label="Preferred technical skills"
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
				<Form.Item label="Location" name="location">
					<Input placeholder="job location.." />
				</Form.Item>
				<Form.Item
					label="Reference document"
					name="attachmentFileObject"
					valuePropName="fileList"
					getValueFromEvent={normalizeFile}
					noStyle
				>
					<Dragger name="files" beforeUpload={() => false} maxCount={1}>
						<p className="ant-upload-drag-icon">
							<InboxOutlined size="small" />
						</p>
						<p className="ant-upload-text">Click to this area to upload</p>
						<p className="ant-upload-hint">
							Support for a single upload. File type can be any but the size
							must be within 20MB
						</p>
						{jobDetails.attachmentURL && (
							<>
								Existing document:{" "}
								<span onClick={(e) => e.stopPropagation()}>
									<a href={jobDetails.attachmentURL} target="_blank">
										here
									</a>
								</span>
							</>
						)}
					</Dragger>
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
	isActionProgress: state.company.internshipJobActionInProgress,
});

export default connect(mapStateToProps, { updateInternshipJobToShow })(
	EditJobModal
);
