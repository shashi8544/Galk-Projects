import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { updateStudentJob } from "../../../actions/candidateActions";
import { Modal, Form, Input, Button, DatePicker } from "antd";
import moment from "moment";

const { TextArea } = Input;

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
	updateStudentJob,
	id
}) => {
	const [form] = Form.useForm();
	const prevActionInProgressValue = usePrevious(isActionProgress);

	useEffect(() => {
		if (!isActionProgress && prevActionInProgressValue) {
			modalCloseHandler();
		}
	}, [isActionProgress]);

	const updateJob = (formValues) => {
		formValues.startDate = formValues.startDate ? moment(formValues.startDate).format("LL") : null
		formValues.endDate = formValues.endDate ? moment(formValues.endDate).format("LL") : null
		let dataToUpdate = {
			...formValues,
			// id: jobDetails.id,
		};

		updateStudentJob(dataToUpdate, id);
	};

	return (
		<Modal
			title="Edit job"
			visible={true}
			onCancel={modalCloseHandler}
			footer={null}
		>
			<Form
				layout="vertical"
				form={form}
				initialValues={jobDetails && { 
					...jobDetails,
					startDate: jobDetails.startDate ? moment(jobDetails.startDate) : null,
					endDate: jobDetails.endDate ? moment(jobDetails.endDate) : null,
				}}
				onFinish={updateJob}
			>
				<Form.Item
					label="Company"
					name="company"
					rules={[{ required: true, message: "Please enter company name!" }]}
				>
					<Input placeholder="Company name.." />
				</Form.Item>
				<Form.Item
					label="Designation"
					name="designation"
					rules={[{ required: true, message: "Please enter your designation" }]}
				>
					<Input placeholder="Your designation.." />
				</Form.Item>
				<Form.Item label="Location" name="place">
					<Input placeholder="Location.." />
				</Form.Item>
				<Form.Item label="Start date" name="startDate">
					<DatePicker picker="date"/>
				</Form.Item>
				<Form.Item label="End date" name="endDate">
					<DatePicker picker="date"/>
				</Form.Item>
				<Form.Item
					label="Description"
					name="description"
					rules={[
						{ required: true, message: "Please enter job description!" },
					]}
				>
					<TextArea
						autoSize={{ minRows: 3, maxRows: 8 }}
						placeholder="Job description..."
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
	isActionProgress: state.profile.actionInProgress,
});

export default connect(mapStateToProps, { updateStudentJob })(
	EditJobModal
);
